import type { CollectionConfig } from "payload";
import { EDITIONS_TAG } from "@/shared/constants/cache-tags";
import { createRevalidateHooks } from "@/shared/lib/payload/utils/create-revalidate-hooks";
import { isAdminOrEditor } from "@/shared/lib/payload/utils/is-admin-or-editor";

export const Editions: CollectionConfig = {
  slug: "editions",
  labels: { singular: "Edition", plural: "Editions" },
  access: {
    create: isAdminOrEditor,
    read: () => true,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  admin: {
    group: "Content",
    defaultColumns: ["title", "year", "createdAt", "updatedAt"],
    useAsTitle: "title",
  },
  fields: [
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
      name: "year",
      type: "number",
      required: true,
      unique: true,
      min: 2000,
    },
  ],
  hooks: createRevalidateHooks({ source: "editions", tag: EDITIONS_TAG }),
};
