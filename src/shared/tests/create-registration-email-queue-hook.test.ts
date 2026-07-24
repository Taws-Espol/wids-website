import { describe, expect, it, vi } from "vitest";

import { createRegistrationEmailQueueHook } from "@/shared/lib/payload/utils/create-registration-email-queue-hook";

const EVENT_DATE = "2026-05-12T09:00:00.000Z";

const hook = createRegistrationEmailQueueHook({
  label: "conference",
  localeContextKey: "conferenceRegistrationLocale",
  confirmationTaskSlug: "conference-registration-confirmation",
  reminderTaskSlug: "conference-registration-reminder",
});

function createReq({
  queue = vi.fn().mockResolvedValue(undefined),
  findByID = vi.fn().mockResolvedValue({ date: EVENT_DATE }),
} = {}) {
  const error = vi.fn();

  return {
    req: {
      payload: { logger: { error }, findByID, jobs: { queue } },
      context: { conferenceRegistrationLocale: "es" },
    },
    error,
    queue,
    findByID,
  };
}

/** The hook only ever receives these three fields from Payload. */
function run(
  req: unknown,
  { operation = "create", doc = { id: 1, event: 7 } } = {},
) {
  return (
    hook as unknown as (args: {
      doc: unknown;
      operation: string;
      req: unknown;
    }) => Promise<void>
  )({ doc, operation, req });
}

describe("createRegistrationEmailQueueHook", () => {
  it("queues a confirmation and a reminder when a registration is created", async () => {
    const { req, queue } = createReq();

    await run(req);

    expect(queue).toHaveBeenCalledTimes(2);

    const [confirmation, reminder] = queue.mock.calls.map(([args]) => args);

    expect(confirmation).toMatchObject({
      task: "conference-registration-confirmation",
      queue: "critical",
      input: { registrationId: 1, eventId: 7, locale: "es" },
    });
    expect(reminder).toMatchObject({
      task: "conference-registration-reminder",
      queue: "batch",
    });

    // Scheduled a day before the event.
    const gap = new Date(EVENT_DATE).getTime() - reminder.waitUntil.getTime();
    expect(gap).toBeGreaterThanOrEqual(24 * 60 * 60 * 1000);
  });

  it("does nothing on update", async () => {
    const { req, queue, findByID } = createReq();

    await run(req, { operation: "update" });

    expect(queue).not.toHaveBeenCalled();
    expect(findByID).not.toHaveBeenCalled();
  });

  // The point of #149: throwing here rolls back the surrounding payload.create,
  // so the attendee loses their registration over an undeliverable email.
  it("keeps the registration when queueing fails", async () => {
    const { req, error } = createReq({
      queue: vi.fn().mockRejectedValue(new Error("queue is down")),
    });

    await expect(run(req)).resolves.toBeUndefined();

    expect(error).toHaveBeenCalledTimes(1);
    expect(error.mock.calls[0][0]).toMatchObject({
      registrationId: 1,
      eventId: 7,
      locale: "es",
    });
  });

  it("keeps the registration when the event cannot be loaded", async () => {
    const { req, error, queue } = createReq({
      findByID: vi.fn().mockRejectedValue(new Error("database is down")),
    });

    await expect(run(req)).resolves.toBeUndefined();

    expect(queue).not.toHaveBeenCalled();
    expect(error).toHaveBeenCalledTimes(1);
  });

  it("logs and stops when the registration has no event", async () => {
    const { req, error, queue } = createReq();

    await expect(
      run(req, { doc: { id: 2, event: null as unknown as number } }),
    ).resolves.toBeUndefined();

    expect(queue).not.toHaveBeenCalled();
    expect(error).toHaveBeenCalledTimes(1);
  });

  it("falls back to the default locale when the context carries none", async () => {
    const { queue } = createReq();
    const req = {
      payload: {
        logger: { error: vi.fn() },
        findByID: vi.fn().mockResolvedValue({ date: EVENT_DATE }),
        jobs: { queue },
      },
      context: {},
    };

    await run(req);

    expect(queue.mock.calls[0][0].input.locale).toBe("es");
  });
});
