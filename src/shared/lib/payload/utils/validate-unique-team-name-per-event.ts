import type {
  CollectionSlug,
  TextField,
  TextFieldValidation,
  ValidateOptions,
} from "payload";

import { DATATHON_REGISTRATION_ERROR_CODES } from "@/shared/constants/datathon-registration-error-codes";

export const validateUniqueTeamNamePerEvent: TextFieldValidation = async (
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
  if (!value) return DATATHON_REGISTRATION_ERROR_CODES.REQUIRED;

  const event = siblingData?.event;

  if (!event) return true;

  const trimmedValue = value.trim();

  const existing = await req.payload.find({
    collection: collectionSlug as CollectionSlug,
    where: {
      ...(data && typeof data === "object" && "id" in data && data.id
        ? { id: { not_equals: (data as { id: string | number }).id } }
        : { id: { not_equals: null } }),
      event: { equals: event },
      teamName: { equals: trimmedValue },
    },
    limit: 1,
  });

  return existing.totalDocs > 0
    ? DATATHON_REGISTRATION_ERROR_CODES.UNIQUE_TEAM_NAME
    : true;
};
