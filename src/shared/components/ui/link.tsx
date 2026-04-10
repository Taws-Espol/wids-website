import LinkPrimitive from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/shared/utils/cn";

export type LinkProps = ComponentProps<typeof LinkPrimitive>;

export function Link({ className, ...props }: LinkProps) {
  return (
    <LinkPrimitive
      className={cn(
        "text-foreground hover:text-w-green-dark w-fit underline decoration-2 underline-offset-4 hover:no-underline",
        className,
      )}
      {...props}
    />
  );
}
