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
import { isAdminOrEditor } from "../utils/is-admin-or-editor.ts";
import { validateDatathonTeams } from "../utils/validate-datathon-teams.ts";
import { validateUniqueEmailPerEvent } from "../utils/validate-unique-email-per-event.ts";
import { validateUniquePhoneNumberPerEvent } from "../utils/validate-unique-phone-number-per-event.ts";

const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

function getRelationshipId(
  value: number | { id: number } | null | undefined,
): number | null {
  if (value == null) {
    return null;
  }

  return typeof value === "object" ? value.id : value;
}

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
      async ({ doc, operation, req }) => {
        if (operation !== "create") {
          return;
        }

        const eventId = getRelationshipId(doc.event);
        if (eventId == null) {
          req.payload.logger.error({
            err: new Error("Datathon registration created without event id"),
          });
          return;
        }

        const locale =
          (req.context as { datathonRegistrationLocale?: Locale } | undefined)
            ?.datathonRegistrationLocale ?? routing.defaultLocale;

        const { data: eventData, error: eventError } = await tryCatch(
          req.payload.findByID({
            collection: "events",
            id: eventId,
            depth: 0,
            locale,
            req,
            select: {
              date: true,
              date_tz: true,
            },
          }),
        );

        if (eventError) {
          req.payload.logger.error({
            message:
              "Failed to load event for Datathon registration email queue.",
            error: eventError,
          });
          throw eventError;
        }

        const { error: queueError } = await tryCatch(
          Promise.all([
            req.payload.jobs.queue({
              task: DATATHON_REGISTRATION_CONFIRMATION_TASK_SLUG,
              input: {
                registrationId: doc.id,
                eventId,
                locale,
              },
              queue: "critical",
            }),
            req.payload.jobs.queue({
              task: DATATHON_REGISTRATION_REMINDER_TASK_SLUG,
              input: {
                registrationId: doc.id,
                eventId,
                locale,
              },
              queue: "batch",
              waitUntil: new Date(
                new Date(eventData.date).getTime() - ONE_DAY_IN_MILLISECONDS,
              ),
            }),
          ]),
        );

        if (queueError) {
          req.payload.logger.error({
            message:
              "Unexpected error while queueing mails for Datathon registration.",
            error: queueError,
          });
          throw queueError;
        }
      },
    ],
  },
};
