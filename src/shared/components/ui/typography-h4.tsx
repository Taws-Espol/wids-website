import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

export function TypographyH4({ className, ...props }: ComponentProps<"h4">) {
  return (
    <h4
      className={cn(
        "font-barlow text-[22px] leading-[1.3] font-light md:text-[26px]",
        className,
      )}
      {...props}
    />
  );
}
