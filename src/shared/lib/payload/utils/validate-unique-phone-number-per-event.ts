import type {
  CollectionSlug,
  TextField,
  TextFieldValidation,
  ValidateOptions,
} from "payload";

import { CONFERENCE_REGISTRATION_ERROR_CODES } from "@/shared/constants/conference-registration-error-codes";

export const validateUniquePhoneNumberPerEvent: TextFieldValidation = async (
  value,
  {
    req,
    siblingData,
    data,
    collectionSlug,
  }: ValidateOptions<
    unknown,
    Record<string, unknown>,
    TextField,
    string | null | undefined
  >,
) => {
  if (!value) return CONFERENCE_REGISTRATION_ERROR_CODES.PHONE_REQUIRED;

  const event = siblingData?.event;

  if (!event) return true;

  const existing = await req.payload.find({
    collection: collectionSlug as CollectionSlug,
    where: {
      ...(data && typeof data === "object" && "id" in data && data.id
        ? { id: { not_equals: (data as { id: string | number }).id } }
        : { id: { not_equals: null } }),
      event: { equals: event },
      phoneNumber: { equals: value },
    },
    limit: 1,
  });

  return existing.totalDocs > 0
    ? CONFERENCE_REGISTRATION_ERROR_CODES.UNIQUE_PHONE_NUMBER
    : true;
};
