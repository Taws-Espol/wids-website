import type { Access } from "payload";

import { checkRole } from "@/shared/lib/payload/utils/check-role";

export const isAdminOrEditor: Access = ({ req: { user } }) =>
  checkRole(["admin", "editor"], user);
