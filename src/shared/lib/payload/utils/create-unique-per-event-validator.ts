import type { CollectionSlug, PayloadRequest } from "payload";

/** The registration fields that must be unique within a single event. */
export type UniqueField = "email" | "phoneNumber" | "nationalId" | "teamName";

type Options = {
  field: UniqueField;
  /** Returned when the field is empty. */
  requiredErrorCode: string;
  /** Returned when another registration for the same event already has it. */
  duplicateErrorCode: string;
};

/**
 * The options Payload passes to a field validator. Declared structurally, and
 * with only the parts this validator reads, so one implementation can back both
 * text and email fields.
 */
export type ValidatorContext = {
  req: PayloadRequest;
  siblingData?: unknown;
  data?: unknown;
  collectionSlug?: string;
};

/**
 * Builds a validator asserting a field is unique among registrations for the
 * same event.
 *
 * Values are compared trimmed. These four rules used to be four copies of one
 * function, and the email copy silently lost its `trim()` — see #147.
 */
export function createUniquePerEventValidator({
  field,
  requiredErrorCode,
  duplicateErrorCode,
}: Options) {
  return async (
    value: string | null | undefined,
    { req, siblingData, data, collectionSlug }: ValidatorContext,
  ): Promise<string | true> => {
    if (!value) {
      return requiredErrorCode;
    }

    const event = (siblingData as { event?: unknown } | undefined)?.event;

    if (!event) {
      return true;
    }

    const id =
      data && typeof data === "object" && "id" in data
        ? (data as { id?: string | number }).id
        : undefined;

    const existing = await req.payload.find({
      collection: collectionSlug as CollectionSlug,
      where: {
        // Exclude the document being edited, so saving it again is not a clash.
        id: id ? { not_equals: id } : { not_equals: null },
        event: { equals: event },
        [field]: { equals: value.trim() },
      },
      limit: 1,
    });

    return existing.totalDocs > 0 ? duplicateErrorCode : true;
  };
}
