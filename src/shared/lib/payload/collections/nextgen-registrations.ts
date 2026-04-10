import type { CollectionConfig } from "payload";

import { HEARD_ABOUT_OPTIONS } from "../constants/registrations.ts";
import { createEventTypeValidationHook } from "../utils/create-event-type-validation.ts";
import { isAdminOrEditor } from "../utils/is-admin-or-editor.ts";
import { validateUniqueEmailPerEvent } from "../utils/validate-unique-email-per-event.ts";
import { validateUniquePhoneNumberPerEvent } from "../utils/validate-unique-phone-number-per-event.ts";

export const NextgenRegistrations: CollectionConfig = {
  slug: "nextgen-registrations",
  labels: {
    singular: "NextGen Registration",
    plural: "NextGen Registrations",
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
      "affiliation",
      "affiliationCity",
      "email",
      "event",
      "createdAt",
    ],
    useAsTitle: "affiliation",
  },
  fields: [
    {
      name: "event",
      type: "relationship",
      relationTo: "events",
      required: true,
      filterOptions: {
        type: {
          equals: "nextgen",
        },
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "affiliation",
          type: "text",
          required: true,
          admin: { width: "50%" },
        },
        {
          name: "affiliationCity",
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
      name: "expectedAttendees",
      type: "number",
      required: true,
      min: 1,
      label: "Number of people expected to attend",
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
    beforeValidate: [createEventTypeValidationHook("nextgen")],
  },
};
