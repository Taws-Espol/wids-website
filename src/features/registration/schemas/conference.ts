import { z } from "zod/v4";
import {
  ATTENDANCE_MODES,
  HEARD_ABOUT_VALUES,
  PARTICIPANT_TYPES,
} from "@/shared/lib/payload/constants/registrations";

import {
  CHECKBOX_TRUE_VALUES,
  CONFERENCE_REGISTRATION_VALIDATION_KEYS,
} from "../constants/conference-registration";

type RegistrationValidationLocale = "en" | "es";

function getLocaleErrorMap(locale: RegistrationValidationLocale) {
  if (locale === "en") {
    return z.locales.en().localeError;
  }

  return z.locales.es().localeError;
}

const checkboxField = z.preprocess((value) => {
  if (typeof value === "boolean") return value;
  if (typeof value !== "string") return false;

  return CHECKBOX_TRUE_VALUES.includes(value.toLowerCase());
}, z.boolean());

const conferenceRegistrationBaseSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, CONFERENCE_REGISTRATION_VALIDATION_KEYS.required),
  lastName: z
    .string()
    .trim()
    .min(1, CONFERENCE_REGISTRATION_VALIDATION_KEYS.required),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email(CONFERENCE_REGISTRATION_VALIDATION_KEYS.invalidEmail),
  phoneNumber: z
    .string()
    .trim()
    .min(1, CONFERENCE_REGISTRATION_VALIDATION_KEYS.required)
    .regex(
      /^09\d{8}$/,
      CONFERENCE_REGISTRATION_VALIDATION_KEYS.invalidPhoneNumber,
    ),
  participantType: z.enum(PARTICIPANT_TYPES),
  universityName: z.string().trim().optional(),
  major: z.string().trim().optional(),
  organizationName: z.string().trim().optional(),
  jobTitle: z.string().trim().optional(),
  attendanceMode: z.enum(ATTENDANCE_MODES),
  receiveNotifications: checkboxField,
  acceptedTerms: checkboxField.refine(
    (acceptedTerms) => acceptedTerms,
    CONFERENCE_REGISTRATION_VALIDATION_KEYS.acceptedTermsRequired,
  ),
  heardAboutEvent: z.enum(HEARD_ABOUT_VALUES),
});

export const conferenceRegistrationSchema =
  conferenceRegistrationBaseSchema.superRefine((data, context) => {
    if (data.participantType === "student") {
      if (!data.universityName) {
        context.addIssue({
          code: "custom",
          message: CONFERENCE_REGISTRATION_VALIDATION_KEYS.studentFieldRequired,
          path: ["universityName"],
        });
      }

      if (!data.major) {
        context.addIssue({
          code: "custom",
          message: CONFERENCE_REGISTRATION_VALIDATION_KEYS.studentFieldRequired,
          path: ["major"],
        });
      }
    }

    if (data.participantType === "professional") {
      if (!data.organizationName) {
        context.addIssue({
          code: "custom",
          message:
            CONFERENCE_REGISTRATION_VALIDATION_KEYS.professionalFieldRequired,
          path: ["organizationName"],
        });
      }

      if (!data.jobTitle) {
        context.addIssue({
          code: "custom",
          message:
            CONFERENCE_REGISTRATION_VALIDATION_KEYS.professionalFieldRequired,
          path: ["jobTitle"],
        });
      }
    }
  });

export function parseConferenceRegistrationFormData(
  formData: FormData,
  options?: { locale?: RegistrationValidationLocale },
) {
  const filteredEntries = Array.from(formData.entries()).filter(
    ([key]) => !key.startsWith("$ACTION_"),
  );
  const rawFormData = Object.fromEntries(filteredEntries);

  const locale = options?.locale ?? "es";

  return conferenceRegistrationSchema.safeParse(rawFormData, {
    error: getLocaleErrorMap(locale),
  });
}
