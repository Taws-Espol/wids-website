import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

export function TypographyH2({ className, ...props }: ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "font-barlow text-[36px] leading-[1.1] font-light md:text-[42px]",
        className,
      )}
      {...props}
    />
  );
}
