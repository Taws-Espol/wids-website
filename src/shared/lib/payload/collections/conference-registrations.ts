import type { CollectionConfig } from "payload";

import { HEARD_ABOUT_OPTIONS } from "../constants/registrations.ts";
import { createEventTypeValidationHook } from "../utils/create-event-type-validation.ts";
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
      options: [
        {
          label: "Student",
          value: "student",
        },
        {
          label: "Professional",
          value: "professional",
        },
      ],
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
      options: [
        {
          label: "In person",
          value: "in-person",
        },
        {
          label: "Virtual",
          value: "virtual",
        },
      ],
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
        value ? true : "You must accept the terms and conditions.",
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
  ],
  hooks: {
    beforeValidate: [createEventTypeValidationHook("conference")],
  },
};
