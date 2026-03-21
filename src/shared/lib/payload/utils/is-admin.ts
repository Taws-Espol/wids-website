import type { Access } from "payload";

import { checkRole } from "@/shared/lib/payload/utils/check-role";

export const isAdmin: Access = ({ req: { user } }) =>
  checkRole(["admin"], user);
