import type { CollectionConfig } from "payload";

import { isAdminOrEditor } from "../utils/is-admin-or-editor.ts";

export const OperationsMedia: CollectionConfig = {
  slug: "operations-media",
  labels: { singular: "Operations Media", plural: "Operations Media" },
  upload: {
    mimeTypes: ["image/*", "application/pdf"],
  },
  access: {
    create: isAdminOrEditor,
    read: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  admin: {
    group: "Operations",
    defaultColumns: ["filename", "alt", "createdAt"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
    },
  ],
};
