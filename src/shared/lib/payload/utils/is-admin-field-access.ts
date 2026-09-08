import type { FieldAccess } from "payload";

import { checkRole } from "@/shared/lib/payload/utils/check-role";

export const isAdminFieldAccess: FieldAccess = ({ req: { user } }) =>
  checkRole(["admin"], user);
