import type { CollectionConfig } from "payload";

import { DATATHON_REGISTRATION_ERROR_CODES } from "@/shared/constants/datathon-registration-error-codes";

import {
  COLLEGE_YEAR_OPTIONS,
  HEARD_ABOUT_OPTIONS,
  SEX_OPTIONS,
} from "../constants/registrations.ts";
import {
  DATATHON_REGISTRATION_CONFIRMATION_TASK_SLUG,
  DATATHON_REGISTRATION_REMINDER_TASK_SLUG,
} from "../constants/slugs.ts";
import { routing } from "../../next-intl/routing.ts";
import type { Locale } from "../../next-intl/types.ts";
import { tryCatch } from "../../../utils/try-catch.ts";
import { createEventTypeValidationHook } from "../utils/create-event-type-validation.ts";
import { createRegistrationEmailQueueHook } from "../utils/create-registration-email-queue-hook.ts";
import { isAdminOrEditor } from "../utils/is-admin-or-editor.ts";
import { validateDatathonTeams } from "../utils/validate-datathon-teams.ts";
import { validateUniqueEmailPerEvent } from "../utils/validate-unique-email-per-event.ts";
import { validateUniquePhoneNumberPerEvent } from "../utils/validate-unique-phone-number-per-event.ts";
import { validateUniqueNationalIdPerEvent } from "../utils/validate-unique-national-id-per-event.ts";
import { validateUniqueTeamNamePerEvent } from "../utils/validate-unique-team-name-per-event.ts";

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
      validate: validateUniqueTeamNamePerEvent,
    },
    {
      name: "memberCount",
      type: "number",
      required: true,
      min: 3,
      max: 4,
      label: "Number of team members",
    },
    {
      name: "members",
      type: "array",
      required: true,
      minRows: 3,
      maxRows: 4,
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
              admin: { width: "33%" },
              validate: validateUniqueEmailPerEvent,
            },
            {
              name: "nationalId",
              type: "text",
              required: true,
              admin: { width: "33%" },
              validate: validateUniqueNationalIdPerEvent,
            },
            {
              name: "phoneNumber",
              type: "text",
              required: true,
              admin: { width: "33%" },
              validate: validateUniquePhoneNumberPerEvent,
            },
          ],
        },

        {
          type: "row",
          fields: [
            {
              name: "universityName",
              type: "text",
              required: true,
              admin: { width: "33%" },
            },
            {
              name: "major",
              type: "text",
              required: true,
              admin: { width: "33%" },
            },
            {
              name: "year",
              type: "select",
              required: true,
              options: COLLEGE_YEAR_OPTIONS.map((option) => ({
                label: option.label,
                value: option.value,
              })),
              admin: { width: "33%" },
            },
          ],
        },
      ],
    },
    {
      name: "allowIndividualsToJoin",
      type: "checkbox",
      defaultValue: false,
      label: "Allow individuals without a team to be included in this team",
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
          : DATATHON_REGISTRATION_ERROR_CODES.ACCEPTED_TERMS_REQUIRED,
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
    afterChange: [
      createRegistrationEmailQueueHook({
        label: "Datathon",
        localeContextKey: "datathonRegistrationLocale",
        confirmationTaskSlug: DATATHON_REGISTRATION_CONFIRMATION_TASK_SLUG,
        reminderTaskSlug: DATATHON_REGISTRATION_REMINDER_TASK_SLUG,
      }),
    ],
  },
};
