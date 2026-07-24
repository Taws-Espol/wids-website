import type { EmailFieldValidation } from "payload";

import { CONFERENCE_REGISTRATION_ERROR_CODES } from "@/shared/constants/conference-registration-error-codes";

import { createUniquePerEventValidator } from "./create-unique-per-event-validator";

export const validateUniqueEmailPerEvent: EmailFieldValidation =
  createUniquePerEventValidator({
    field: "email",
    requiredErrorCode: CONFERENCE_REGISTRATION_ERROR_CODES.EMAIL_REQUIRED,
    duplicateErrorCode: CONFERENCE_REGISTRATION_ERROR_CODES.UNIQUE_EMAIL,
  });
