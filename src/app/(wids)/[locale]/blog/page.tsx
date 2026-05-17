import Image from "next/image";
import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";

import { TypographyH1 } from "@/shared/components/ui/typography-h1";
import { TypographyParagraph } from "@/shared/components/ui/typography-paragraph";

import { HeroSection } from "@/features/landing/components/hero-section";

export default function Blog({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations("features.landing.blog");

  return (
    <main className="flex flex-col gap-20 px-4 py-20 md:px-4 lg:px-8 xl:px-42">
      <HeroSection
        title={t("title")}
        src="https://cdn.taws.espol.edu.ec/wids/blog-hero.webp"
        alt="Blog hero"
        color="yellow"
      />

      <section className="flex flex-col items-center gap-8 md:flex-row">
        <div className="flex w-full flex-col gap-8 md:w-1/2">
          <TypographyH1>{t("subtitle")}</TypographyH1>

          <TypographyParagraph>{t("description")}</TypographyParagraph>
        </div>

        <div className="relative aspect-square w-full md:w-1/2">
          <Image
            src="https://cdn.taws.espol.edu.ec/wids/blog-collage.webp"
            alt="Blog collage"
            fill
            sizes="(max-width: 768px) calc(100vw - 2rem), 50vw"
          />
        </div>
      </section>
    </main>
  );
}
