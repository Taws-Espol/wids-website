import type { TextFieldValidation } from "payload";

import { DATATHON_REGISTRATION_ERROR_CODES } from "@/shared/constants/datathon-registration-error-codes";

import { createUniquePerEventValidator } from "./create-unique-per-event-validator";

export const validateUniqueNationalIdPerEvent: TextFieldValidation =
  createUniquePerEventValidator({
    field: "nationalId",
    requiredErrorCode: DATATHON_REGISTRATION_ERROR_CODES.REQUIRED,
    duplicateErrorCode: DATATHON_REGISTRATION_ERROR_CODES.UNIQUE_NATIONAL_ID,
  });
