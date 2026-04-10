import { createNavigation } from "next-intl/navigation";
import { routing } from "@/shared/lib/next-intl/routing";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
