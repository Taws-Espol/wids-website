import type { ConferenceRegistrationErrorCode } from "@/shared/constants/conference-registration-error-codes";

import type { ConferenceRegistrationValues } from "@/features/registration/types/conference-registration";

/**
 * Where a server error should be shown. `root.serverError` is the banner above
 * the submit button, used only when a code cannot be tied to a field.
 */
export type ConferenceRegistrationFieldError = {
  field: keyof ConferenceRegistrationValues | "root.serverError";
  /** A translation key, resolved by the caller. */
  message: string;
};

/** The branch fields each participant type must fill in. */
const STUDENT_FIELDS = ["universityName", "major"] as const;
const PROFESSIONAL_FIELDS = ["organizationName", "jobTitle"] as const;

/**
 * Places a server error code onto the fields it concerns.
 *
 * Kept separate from the form hook so the mapping can be tested without a
 * renderer. The switch is exhaustive: adding a code to
 * CONFERENCE_REGISTRATION_ERROR_CODES without handling it here fails the
 * typecheck rather than silently degrading to the generic message, which is
 * what happened to the student and professional codes — see #148.
 */
export function mapConferenceRegistrationError(
  code: ConferenceRegistrationErrorCode,
  values: Partial<ConferenceRegistrationValues>,
): ConferenceRegistrationFieldError[] {
  switch (code) {
    case "UNIQUE_EMAIL":
      return [{ field: "email", message: "validation.email-duplicate" }];
    case "EMAIL_REQUIRED":
      return [{ field: "email", message: "validation.email-required" }];
    case "INVALID_EMAIL":
      return [{ field: "email", message: "validation.invalid-email" }];
    case "UNIQUE_PHONE_NUMBER":
      return [
        { field: "phoneNumber", message: "validation.phone-number-duplicate" },
      ];
    case "PHONE_REQUIRED":
      return [
        { field: "phoneNumber", message: "validation.phone-number-required" },
      ];
    case "INVALID_PHONE_NUMBER":
      return [
        { field: "phoneNumber", message: "validation.invalid-phone-number" },
      ];

    case "ACCEPTED_TERMS_REQUIRED":
      return [
        {
          field: "acceptedTerms",
          message: "validation.accepted-terms-required",
        },
      ];

    // The code says a branch field is missing but not which one, so target the
    // ones the user actually left empty.
    case "STUDENT_FIELD_REQUIRED":
      return emptyBranchFields(
        STUDENT_FIELDS,
        values,
        "validation.student-field-required",
      );
    case "PROFESSIONAL_FIELD_REQUIRED":
      return emptyBranchFields(
        PROFESSIONAL_FIELDS,
        values,
        "validation.professional-field-required",
      );

    case "SCHEMA_VALIDATION":
      return [
        { field: "root.serverError", message: "errors.schema-validation" },
      ];
    case "PAYLOAD_VALIDATION":
      return [
        { field: "root.serverError", message: "errors.payload-validation" },
      ];

    // REQUIRED carries no field, so it can only be shown as a banner.
    case "REQUIRED":
    case "UNKNOWN":
      return [{ field: "root.serverError", message: "errors.unknown" }];

    default: {
      const unhandled: never = code;

      throw new Error(`Unhandled conference registration error: ${unhandled}`);
    }
  }
}

function emptyBranchFields(
  fields: ReadonlyArray<keyof ConferenceRegistrationValues>,
  values: Partial<ConferenceRegistrationValues>,
  message: string,
): ConferenceRegistrationFieldError[] {
  const empty = fields.filter((field) => !values[field]);

  // If the client cannot tell which one the server meant, flag them all.
  return (empty.length > 0 ? empty : fields).map((field) => ({
    field,
    message,
  }));
}
