import type { CollectionConfig } from "payload";

import { checkRole } from "@/shared/lib/payload/utils/check-role";
import { ensureFirstUserIsAdmin } from "@/shared/lib/payload/utils/ensure-first-user-is-admin";
import { isAdmin } from "@/shared/lib/payload/utils/is-admin";
import { isAdminFieldAccess } from "@/shared/lib/payload/utils/is-admin-field-access";
import { isAdminOrSelf } from "@/shared/lib/payload/utils/is-admin-or-self";

export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "User", plural: "Users" },
  auth: true,
  access: {
    admin: ({ req: { user } }) =>
      checkRole(["admin", "editor", "viewer"], user),
    create: isAdmin,
    delete: isAdmin,
    read: isAdminOrSelf,
    unlock: isAdmin,
    update: isAdminOrSelf,
  },
  admin: {
    group: "Users",
    defaultColumns: ["name", "email", "role", "createdAt", "updatedAt"],
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
      access: {
        create: isAdminFieldAccess,
        read: () => true,
        update: isAdminFieldAccess,
      },
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
      options: [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "Editor",
          value: "editor",
        },
        {
          label: "Viewer",
          value: "viewer",
        },
      ],
    },
  ],
};
