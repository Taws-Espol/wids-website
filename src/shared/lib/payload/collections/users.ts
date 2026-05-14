// import { render } from "react-email";
import type { CollectionConfig } from "payload";

// import ForgotPassword from "../../react-email/forgot-password.tsx";
// import VerifyEmail from "../../react-email/verify-email.tsx";
import { checkRole } from "../utils/check-role.ts";
import { ensureFirstUserIsAdmin } from "../utils/ensure-first-user-is-admin.ts";
import { isAdmin } from "../utils/is-admin.ts";
import { isAdminFieldAccess } from "../utils/is-admin-field-access.ts";
import { isAdminOrSelf } from "../utils/is-admin-or-self.ts";

export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "User", plural: "Users" },
  auth: true,
  // auth: {
  //   verify: {
  //     generateEmailSubject: () => "WiDS Guayaquil | Confirm your email address",
  //     async generateEmailHTML(args) {
  //       const url = `${process.env.APP_URL}/admin/users/verify/${args?.token}`;

  //       const html = await render(
  //         VerifyEmail({
  //           url,
  //           name: args?.user?.name ?? "there",
  //         }),
  //       );

  //       return html;
  //     },
  //   },
  //   forgotPassword: {
  //     generateEmailSubject: () => "WiDS Guayaquil | Reset your password",
  //     async generateEmailHTML(args) {
  //       const url = `${process.env.APP_URL}/admin/reset/${args?.token}`;

  //       const html = await render(
  //         ForgotPassword({
  //           url,
  //           name: args?.user?.name ?? "there",
  //         }),
  //       );

  //       return html;
  //     },
  //   },
  // },
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
