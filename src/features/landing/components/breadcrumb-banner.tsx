import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeftIcon } from "@hugeicons/core-free-icons";

import { COLORS } from "@/shared/constants/colors";
import { cn } from "@/shared/utils/cn";

interface Props {
  title: string;
  backLinkHref: string;
  backLinkLabel: string;
  color?: keyof typeof COLORS;
}

export function BreadcrumbBanner({
  title,
  backLinkHref,
  backLinkLabel,
  color = "green_dark",
}: Props) {
  return (
    <section
      className={cn(
        "fixed top-0 left-0 flex w-screen items-center justify-start px-12 py-8 md:px-32",
        color &&
          `bg-w-${color.replace("_", "-")} text-w-${color.replace("_", "-")}-foreground`,
      )}
      style={{
        position: "relative",
        left: "50%",
        right: "50%",
        width: "100vw",
        marginLeft: "-50vw",
        marginRight: "-50vw",
      }}
    >
      <div className="flex w-full items-center gap-2 text-2xl">
        <Link
          href={backLinkHref}
          className="flex items-center gap-1 hover:underline"
        >
          <HugeiconsIcon icon={ArrowLeftIcon} className="size-6" />
          {backLinkLabel}
        </Link>
        <span>|</span>
        <span>{title}</span>
      </div>
    </section>
  );
}
