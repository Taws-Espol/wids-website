import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

export function TypographyH6({ className, ...props }: ComponentProps<"h6">) {
  return (
    <h6
      className={cn(
        "font-barlow text-[18px] leading-[1.3] font-normal md:text-[18px]",
        className,
      )}
      {...props}
    />
  );
}
