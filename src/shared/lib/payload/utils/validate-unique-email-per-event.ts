import type {
  CollectionSlug,
  EmailField,
  EmailFieldValidation,
  ValidateOptions,
} from "payload";

export const validateUniqueEmailPerEvent: EmailFieldValidation = async (
  value,
  {
    req,
    siblingData,
    data,
    collectionSlug,
  }: ValidateOptions<
    unknown,
    Record<string, unknown>,
    EmailField,
    string | null | undefined
  >,
) => {
  if (!value) return "Email is required.";

  const event = siblingData?.event;

  if (!event) return true;

  const existing = await req.payload.find({
    collection: collectionSlug as CollectionSlug,
    where: {
      ...(data && typeof data === "object" && "id" in data && data.id
        ? { id: { not_equals: (data as { id: string | number }).id } }
        : { id: { not_equals: null } }),
      event: { equals: event },
      email: { equals: value },
    },
    limit: 1,
  });

  return existing.totalDocs > 0
    ? "This email is already registered for this event"
    : true;
};
