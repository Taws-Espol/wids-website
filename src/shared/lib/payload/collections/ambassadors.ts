import type { CollectionConfig } from "payload";
import { LANDING_TAG } from "../../../constants/cache-tags.ts";
import { revalidateCache } from "../../../utils/revalidate-cache.ts";
import { isAdminOrEditor } from "../utils/is-admin-or-editor.ts";

export const Ambassadors: CollectionConfig = {
  slug: "ambassadors",
  labels: { singular: "Ambassador", plural: "Ambassadors" },
  access: {
    create: isAdminOrEditor,
    read: () => true,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  admin: {
    group: "Content",
    defaultColumns: ["name", "title", "edition", "createdAt", "updatedAt"],
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
      name: "edition",
      type: "relationship",
      relationTo: "editions",
      required: true,
    },
  ],
  hooks: {
    afterChange: [
      async ({ req }) => {
        await revalidateCache({ req, source: "ambassadors", tag: LANDING_TAG });
      },
    ],
  },
};
