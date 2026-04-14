import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";

import { TypographyH1 } from "@/shared/components/ui/typography-h1";
import { TypographyParagraph } from "@/shared/components/ui/typography-paragraph";
import type { Locale } from "@/shared/lib/next-intl/types";

import { HeroSection } from "@/features/landing/components/hero-section";

export default async function Blog({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations("features.landing.blog");

  return (
    <main className="flex flex-col gap-20 px-4 py-20 md:px-4 lg:px-8 xl:px-42">
      <HeroSection
        title={t("title")}
        src="https://cdn.taws.espol.edu.ec/wids/blog-hero.jpg"
        alt="Blog hero"
        color="yellow"
      />

      <section className="flex flex-col items-center gap-8 md:flex-row">
        <div className="flex w-full flex-col gap-8 md:w-1/2">
          <TypographyH1>{t("subtitle")}</TypographyH1>

          <TypographyParagraph>{t("description")}</TypographyParagraph>
        </div>

        <div className="relative aspect-2048/1365 w-full md:w-1/2">
          <Image
            src="https://cdn.taws.espol.edu.ec/wids/blog-collage.jpg"
            alt="Blog collage"
            fill
            sizes="(max-width: 768px) calc(100vw - 2rem), 50vw"
          />
        </div>
      </section>
    </main>
  );
}
