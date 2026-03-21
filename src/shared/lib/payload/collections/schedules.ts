import type { CollectionConfig } from "payload";

import { SCHEDULE_TYPES } from "@/shared/lib/payload/constants/schedule-types";
import { isAdminOrEditor } from "@/shared/lib/payload/utils/is-admin-or-editor";

export const Schedule: CollectionConfig = {
  slug: "schedules",
  labels: { singular: "Schedule Item", plural: "Schedule" },
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
      "event",
      "date",
      "createdAt",
      "updatedAt",
    ],
    useAsTitle: "title",
  },
  fields: [
    {
      name: "event",
      type: "relationship",
      relationTo: "events",
      required: true,
    },
    {
      name: "type",
      type: "select",
      required: true,
      options: SCHEDULE_TYPES.map((type) => ({
        label: type.charAt(0).toUpperCase() + type.slice(1),
        value: type,
      })),
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "speaker",
      type: "relationship",
      relationTo: "speakers",
      admin: {
        condition: (_, siblingData) => siblingData?.type === "talk",
      },
    },
    {
      name: "date",
      type: "date",
      required: true,
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
          displayFormat: "h:mm a",
        },
      },
    },
    {
      name: "location",
      type: "text",
      required: true,
    },
  ],
};
