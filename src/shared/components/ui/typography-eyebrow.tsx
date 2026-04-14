import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/shared/utils/cn";

function TypographyH1({ className, ...props }: ComponentPropsWithoutRef<"h1">) {
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

function TypographyParagraph({
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

function TypographyEyebrow({
  className,
  ...props
}: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cn(
        "font-barlow-condensed text-[16px] leading-tight font-bold tracking-[0.8px] uppercase",
        className,
      )}
      {...props}
    />
  );
}

export { TypographyEyebrow, TypographyH1, TypographyParagraph };
