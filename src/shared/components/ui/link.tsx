import { cva, type VariantProps } from "class-variance-authority";
import LinkPrimitive from "next/link";
import type { ComponentProps, CSSProperties } from "react";
import { cn } from "@/shared/utils/cn";

export type LinkProps = ComponentProps<typeof LinkPrimitive> & {
  underlineColor?: string;
};

const linkVariants = cva("w-fit", {
  variants: {
    variant: {
      default:
        "text-w-green-dark hover:text-w-green-dark underline decoration-2 underline-offset-4 hover:no-underline",
      "main-nav":
        "text-foreground relative inline-block text-lg font-normal transition-all duration-300 after:pointer-events-none after:absolute after:bottom-0 after:left-1/2 after:h-1.5 after:w-full after:origin-center after:-translate-x-1/2 after:scale-x-90 after:bg-(--nav-link-underline-color) after:transition-transform after:duration-300 hover:after:scale-x-100",
      "alt-nav": "text-w-green-dark text-2xl font-bold",
      "alt-subnav":
        "text-w-green-dark text-lg font-normal hover:underline decoration-2 decoration-offset-4",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export function Link({
  className,
  variant = "default",
  underlineColor,
  style,
  ...props
}: LinkProps & VariantProps<typeof linkVariants>) {
  const linkStyle =
    variant === "main-nav"
      ? ({
          ...style,
          "--nav-link-underline-color": underlineColor ?? "currentColor",
        } as CSSProperties)
      : style;

  return (
    <LinkPrimitive
      className={cn(linkVariants({ variant, className }))}
      style={linkStyle}
      {...props}
    />
  );
}
