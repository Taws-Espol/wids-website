import type { TextFieldValidation } from "payload";

import { CONFERENCE_REGISTRATION_ERROR_CODES } from "@/shared/constants/conference-registration-error-codes";

import { createUniquePerEventValidator } from "./create-unique-per-event-validator";

export const validateUniquePhoneNumberPerEvent: TextFieldValidation =
  createUniquePerEventValidator({
    field: "phoneNumber",
    requiredErrorCode: CONFERENCE_REGISTRATION_ERROR_CODES.PHONE_REQUIRED,
    duplicateErrorCode: CONFERENCE_REGISTRATION_ERROR_CODES.UNIQUE_PHONE_NUMBER,
  });
