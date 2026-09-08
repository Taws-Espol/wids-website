import type { TypedUser } from "payload";

import type { Role } from "@/shared/lib/payload/types/role";

export function checkRole(roles: Role[], user: TypedUser | null): boolean {
  if (!user) return false;
  return roles.includes(user.role as Role);
}
