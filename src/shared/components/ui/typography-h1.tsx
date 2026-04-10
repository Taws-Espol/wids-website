import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

export function TypographyH1({ className, ...props }: ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        "font-barlow text-[40px] leading-[1.1] font-light md:text-[48px]",
        className,
      )}
      {...props}
    />
  );
}
