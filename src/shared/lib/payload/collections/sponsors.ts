import type { CollectionConfig } from "payload";
import { SPONSORS_TAG } from "@/shared/constants/cache-tags";
import { createRevalidateHooks } from "@/shared/lib/payload/utils/create-revalidate-hooks";
import { SPONSOR_TIERS } from "@/shared/lib/payload/constants/sponsor-tiers";
import { isAdminOrEditor } from "@/shared/lib/payload/utils/is-admin-or-editor";

export const Sponsors: CollectionConfig = {
  slug: "sponsors",
  labels: { singular: "Sponsor", plural: "Sponsors" },
  access: {
    create: isAdminOrEditor,
    read: () => true,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  admin: {
    group: "Content",
    defaultColumns: ["name", "tier", "event", "createdAt", "updatedAt"],
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "website",
      type: "text",
      label: "Website URL",
    },
    {
      name: "tier",
      type: "select",
      required: true,
      options: SPONSOR_TIERS.map((tier) => ({
        label: tier.charAt(0).toUpperCase() + tier.slice(1),
        value: tier,
      })),
    },
    {
      name: "edition",
      type: "relationship",
      relationTo: "editions",
      required: true,
    },
  ],
  hooks: createRevalidateHooks({ source: "sponsors", tag: SPONSORS_TAG }),
};
