import type { CollectionConfig } from "payload";

import { isAdminOrEditor } from "@/shared/lib/payload/utils/is-admin-or-editor";

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
      "jobTitle",
      "company",
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
      name: "jobTitle",
      type: "text",
      label: "Job Title",
      required: true,
    },
    {
      name: "company",
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
