import type { ArrayFieldValidation } from "payload";

import type { SEX_OPTIONS } from "../constants/registrations.ts";

type DatathonSiblingData = {
  memberCount?: number | null;
};

type DatathonMember = {
  isLeader?: boolean | null;
  sex?: (typeof SEX_OPTIONS)[number]["value"] | null;
  nationalId?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
};

export const validateDatathonTeams: ArrayFieldValidation = (
  value,
  { siblingData },
) => {
  if (!Array.isArray(value)) {
    return "Add at least three team members.";
  }

  const datathonData = siblingData as DatathonSiblingData | undefined;
  const memberCount =
    typeof datathonData?.memberCount === "number"
      ? datathonData.memberCount
      : null;

  if (memberCount && value.length !== memberCount) {
    return `Add exactly ${memberCount} team member(s).`;
  }

  const leaderCount = value.filter(
    (member) => (member as DatathonMember | undefined)?.isLeader,
  ).length;

  if (leaderCount !== 1) {
    return "Exactly one team member must be marked as the leader.";
  }

  const totalMembers = value.length;
  const femaleCount = value.filter(
    (member) => (member as DatathonMember | undefined)?.sex === "female",
  ).length;

  if (totalMembers > 0 && femaleCount / totalMembers < 0.5) {
    return "At least 50% of team members must be female.";
  }

  // Check for duplicate national IDs
  const nationalIds = value
    .map((member) => (member as DatathonMember | undefined)?.nationalId)
    .filter(Boolean);
  if (new Set(nationalIds).size !== nationalIds.length) {
    return "Each team member must have a unique national ID.";
  }

  // Check for duplicate emails
  const emails = value
    .map((member) => (member as DatathonMember | undefined)?.email)
    .filter(Boolean);
  if (new Set(emails).size !== emails.length) {
    return "Each team member must have a unique email address.";
  }

  // Check for duplicate phone numbers
  const phoneNumbers = value
    .map((member) => (member as DatathonMember | undefined)?.phoneNumber)
    .filter(Boolean);
  if (new Set(phoneNumbers).size !== phoneNumbers.length) {
    return "Each team member must have a unique phone number.";
  }

  return true;
};
