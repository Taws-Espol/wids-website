import type { CollectionConfig } from "payload";

import {
  COLLEGE_YEAR_OPTIONS,
  HEARD_ABOUT_OPTIONS,
  SEX_OPTIONS,
} from "../constants/registrations.ts";
import { createEventTypeValidationHook } from "../utils/create-event-type-validation.ts";
import { isAdminOrEditor } from "../utils/is-admin-or-editor.ts";
import { validateDatathonTeams } from "../utils/validate-datathon-teams.ts";
import { validateUniqueEmailPerEvent } from "../utils/validate-unique-email-per-event.ts";
import { validateUniquePhoneNumberPerEvent } from "../utils/validate-unique-phone-number-per-event.ts";

export const DatathonRegistrations: CollectionConfig = {
  slug: "datathon-registrations",
  labels: {
    singular: "Datathon Registration",
    plural: "Datathon Registrations",
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
      "event",
      "teamName",
      "memberCount",
      "createdAt",
      "updatedAt",
    ],
    useAsTitle: "teamName",
  },
  fields: [
    {
      name: "event",
      type: "relationship",
      relationTo: "events",
      required: true,
      filterOptions: {
        type: {
          equals: "datathon",
        },
      },
    },
    {
      name: "teamName",
      unique: true,
      type: "text",
      required: true,
      label: "Team name",
    },
    {
      name: "memberCount",
      type: "number",
      required: true,
      min: 1,
      max: 3,
      label: "Number of team members",
    },
    {
      name: "members",
      type: "array",
      required: true,
      minRows: 1,
      maxRows: 3,
      validate: validateDatathonTeams,
      fields: [
        {
          name: "isLeader",
          type: "checkbox",
          defaultValue: false,
          label: "Team leader",
        },
        {
          type: "row",
          fields: [
            {
              name: "firstName",
              type: "text",
              required: true,
              admin: { width: "33%" },
            },
            {
              name: "lastName",
              type: "text",
              required: true,
              admin: { width: "33%" },
            },
            {
              name: "sex",
              type: "select",
              required: true,
              options: SEX_OPTIONS.map((option) => ({
                label: option.label,
                value: option.value,
              })),
              admin: { width: "33%" },
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
              unique: true,
              required: true,
              admin: { width: "50%" },
              validate: validateUniquePhoneNumberPerEvent,
            },
          ],
        },
        {
          name: "universityName",
          type: "text",
          required: true,
        },
        {
          type: "row",
          fields: [
            {
              name: "major",
              type: "text",
              required: true,
              admin: { width: "50%" },
            },
            {
              name: "year",
              type: "select",
              required: true,
              options: COLLEGE_YEAR_OPTIONS.map((option) => ({
                label: option.label,
                value: option.value,
              })),
              admin: { width: "50%" },
            },
          ],
        },
      ],
    },
    {
      name: "bankVoucher",
      type: "upload",
      relationTo: "operations-media",
      required: true,
      label: "Bank voucher",
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
    beforeValidate: [createEventTypeValidationHook("datathon")],
  },
};
