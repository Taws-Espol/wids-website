import type { CollectionConfig, PayloadRequest } from "payload";
import { SCHEDULES_TAG } from "../../../constants/cache-tags.ts";
import { revalidateCache } from "../../../utils/revalidate-cache.ts";
import { SCHEDULE_TYPES } from "../constants/schedule-types.ts";
import { isAdminOrEditor } from "../utils/is-admin-or-editor.ts";

export const Schedules: CollectionConfig = {
  slug: "schedules",
  labels: { singular: "Schedule", plural: "Schedules" },
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
      "startTime",
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
      validate: async (
        value: string | null | undefined,
        {
          req,
          siblingData,
        }: { req: PayloadRequest; siblingData: Record<string, unknown> },
      ) => {
        if (!value || !siblingData?.event) return true;

        const eventId =
          typeof siblingData.event === "object" && siblingData.event !== null
            ? (siblingData.event as { id: string }).id
            : (siblingData.event as string);

        const event = await req.payload.findByID({
          collection: "events",
          id: eventId,
          depth: 0,
        });

        if (!event?.type) return true;

        if (
          event.type === "conference" &&
          !["activity", "talk"].includes(value)
        ) {
          return "Conference events only allow activity or talk schedules";
        }

        if (
          ["nextgen", "datathon"].includes(event.type) &&
          value !== "workshop"
        ) {
          return "NextGen and Datathon events only allow workshop schedules";
        }

        return true;
      },
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
      localized: true,
    },
    {
      name: "speaker",
      type: "relationship",
      relationTo: "speakers",
      validate: (
        value: unknown,
        { siblingData }: { siblingData: Record<string, unknown> },
      ) => {
        if (siblingData?.type === "workshop" && !value) {
          return "Workshop schedules require a speaker";
        }

        return true;
      },
      admin: {
        condition: (_, siblingData) =>
          siblingData?.type === "talk" || siblingData?.type === "workshop",
      },
    },
    {
      name: "startTime",
      type: "date",
      timezone: {
        defaultTimezone: "America/Bogota",
      },
      required: true,
      label: "Start Time",
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
          defaultValue: "minutes",
          options: [
            { label: "Minutes", value: "minutes" },
            { label: "Hours", value: "hours" },
          ],
          admin: { width: "50%" },
        },
      ],
    },
    {
      name: "location",
      type: "text",
      required: true,
    },
  ],
  hooks: {
    afterChange: [
      async ({ req }) => {
        await revalidateCache({ req, source: "schedules", tag: SCHEDULES_TAG });
      },
    ],
  },
};
