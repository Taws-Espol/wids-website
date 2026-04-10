import Link from "next/link";
import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

export type NavLinkProps = ComponentProps<typeof Link> & {
  underlineColor: string;
};

export function NavLink({
  className,
  underlineColor,
  style,
  ...props
}: NavLinkProps) {
  return (
    <Link
      {...props}
      className={cn(
        "text-foreground text-lg font-normal underline decoration-6 underline-offset-4 transition-all duration-500 hover:no-underline",
        className,
      )}
      style={{ ...style, textDecorationColor: underlineColor }}
    />
  );
}
