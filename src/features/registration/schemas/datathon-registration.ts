import { z } from "zod";

import { HEARD_ABOUT_VALUES } from "@/shared/lib/payload/constants/registrations";

const DATATHON_BANK_VOUCHER_ALLOWED_MIME_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
] as const;

const DATATHON_BANK_VOUCHER_MAX_SIZE_BYTES = 10 * 1024 * 1024;

function isFileLike(value: unknown): value is File {
  return (
    typeof value === "object" &&
    value !== null &&
    "name" in value &&
    "size" in value &&
    "type" in value &&
    "arrayBuffer" in value &&
    typeof (value as { arrayBuffer?: unknown }).arrayBuffer === "function"
  );
}

const datathonMemberSchema = z.object({
  isLeader: z.boolean(),
  firstName: z.string().trim().min(1, "validation.required"),
  lastName: z.string().trim().min(1, "validation.required"),
  sex: z.enum(["female", "male"]),
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
      .min(1, "validation.min-members")
      .max(3, "validation.max-members"),
    members: z
      .array(datathonMemberSchema)
      .min(1, "validation.min-members")
      .max(3, "validation.max-members"),
    bankVoucher: z
      .custom<File>(
        (value): value is File => isFileLike(value) && value.size > 0,
        "validation.bank-voucher-required",
      )
      .refine(
        (value) =>
          DATATHON_BANK_VOUCHER_ALLOWED_MIME_TYPES.includes(
            value.type as (typeof DATATHON_BANK_VOUCHER_ALLOWED_MIME_TYPES)[number],
          ),
        "validation.bank-voucher-invalid-type",
      )
      .refine(
        (value) => value.size <= DATATHON_BANK_VOUCHER_MAX_SIZE_BYTES,
        "validation.bank-voucher-max-size",
      ),
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
