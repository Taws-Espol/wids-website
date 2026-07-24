import type { TextFieldValidation } from "payload";

import { DATATHON_REGISTRATION_ERROR_CODES } from "@/shared/constants/datathon-registration-error-codes";

import { createUniquePerEventValidator } from "./create-unique-per-event-validator";

export const validateUniqueTeamNamePerEvent: TextFieldValidation =
  createUniquePerEventValidator({
    field: "teamName",
    requiredErrorCode: DATATHON_REGISTRATION_ERROR_CODES.REQUIRED,
    duplicateErrorCode: DATATHON_REGISTRATION_ERROR_CODES.UNIQUE_TEAM_NAME,
  });
