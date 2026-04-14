import Image from "next/image";

import { COLORS } from "@/shared/constants/colors";
import { TypographyH2 } from "@/shared/components/ui/typography-h2";
import { cn } from "@/shared/utils/cn";

interface Props {
  title: string;
  src: string;
  alt: string;
  color?: keyof typeof COLORS;
}

export function HeroSection({ title, src, alt, color }: Props) {
  return (
    <section className="relative">
      <div className="relative aspect-1013/303 w-full">
        <Image
          src={src}
          alt={alt}
          fill
          fetchPriority="high"
          loading="eager"
          sizes="(max-width: 2340px) 100vw, 2340px"
          className="object-cover"
        />
      </div>

      <div
        className={cn(
          "absolute -top-[20%] left-[10%] flex aspect-square items-center justify-center rounded-full p-6 text-center md:w-auto md:p-12",
          color && `bg-w-${color.replace("_", "-")}`,
        )}
      >
        <TypographyH2
          className={cn(
            color && `text-w-${color.replace("_", "-")}-foreground`,
          )}
        >
          {title}
        </TypographyH2>
      </div>
    </section>
  );
}
