import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/shared/utils/cn";

export function TypographyParagraph({
  className,
  ...props
}: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cn(
        "font-barlow-condensed text-[18px] leading-[1.4] font-normal",
        className,
      )}
      {...props}
    />
  );
}
