import type {
  TextField,
  TextFieldSingleValidation,
  ValidateOptions,
} from "payload";

import { CONFERENCE_REGISTRATION_ERROR_CODES } from "@/shared/constants/conference-registration-error-codes";

export const validateProfessionalField: TextFieldSingleValidation = (
  value,
  {
    siblingData,
  }: ValidateOptions<unknown, { participantType: string }, TextField, string>,
) => {
  if (siblingData?.participantType !== "professional") return true;

  if (typeof value === "string" && value.trim().length > 0) return true;

  return CONFERENCE_REGISTRATION_ERROR_CODES.PROFESSIONAL_FIELD_REQUIRED;
};
