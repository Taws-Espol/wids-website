import type { CollectionConfig } from "payload";

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
      name: "event",
      type: "relationship",
      relationTo: "events",
      required: true,
    },
  ],
};
