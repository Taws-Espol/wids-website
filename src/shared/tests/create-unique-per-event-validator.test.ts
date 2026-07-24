import type { PayloadRequest, Where } from "payload";
import { describe, expect, it, vi } from "vitest";

import {
  createUniquePerEventValidator,
  type UniqueField,
  type ValidatorContext,
} from "@/shared/lib/payload/utils/create-unique-per-event-validator";
import { validateUniqueEmailPerEvent } from "@/shared/lib/payload/utils/validate-unique-email-per-event";
import { validateUniqueNationalIdPerEvent } from "@/shared/lib/payload/utils/validate-unique-national-id-per-event";
import { validateUniquePhoneNumberPerEvent } from "@/shared/lib/payload/utils/validate-unique-phone-number-per-event";
import { validateUniqueTeamNamePerEvent } from "@/shared/lib/payload/utils/validate-unique-team-name-per-event";

type FindArgs = { where: Where };
type FindMock = ReturnType<typeof vi.fn<(args: FindArgs) => Promise<unknown>>>;

function createContext({
  totalDocs = 0,
  data = {} as Record<string, unknown>,
  hasEvent = true,
} = {}) {
  const find: FindMock = vi.fn().mockResolvedValue({ totalDocs });

  const context: ValidatorContext = {
    // A PayloadRequest carries 17 further properties the validator never
    // touches, so the double supplies only `payload.find`.
    req: { payload: { find } } as unknown as PayloadRequest,
    siblingData: hasEvent ? { event: 7 } : {},
    data,
    collectionSlug: "conference-registrations",
  };

  return { find, context };
}

/** The four exported validators share one signature. */
type Validator = (
  value: string | null | undefined,
  context: ValidatorContext,
) => Promise<string | true>;

const validator = createUniquePerEventValidator({
  field: "email",
  requiredErrorCode: "EMAIL_REQUIRED",
  duplicateErrorCode: "UNIQUE_EMAIL",
});

describe("createUniquePerEventValidator", () => {
  it("passes when no other registration for the event has the value", async () => {
    const { context } = createContext({ totalDocs: 0 });

    await expect(validator("ana@example.com", context)).resolves.toBe(true);
  });

  it("rejects when another registration for the event already has it", async () => {
    const { context } = createContext({ totalDocs: 1 });

    await expect(validator("ana@example.com", context)).resolves.toBe(
      "UNIQUE_EMAIL",
    );
  });

  it("returns the required code for an empty value", async () => {
    const { context, find } = createContext();

    await expect(validator("", context)).resolves.toBe("EMAIL_REQUIRED");
    expect(find).not.toHaveBeenCalled();
  });

  it("skips the check when the row has no event yet", async () => {
    const { context, find } = createContext({ hasEvent: false });

    await expect(validator("ana@example.com", context)).resolves.toBe(true);
    expect(find).not.toHaveBeenCalled();
  });

  it("excludes the document being edited, so re-saving is not a clash", async () => {
    const { context, find } = createContext({ data: { id: 42 } });

    await validator("ana@example.com", context);

    expect(find.mock.calls[0][0].where.id).toEqual({ not_equals: 42 });
  });
});

// #147: the email validator had lost its trim() while the other three kept it.
describe("every unique-per-event validator trims before comparing", () => {
  const cases: Array<[string, Validator, UniqueField]> = [
    ["email", validateUniqueEmailPerEvent as Validator, "email"],
    [
      "phone number",
      validateUniquePhoneNumberPerEvent as Validator,
      "phoneNumber",
    ],
    [
      "national id",
      validateUniqueNationalIdPerEvent as Validator,
      "nationalId",
    ],
    ["team name", validateUniqueTeamNamePerEvent as Validator, "teamName"],
  ];

  it.each(cases)("%s", async (_label, validate, field) => {
    const { context, find } = createContext();

    await validate("  spaced  ", context);

    expect(find.mock.calls[0][0].where[field]).toEqual({ equals: "spaced" });
  });
});
