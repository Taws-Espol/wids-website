/**
 * The error vocabulary for Datathon registration, spoken by the Payload field
 * validators and passed through by the server action. The client maps a code to
 * a field and a translation key.
 *
 * Note zod does not use these codes: the schema emits translation keys directly,
 * because it runs on the client where it can resolve them. So a given rule can
 * surface either way depending on which layer rejected it.
 */
export const DATATHON_REGISTRATION_ERROR_CODES = {
  SCHEMA_VALIDATION: "SCHEMA_VALIDATION",
  PAYLOAD_VALIDATION: "PAYLOAD_VALIDATION",
  UNKNOWN: "UNKNOWN",

  REQUIRED: "REQUIRED",
  INVALID_EMAIL: "INVALID_EMAIL",
  INVALID_PHONE_NUMBER: "INVALID_PHONE_NUMBER",
  UNIQUE_EMAIL: "UNIQUE_EMAIL",
  UNIQUE_PHONE_NUMBER: "UNIQUE_PHONE_NUMBER",
  UNIQUE_NATIONAL_ID: "UNIQUE_NATIONAL_ID",
  UNIQUE_TEAM_NAME: "UNIQUE_TEAM_NAME",
  EMAIL_REQUIRED: "EMAIL_REQUIRED",
  PHONE_REQUIRED: "PHONE_REQUIRED",
  NATIONAL_ID_REQUIRED: "NATIONAL_ID_REQUIRED",
  ACCEPTED_TERMS_REQUIRED: "ACCEPTED_TERMS_REQUIRED",
} as const;

export type DatathonRegistrationErrorCode =
  (typeof DATATHON_REGISTRATION_ERROR_CODES)[keyof typeof DATATHON_REGISTRATION_ERROR_CODES];

const DATATHON_REGISTRATION_ERROR_CODE_SET = new Set<string>(
  Object.values(DATATHON_REGISTRATION_ERROR_CODES),
);

export function isDatathonRegistrationErrorCode(
  value: string,
): value is DatathonRegistrationErrorCode {
  return DATATHON_REGISTRATION_ERROR_CODE_SET.has(value);
}
