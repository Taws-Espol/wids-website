import type { CollectionConfig } from "payload";

import { isAdminOrEditor } from "@/shared/lib/payload/utils/is-admin-or-editor";

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
    defaultColumns: ["name", "title", "event", "createdAt", "updatedAt"],
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
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "bio",
      type: "textarea",
      required: true,
    },
    {
      name: "linkedin",
      type: "text",
      label: "LinkedIn",
    },
    {
      name: "event",
      type: "relationship",
      relationTo: "events",
      required: true,
    },
  ],
};
