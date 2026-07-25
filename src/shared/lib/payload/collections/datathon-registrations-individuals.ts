import type { CollectionConfig } from "payload";

import { DATATHON_REGISTRATION_ERROR_CODES } from "@/shared/constants/datathon-registration-error-codes";

import {
  COLLEGE_YEAR_OPTIONS,
  HEARD_ABOUT_OPTIONS,
  SEX_OPTIONS,
} from "../constants/registrations.ts";
import { createEventTypeValidationHook } from "../utils/create-event-type-validation.ts";
import { isAdminOrEditor } from "../utils/is-admin-or-editor.ts";
import { validateUniqueEmailPerEvent } from "../utils/validate-unique-email-per-event.ts";
import { validateUniquePhoneNumberPerEvent } from "../utils/validate-unique-phone-number-per-event.ts";
import { validateUniqueNationalIdPerEvent } from "../utils/validate-unique-national-id-per-event.ts";

export const DatathonRegistrationsIndividuals: CollectionConfig = {
  slug: "datathon-registrations-individuals",
  labels: {
    singular: "Datathon Registration (Individuals)",
    plural: "Datathon Registrations (Individuals)",
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
      "firstName",
      "lastName",
      "isAssignedToTeam",
      "createdAt",
      "updatedAt",
    ],
    useAsTitle: "firstName",
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
      type: "row",
      fields: [
        {
          name: "firstName",
          type: "text",
          required: true,
          label: "First name",
          admin: { width: "33%" },
        },
        {
          name: "lastName",
          type: "text",
          label: "Last name",
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
    {
      name: "isAssignedToTeam",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
      },
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

    /*
     * No afterChange email queueing, unlike conference-registrations and
     * datathon-registrations. Individual registrants are not sent confirmation
     * or reminder emails, and never have been. If that changes, use
     * createRegistrationEmailQueueHook rather than reimplementing it here.
     */
  },
};
