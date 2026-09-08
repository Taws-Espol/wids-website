import type { CollectionConfig } from "payload";
import { AMBASSADORS_TAG } from "@/shared/constants/cache-tags";
import { createRevalidateHooks } from "@/shared/lib/payload/utils/create-revalidate-hooks";
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
      name: "role",
      type: "select",
      options: [
        {
          label: "Ambassador",
          value: "ambassador",
        },
        {
          label: "Co-Ambassador",
          value: "co-ambassador",
        },
      ],
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
  hooks: createRevalidateHooks({ source: "ambassadors", tag: AMBASSADORS_TAG }),
};
