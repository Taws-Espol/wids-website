import payloadConfig from "@payload-config";
import { getPayload } from "payload";

import { CONFERENCE_ATTENDANCE_CONFIRMATION_TASK_SLUG } from "@/shared/lib/payload/constants/slugs";

const PAGE_SIZE = 100;
const DEFAULT_RATE_SECONDS = 1;

type ParsedArgs = {
  eventId: number;
  dryRun: boolean;
  limit: number | null;
  only: string | null;
  rateSeconds: number;
  startAt: Date;
};

function printUsageAndExit(message?: string): never {
  if (message) {
    console.error(`Error: ${message}\n`);
  }
  console.error(
    [
      "Usage: pnpm payload queue-attendance-confirmations --event <id> [options]",
      "",
      "Queues the attendance confirmation email for every conference",
      "registration on the given event that hasn't been emailed yet.",
      "",
      "Options:",
      "  --event <id>       Conference event id (required)",
      "  --dry-run          Print what would be queued without queueing anything",
      "  --limit <n>        Only queue the first n matching registrations",
      "  --only <email>     Only queue the registration with this exact email",
      "  --rate <seconds>   Seconds between each queued send (default: 1)",
      "  --start-at <iso>   ISO timestamp for the first send (default: now)",
      "",
      "Always run with --dry-run first to check the recipient count before",
      "sending for real.",
    ].join("\n"),
  );
  process.exit(1);
}

function parseArgs(argv: string[]): ParsedArgs {
  let eventId: number | null = null;
  let dryRun = false;
  let limit: number | null = null;
  let only: string | null = null;
  let rateSeconds = DEFAULT_RATE_SECONDS;
  let startAt = new Date();

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];

    switch (arg) {
      case "--event": {
        const value = argv[++i];
        const parsed = value ? Number(value) : NaN;
        if (!Number.isInteger(parsed) || parsed <= 0) {
          printUsageAndExit(
            `--event must be a positive integer, got "${value}"`,
          );
        }
        eventId = parsed;
        break;
      }
      case "--dry-run": {
        dryRun = true;
        break;
      }
      case "--limit": {
        const value = argv[++i];
        const parsed = value ? Number(value) : NaN;
        if (!Number.isInteger(parsed) || parsed <= 0) {
          printUsageAndExit(
            `--limit must be a positive integer, got "${value}"`,
          );
        }
        limit = parsed;
        break;
      }
      case "--only": {
        only = argv[++i] ?? null;
        if (!only) {
          printUsageAndExit("--only requires an email address");
        }
        break;
      }
      case "--rate": {
        const value = argv[++i];
        const parsed = value ? Number(value) : NaN;
        if (!Number.isFinite(parsed) || parsed < 0) {
          printUsageAndExit(
            `--rate must be a non-negative number, got "${value}"`,
          );
        }
        rateSeconds = parsed;
        break;
      }
      case "--start-at": {
        const value = argv[++i];
        const parsed = value ? new Date(value) : null;
        if (!value || !parsed || Number.isNaN(parsed.getTime())) {
          printUsageAndExit(
            `--start-at must be a valid ISO timestamp, got "${value}"`,
          );
        }
        startAt = parsed;
        break;
      }
      case "--help":
      case "-h": {
        printUsageAndExit();
        break;
      }
      default: {
        printUsageAndExit(`Unknown argument "${arg}"`);
      }
    }
  }

  if (eventId == null) {
    printUsageAndExit("--event is required");
  }

  return { eventId, dryRun, limit, only, rateSeconds, startAt };
}

/**
 * Queues the conference attendance confirmation email for every
 * registration on `--event` that hasn't been emailed yet
 * (`attendanceConfirmationEmailSentAt` is null) and hasn't already
 * confirmed. This only ever *queues* jobs onto the "mailing" Payload
 * queue — it never sends an email directly — so a crashed terminal
 * doesn't lose work, failed sends get retried by the task itself, and
 * every attempt is visible in the payload-jobs admin list.
 *
 * `waitUntil` is staggered by `--rate` seconds per registration so the
 * "mailing" queue (60/min autoRun limit) and the nodemailer transport
 * (1 msg/sec, see payload.config.ts) drain steadily instead of bursting
 * at Gmail's SMTP servers.
 *
 * Run with `pnpm payload queue-attendance-confirmations --event <id>`.
 * Always run with `--dry-run` first.
 */
export const script = async () => {
  // `process.argv` here is `[node, payload, "queue-attendance-confirmations",
  // "--event", "1", ...]` — Payload's bin runner doesn't strip its own
  // sub-command keyword before invoking the script, so drop everything up
  // to (and not including) the first `--flag` token.
  const firstFlagIndex = process.argv.findIndex((arg) => arg.startsWith("--"));
  const args = parseArgs(
    firstFlagIndex === -1 ? [] : process.argv.slice(firstFlagIndex),
  );

  const payload = await getPayload({ config: payloadConfig });

  const event = await payload
    .findByID({
      collection: "events",
      id: args.eventId,
      depth: 0,
    })
    .catch(() => null);

  if (!event) {
    console.error(`Error: no event found with id ${args.eventId}.`);
    process.exit(1);
  }

  if (event.type !== "conference") {
    console.error(
      `Error: event ${args.eventId} is a "${event.type}" event, not a "conference" event. Refusing to queue.`,
    );
    process.exit(1);
  }

  const baseWhere = {
    event: { equals: args.eventId },
    attendanceConfirmationEmailSentAt: { equals: null },
    attendanceConfirmed: { equals: false },
    ...(args.only ? { email: { equals: args.only } } : {}),
  };

  let queued = 0;
  let page = 1;
  let hasNextPage = true;

  console.log(
    `Queueing attendance confirmations for event ${args.eventId} (${event.location})${
      args.only ? ` — only ${args.only}` : ""
    }${args.dryRun ? " [dry run]" : ""}`,
  );

  while (hasNextPage) {
    if (args.limit != null && queued >= args.limit) {
      break;
    }

    const result = await payload.find({
      collection: "conference-registrations",
      where: baseWhere,
      limit: PAGE_SIZE,
      page,
      depth: 0,
      sort: "id",
    });

    for (const registration of result.docs) {
      if (args.limit != null && queued >= args.limit) {
        break;
      }

      const waitUntil = new Date(
        args.startAt.getTime() + queued * args.rateSeconds * 1000,
      );

      console.log(
        `  ${args.dryRun ? "[dry run] would queue" : "queueing"} #${registration.id} ${registration.email} -> ${waitUntil.toISOString()}`,
      );

      if (!args.dryRun) {
        await payload.jobs.queue({
          task: CONFERENCE_ATTENDANCE_CONFIRMATION_TASK_SLUG,
          input: {
            registrationId: registration.id,
            eventId: args.eventId,
            // This campaign is Spanish-only: registrations don't persist
            // the locale they registered in, so there is no reliable
            // per-recipient locale to use here.
            locale: "es",
          },
          queue: "mailing",
          waitUntil,
        });
      }

      queued++;
    }

    hasNextPage = result.hasNextPage;
    page++;
  }

  const finishEstimate = new Date(
    args.startAt.getTime() + Math.max(queued - 1, 0) * args.rateSeconds * 1000,
  );

  console.log("");
  console.log(
    `${args.dryRun ? "Would queue" : "Queued"} ${queued} email${queued === 1 ? "" : "s"}.`,
  );
  if (queued > 0) {
    console.log(
      `Estimated send window: ${args.startAt.toISOString()} -> ${finishEstimate.toISOString()}`,
    );
  }
  if (args.dryRun) {
    console.log(
      "Nothing was queued. Re-run without --dry-run to send for real.",
    );
  }

  process.exit(0);
};
