import type { CollectionAfterChangeHook, TypedJobs } from "payload";

import { routing } from "../../next-intl/routing.ts";
import type { Locale } from "../../next-intl/types.ts";
import { tryCatch } from "../../../utils/try-catch.ts";
import { getRelationshipId } from "./get-relationship-id.ts";

/** The reminder is scheduled a day before the event, plus a second of slack. */
const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000 + 1000;

type TaskSlug = keyof TypedJobs["tasks"];

type Options = {
  /** Names the registration in log messages, e.g. "conference". */
  label: string;
  /** Key the server action writes the submitting locale to on `req.context`. */
  localeContextKey: string;
  confirmationTaskSlug: TaskSlug;
  reminderTaskSlug: TaskSlug;
};

/**
 * Queues the confirmation and reminder emails after a registration is created.
 *
 * This hook never throws. It runs inside the surrounding `payload.create`, so
 * throwing would roll the registration back and the person would be told their
 * registration failed — losing the valuable thing to protect the disposable
 * one. A failure is logged with the ids needed to requeue by hand, and the
 * registration stands.
 */
export function createRegistrationEmailQueueHook({
  label,
  localeContextKey,
  confirmationTaskSlug,
  reminderTaskSlug,
}: Options): CollectionAfterChangeHook {
  return async ({ doc, operation, req }) => {
    if (operation !== "create") {
      return;
    }

    const eventId = getRelationshipId(doc.event);

    if (eventId == null) {
      req.payload.logger.error({
        message: `${label} registration created without an event id; no emails queued.`,
        registrationId: doc.id,
      });

      return;
    }

    const locale =
      (req.context as Record<string, Locale | undefined> | undefined)?.[
        localeContextKey
      ] ?? routing.defaultLocale;

    const context = { registrationId: doc.id, eventId, locale };

    const { data: eventData, error: eventError } = await tryCatch(
      req.payload.findByID({
        collection: "events",
        id: eventId,
        depth: 0,
        locale,
        req,
        select: { date: true, date_tz: true },
      }),
    );

    if (eventError) {
      req.payload.logger.error({
        ...context,
        error: eventError,
        message: `Failed to load the event for a ${label} registration. The registration was kept; its emails were not queued.`,
      });

      return;
    }

    const { error: queueError } = await tryCatch(
      Promise.all([
        req.payload.jobs.queue({
          task: confirmationTaskSlug,
          input: { registrationId: doc.id, eventId, locale },
          queue: "critical",
        }),
        req.payload.jobs.queue({
          task: reminderTaskSlug,
          input: { registrationId: doc.id, eventId, locale },
          queue: "batch",
          waitUntil: new Date(
            new Date(eventData.date).getTime() - ONE_DAY_IN_MILLISECONDS,
          ),
        }),
      ]),
    );

    if (queueError) {
      req.payload.logger.error({
        ...context,
        error: queueError,
        message: `Failed to queue emails for a ${label} registration. The registration was kept; requeue using the ids in this entry.`,
      });
    }
  };
}
