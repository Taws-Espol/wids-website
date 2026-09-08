import type { CollectionConfig } from "payload";

import { HEARD_ABOUT_OPTIONS } from "@/shared/lib/payload/constants/registrations";
import { createEventTypeValidationHook } from "@/shared/lib/payload/utils/create-event-type-validation";
import { isAdminOrEditor } from "@/shared/lib/payload/utils/is-admin-or-editor";
import { CONFERENCE_REGISTRATION_ERROR_CODES } from "@/shared/constants/conference-registration-error-codes";
import { validateUniqueEmailPerEvent } from "@/shared/lib/payload/utils/validate-unique-email-per-event";
import { validateUniquePhoneNumberPerEvent } from "@/shared/lib/payload/utils/validate-unique-phone-number-per-event";

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
  ],
  hooks: {
    beforeValidate: [createEventTypeValidationHook("nextgen")],
  },
};
