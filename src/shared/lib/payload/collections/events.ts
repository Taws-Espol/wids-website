import type { CollectionConfig } from "payload";
import { EVENTS_TAG } from "@/shared/constants/cache-tags";
import { createRevalidateHooks } from "@/shared/lib/payload/utils/create-revalidate-hooks";
import { EVENT_TYPES } from "@/shared/lib/payload/constants/event-types";
import { isAdminOrEditor } from "@/shared/lib/payload/utils/is-admin-or-editor";

export const Events: CollectionConfig = {
  slug: "events",
  labels: { singular: "Event", plural: "Events" },
  access: {
    create: isAdminOrEditor,
    read: () => true,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  admin: {
    group: "Content",
    defaultColumns: [
      "title",
      "type",
      "edition",
      "date",
      "createdAt",
      "updatedAt",
    ],
    useAsTitle: "title",
  },
  fields: [
    {
      name: "edition",
      type: "relationship",
      relationTo: "editions",
      required: true,
    },
    {
      name: "type",
      type: "select",
      required: true,
      options: EVENT_TYPES.map((type) => ({
        label: type.charAt(0).toUpperCase() + type.slice(1),
        value: type,
      })),
    },
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      localized: true,
    },
    {
      name: "requirements",
      type: "array",
      localized: true,
      fields: [
        {
          name: "text",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "location",
      type: "text",
      required: true,
    },
    {
      name: "locationUrl",
      type: "text",
    },
    {
      name: "date",
      type: "date",
      timezone: {
        defaultTimezone: "America/Bogota",
      },
      required: true,
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
          displayFormat: "MMM d, yyyy h:mm a",
        },
      },
    },
    {
      name: "registrationStart",
      type: "date",
      timezone: {
        defaultTimezone: "America/Bogota",
      },
      // required: true,
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
          displayFormat: "MMM d, yyyy h:mm a",
        },
      },
    },
    {
      name: "registrationEnd",
      type: "date",
      timezone: {
        defaultTimezone: "America/Bogota",
      },
      // required: true,
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
          displayFormat: "MMM d, yyyy h:mm a",
        },
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "duration",
          type: "number",
          required: true,
          min: 1,
          admin: { width: "50%" },
        },
        {
          name: "durationUnit",
          type: "select",
          required: true,
          defaultValue: "hours",
          options: [
            { label: "Minutes", value: "minutes" },
            { label: "Hours", value: "hours" },
            { label: "Days", value: "days" },
          ],
          admin: { width: "50%" },
        },
      ],
    },
  ],
  hooks: createRevalidateHooks({ source: "events", tag: EVENTS_TAG }),
};
