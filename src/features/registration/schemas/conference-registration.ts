import { z } from "zod";

import {
  ATTENDANCE_MODES,
  HEARD_ABOUT_VALUES,
  PARTICIPANT_TYPES,
} from "@/shared/lib/payload/constants/registrations";

export const conferenceRegistrationSchema = z
  .object({
    firstName: z.string().trim().min(1, "validation.required"),
    lastName: z.string().trim().min(1, "validation.required"),
    email: z.email("validation.invalid-email").trim().toLowerCase(),
    phoneNumber: z
      .string()
      .trim()
      .length(10, "validation.invalid-phone-number")
      .regex(/^\d+$/, "validation.invalid-phone-number"),
    participantType: z.enum(PARTICIPANT_TYPES),
    universityName: z.string().trim().optional(),
    major: z.string().trim().optional(),
    organizationName: z.string().trim().optional(),
    jobTitle: z.string().trim().optional(),
    attendanceMode: z.enum(ATTENDANCE_MODES),
    receiveNotifications: z.boolean(),
    acceptedTerms: z
      .boolean()
      .refine(
        (acceptedTerms) => acceptedTerms,
        "validation.accepted-terms-required",
      ),
    heardAboutEvent: z.enum(HEARD_ABOUT_VALUES),
  })
  .superRefine((data, context) => {
    if (data.participantType === "student") {
      if (!data.universityName) {
        context.addIssue({
          code: "custom",
          message: "validation.student-field-required",
          path: ["universityName"],
        });
      }

      if (!data.major) {
        context.addIssue({
          code: "custom",
          message: "validation.student-field-required",
          path: ["major"],
        });
      }
    }

    if (data.participantType === "professional") {
      if (!data.organizationName) {
        context.addIssue({
          code: "custom",
          message: "validation.professional-field-required",
          path: ["organizationName"],
        });
      }

      if (!data.jobTitle) {
        context.addIssue({
          code: "custom",
          message: "validation.professional-field-required",
          path: ["jobTitle"],
        });
      }
    }
  });
