import type { CollectionConfig } from "payload";
import { SPEAKERS_TAG } from "../../../constants/cache-tags.ts";
import { revalidateCache } from "../../../utils/revalidate-cache.ts";
import { isAdminOrEditor } from "../utils/is-admin-or-editor.ts";

export const Speakers: CollectionConfig = {
  slug: "speakers",
  labels: { singular: "Speaker", plural: "Speakers" },
  access: {
    create: isAdminOrEditor,
    read: () => true,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  admin: {
    group: "Content",
    defaultColumns: [
      "name",
      "title",
      "affiliation",
      "event",
      "createdAt",
      "updatedAt",
    ],
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "affiliation",
      type: "text",
      required: true,
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "about",
      type: "textarea",
      required: true,
      localized: true,
    },
    {
      name: "linkedin",
      type: "text",
      label: "LinkedIn",
    },
    {
      name: "event",
      type: "relationship",
      label: "Event",
      relationTo: "events",
      required: true,
    },
  ],
  hooks: {
    afterChange: [
      async ({ req }) => {
        await revalidateCache({ req, source: "speakers", tag: SPEAKERS_TAG });
      },
    ],
  },
};
