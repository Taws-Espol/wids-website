import { z } from "zod";

import { HEARD_ABOUT_VALUES } from "@/shared/lib/payload/constants/registrations";
import { validateNationalId } from "@/shared/utils/validate-national-id";

const datathonMemberSchema = z.object({
  isLeader: z.boolean(),
  firstName: z.string().trim().min(1, "validation.required"),
  lastName: z.string().trim().min(1, "validation.required"),
  sex: z.enum(["female", "male"]),
  nationalId: z
    .string()
    .trim()
    .min(1, "validation.required")
    .max(10, "validation.invalid-national-id")
    .regex(/^\d+$/, "validation.invalid-national-id")
    .refine(validateNationalId, "validation.invalid-national-id"),
  email: z.email("validation.invalid-email").trim().toLowerCase(),
  phoneNumber: z
    .string()
    .trim()
    .min(1, "validation.required")
    .regex(/^[+\d][\d\s()-]{7,}$/, "validation.invalid-phone-number"),
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
});

export const datathonRegistrationSchema = z
  .object({
    teamName: z.string().trim().min(1, "validation.required"),
    memberCount: z
      .number("validation.required")
      .int("validation.invalid-integer")
      .min(3, "validation.min-members")
      .max(4, "validation.max-members"),
    members: z
      .array(datathonMemberSchema)
      .min(3, "validation.min-members")
      .max(4, "validation.max-members"),
    allowIndividualsToJoin: z.boolean(),
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
    if (data.members.length !== data.memberCount) {
      context.addIssue({
        code: "custom",
        message: "validation.member-count-mismatch",
        path: ["members"],
      });
    }

    const leaderCount = data.members.filter((member) => member.isLeader).length;
    if (leaderCount !== 1) {
      context.addIssue({
        code: "custom",
        message: "validation.single-leader-required",
        path: ["members"],
      });
    }

    const femaleCount = data.members.filter(
      (member) => member.sex === "female",
    ).length;

    if (data.members.length > 0 && femaleCount / data.members.length < 0.5) {
      context.addIssue({
        code: "custom",
        message: "validation.min-female-ratio",
        path: ["members"],
      });
    }
  });
