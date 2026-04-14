import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

export function TypographyH3({ className, ...props }: ComponentProps<"h3">) {
  return (
    <h3
      className={cn(
        "font-barlow text-[24px] leading-[1.2] font-semibold md:text-[32px]",
        className,
      )}
      {...props}
    />
  );
}
