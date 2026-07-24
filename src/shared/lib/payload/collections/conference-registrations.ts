import type { CollectionConfig } from "payload";

import {
  ATTENDANCE_MODE_OPTIONS,
  HEARD_ABOUT_OPTIONS,
  PARTICIPANT_TYPE_OPTIONS,
} from "../constants/registrations.ts";
import {
  CONFERENCE_REGISTRATION_CONFIRMATION_TASK_SLUG,
  CONFERENCE_REGISTRATION_REMINDER_TASK_SLUG,
} from "../constants/slugs.ts";
import { CONFERENCE_REGISTRATION_ERROR_CODES } from "../../../constants/conference-registration-error-codes.ts";
import { createEventTypeValidationHook } from "../utils/create-event-type-validation.ts";
import { createRegistrationEmailQueueHook } from "../utils/create-registration-email-queue-hook.ts";
import { generateAttendanceToken } from "../utils/generate-attendance-token.ts";
import { isAdminFieldAccess } from "../utils/is-admin-field-access.ts";
import { isAdminOrEditor } from "../utils/is-admin-or-editor.ts";
import { validateProfessionalField } from "../utils/validate-professional-field.ts";
import { validateStudentField } from "../utils/validate-student-field.ts";
import { validateUniqueEmailPerEvent } from "../utils/validate-unique-email-per-event.ts";
import { validateUniquePhoneNumberPerEvent } from "../utils/validate-unique-phone-number-per-event.ts";

export const ConferenceRegistrations: CollectionConfig = {
  slug: "conference-registrations",
  labels: {
    singular: "Conference Registration",
    plural: "Conference Registrations",
  },
  access: {
    create: () => true,
    read: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  admin: {
    group: "Operations",
    defaultColumns: [
      "firstName",
      "lastName",
      "email",
      "event",
      "attendanceMode",
      "attendanceConfirmed",
      "createdAt",
    ],
    useAsTitle: "email",
  },
  fields: [
    {
      name: "event",
      type: "relationship",
      relationTo: "events",
      required: true,
      filterOptions: {
        type: {
          equals: "conference",
        },
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "firstName",
          type: "text",
          required: true,
          admin: { width: "50%" },
        },
        {
          name: "lastName",
          type: "text",
          required: true,
          admin: { width: "50%" },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "email",
          type: "email",
          required: true,
          admin: { width: "50%" },
          validate: validateUniqueEmailPerEvent,
        },
        {
          name: "phoneNumber",
          type: "text",
          required: true,
          admin: { width: "50%" },
          validate: validateUniquePhoneNumberPerEvent,
        },
      ],
    },
    {
      name: "participantType",
      type: "radio",
      required: true,
      options: PARTICIPANT_TYPE_OPTIONS.map((option) => ({
        label: option.label,
        value: option.value,
      })),
    },
    {
      type: "row",
      admin: {
        condition: (_, siblingData) =>
          siblingData?.participantType === "student",
      },
      fields: [
        {
          name: "universityName",
          type: "text",
          validate: validateStudentField,
          admin: { width: "50%" },
        },
        {
          name: "major",
          type: "text",
          validate: validateStudentField,
          admin: { width: "50%" },
        },
      ],
    },
    {
      type: "row",
      admin: {
        condition: (_, siblingData) =>
          siblingData?.participantType === "professional",
      },
      fields: [
        {
          name: "organizationName",
          type: "text",
          validate: validateProfessionalField,
          admin: { width: "50%" },
        },
        {
          name: "jobTitle",
          type: "text",
          validate: validateProfessionalField,
          admin: { width: "50%" },
        },
      ],
    },
    {
      name: "attendanceMode",
      type: "radio",
      required: true,
      defaultValue: "in-person",
      options: ATTENDANCE_MODE_OPTIONS.map((option) => ({
        label: option.label,
        value: option.value,
      })),
    },
    {
      name: "receiveNotifications",
      type: "checkbox",
      defaultValue: false,
      label: "I would like to receive notifications",
    },
    {
      name: "acceptedTerms",
      type: "checkbox",
      required: true,
      label: "I accept the terms and conditions",
      validate: (value) =>
        value
          ? true
          : CONFERENCE_REGISTRATION_ERROR_CODES.ACCEPTED_TERMS_REQUIRED,
    },
    {
      name: "heardAboutEvent",
      type: "select",
      required: true,
      label: "How did you hear about the event?",
      options: HEARD_ABOUT_OPTIONS.map((option) => ({
        label: option.label,
        value: option.value,
      })),
    },
    {
      name: "attendanceConfirmed",
      type: "checkbox",
      required: true,
      defaultValue: false,
      label: "Attendance confirmed",
      admin: {
        description:
          "Whether this person confirmed they will attend, via the attendance confirmation email.",
      },
    },
    {
      name: "attendanceConfirmedAt",
      type: "date",
      admin: {
        readOnly: true,
        description: "When attendance was last confirmed or un-confirmed.",
      },
    },
    {
      name: "attendanceToken",
      type: "text",
      required: true,
      unique: true,
      index: true,
      defaultValue: generateAttendanceToken,
      access: {
        create: () => false,
        read: isAdminFieldAccess,
        update: () => false,
      },
      admin: {
        readOnly: true,
        hidden: true,
        description:
          "Opaque token used in the attendance confirmation link. Never derived from email/phone.",
      },
    },
    {
      name: "attendanceConfirmationEmailSentAt",
      type: "date",
      admin: {
        readOnly: true,
        description:
          "Set once the attendance confirmation email has been sent, to prevent re-sending.",
      },
    },
  ],
  hooks: {
    beforeValidate: [createEventTypeValidationHook("conference")],
    afterChange: [
      createRegistrationEmailQueueHook({
        label: "conference",
        localeContextKey: "conferenceRegistrationLocale",
        confirmationTaskSlug: CONFERENCE_REGISTRATION_CONFIRMATION_TASK_SLUG,
        reminderTaskSlug: CONFERENCE_REGISTRATION_REMINDER_TASK_SLUG,
      }),
    ],
  },
};
