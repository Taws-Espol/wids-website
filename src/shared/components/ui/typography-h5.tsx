import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

export function TypographyH5({ className, ...props }: ComponentProps<"h5">) {
  return (
    <h5
      className={cn(
        "font-barlow text-[20px] leading-[1.3] font-bold md:text-[20px]",
        className,
      )}
      {...props}
    />
  );
}
