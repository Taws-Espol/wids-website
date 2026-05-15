import { z } from "zod";

import { HEARD_ABOUT_VALUES } from "@/shared/lib/payload/constants/registrations";
import { validateNationalId } from "@/shared/utils/validate-national-id";

export const datathonRegistrationIndividualSchema = z.object({
  firstName: z.string().trim().min(1, "validation.required"),
  lastName: z.string().trim().min(1, "validation.required"),
  sex: z.enum(["female", "male"]),
  nationalId: z
    .string()
    .trim()
    .length(10, "validation.invalid-national-id")
    .regex(/^\d+$/, "validation.invalid-national-id")
    .refine(validateNationalId, "validation.invalid-national-id"),
  email: z.email("validation.invalid-email").trim().toLowerCase(),
  phoneNumber: z
    .string()
    .trim()
    .length(10, "validation.invalid-phone-number")
    .regex(/^\d+$/, "validation.invalid-phone-number"),
  universityName: z.string().trim().min(1, "validation.required"),
  major: z.string().trim().min(1, "validation.required"),
  year: z.enum([
    "freshman",
    "sophomore",
    "junior",
    "senior",
    "graduate",
    "other",
  ]),
  receiveNotifications: z.boolean(),
  acceptedTerms: z
    .boolean()
    .refine(
      (acceptedTerms) => acceptedTerms,
      "validation.accepted-terms-required",
    ),
  heardAboutEvent: z.enum(HEARD_ABOUT_VALUES),
});
