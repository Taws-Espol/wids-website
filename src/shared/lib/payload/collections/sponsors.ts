import type { CollectionConfig } from "payload";
import { SPONSORS_TAG } from "../../../constants/cache-tags.ts";
import { revalidateCache } from "../../../utils/revalidate-cache.ts";
import { SPONSOR_TIERS } from "../constants/sponsor-tiers.ts";
import { isAdminOrEditor } from "../utils/is-admin-or-editor.ts";

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
  hooks: {
    afterChange: [
      async ({ req }) => {
        await revalidateCache({ req, source: "sponsors", tag: SPONSORS_TAG });
      },
    ],
  },
};
