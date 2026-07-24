import type { CollectionAfterChangeHook, PayloadRequest } from "payload";
import { describe, expect, it, vi } from "vitest";

import { createRegistrationEmailQueueHook } from "@/shared/lib/payload/utils/create-registration-email-queue-hook";

const EVENT_DATE = "2026-05-12T09:00:00.000Z";

type QueueArgs = {
  task: string;
  queue: string;
  waitUntil?: Date;
  input: { registrationId: number; eventId: number; locale: string };
};

type QueueMock = ReturnType<
  typeof vi.fn<(args: QueueArgs) => Promise<unknown>>
>;
type FindMock = ReturnType<typeof vi.fn<() => Promise<{ date: string }>>>;
type LoggerMock = ReturnType<typeof vi.fn<(entry: unknown) => void>>;

const hook = createRegistrationEmailQueueHook({
  label: "conference",
  localeContextKey: "conferenceRegistrationLocale",
  confirmationTaskSlug: "conference-registration-confirmation",
  reminderTaskSlug: "conference-registration-reminder",
});

function createReq({
  queue = vi.fn().mockResolvedValue(undefined) as QueueMock,
  findByID = vi.fn().mockResolvedValue({ date: EVENT_DATE }) as FindMock,
  hasLocale = true,
} = {}) {
  const error: LoggerMock = vi.fn();

  // A PayloadRequest carries far more than the hook reads; the double supplies
  // only the logger, findByID and jobs.queue it actually touches.
  const req = {
    payload: { logger: { error }, findByID, jobs: { queue } },
    context: hasLocale ? { conferenceRegistrationLocale: "en" } : {},
  } as unknown as PayloadRequest;

  return { req, error, queue, findByID };
}

type HookArgs = Parameters<CollectionAfterChangeHook>[0];

function run(
  req: PayloadRequest,
  {
    operation = "create" as HookArgs["operation"],
    doc = { id: 1, event: 7 } as HookArgs["doc"],
  } = {},
) {
  return hook({ doc, operation, req } as HookArgs);
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
      input: { registrationId: 1, eventId: 7, locale: "en" },
    });
    expect(reminder).toMatchObject({
      task: "conference-registration-reminder",
      queue: "batch",
    });

    // Scheduled a day before the event.
    const gap =
      new Date(EVENT_DATE).getTime() - (reminder.waitUntil?.getTime() ?? 0);
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
      queue: vi.fn().mockRejectedValue(new Error("queue is down")) as QueueMock,
    });

    await expect(run(req)).resolves.toBeUndefined();

    expect(error).toHaveBeenCalledTimes(1);
    expect(error.mock.calls[0][0]).toMatchObject({
      registrationId: 1,
      eventId: 7,
      locale: "en",
    });
  });

  it("keeps the registration when the event cannot be loaded", async () => {
    const { req, error, queue } = createReq({
      findByID: vi
        .fn()
        .mockRejectedValue(new Error("database is down")) as FindMock,
    });

    await expect(run(req)).resolves.toBeUndefined();

    expect(queue).not.toHaveBeenCalled();
    expect(error).toHaveBeenCalledTimes(1);
  });

  it("logs and stops when the registration has no event", async () => {
    const { req, error, queue } = createReq();

    await expect(
      run(req, { doc: { id: 2, event: null } as HookArgs["doc"] }),
    ).resolves.toBeUndefined();

    expect(queue).not.toHaveBeenCalled();
    expect(error).toHaveBeenCalledTimes(1);
  });

  it("falls back to the default locale when the context carries none", async () => {
    const { req, queue } = createReq({ hasLocale: false });

    await run(req);

    expect(queue.mock.calls[0][0].input.locale).toBe("es");
  });
});
