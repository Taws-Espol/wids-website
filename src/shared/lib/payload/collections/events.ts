import type { CollectionConfig } from "payload";
import { LANDING_TAG } from "../../../constants/cache-tags.ts";
import { revalidateCache } from "../../../utils/revalidate-cache.ts";
import { EVENT_TYPES } from "../constants/event-types.ts";
import { isAdminOrEditor } from "../utils/is-admin-or-editor.ts";

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
      name: "location",
      type: "text",
      required: true,
    },
    {
      name: "date",
      type: "date",
      required: true,
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
  hooks: {
    afterChange: [
      async ({ req }) => {
        await revalidateCache({ req, source: "events", tag: LANDING_TAG });
      },
    ],
  },
};
