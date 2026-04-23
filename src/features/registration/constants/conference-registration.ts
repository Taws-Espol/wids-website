export const CHECKBOX_TRUE_VALUES = ["on", "true", "1", "yes"];
export const CONFERENCE_FORM_INPUT_CLASS_NAME =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground transition-colors outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20";

export const CONFERENCE_REGISTRATION_ERROR_KEYS = {
  payloadValidation: "errors.payload-validation",
  schemaValidation: "errors.schema-validation",
  unknown: "errors.unknown",
} as const;

export const CONFERENCE_REGISTRATION_VALIDATION_KEYS = {
  acceptedTermsRequired: "validation.accepted-terms-required",
  invalidEmail: "validation.invalid-email",
  invalidPhoneNumber: "validation.invalid-phone-number",
  professionalFieldRequired: "validation.professional-field-required",
  required: "validation.required",
  studentFieldRequired: "validation.student-field-required",
} as const;
