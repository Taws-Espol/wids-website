import { cacheTag } from "next/cache";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";

import { LANDING_TAG } from "@/shared/constants/cache-tags";
import { TypographyParagraph } from "@/shared/components/ui/typography-paragraph";
import type { Locale } from "@/shared/lib/next-intl/types";
import { TypographyH1 } from "@/shared/components/ui/typography-h1";

import { HeroSection } from "@/features/landing/components/hero-section";
import { PersonCard } from "@/features/landing/components/person-card";
import { getAboutPageData } from "@/features/landing/queries/get-about-page-data";

export default async function About({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  "use cache";

  const { locale } = await params;

  setRequestLocale(locale);
  cacheTag(LANDING_TAG);

  const t = await getTranslations("features.landing.about");

  const { ambassador, coAmbassadors } = await getAboutPageData(locale);

  return (
    <main className="flex flex-col gap-20 px-4 py-20 md:px-4 lg:px-8 xl:px-42">
      <HeroSection
        title={t("title")}
        src="https://cdn.taws.espol.edu.ec/wids/about-hero.jpg"
        alt="About hero"
        color="green_dark"
      />

      <section className="flex flex-col items-center gap-8 md:flex-row">
        <div className="flex w-full flex-col gap-8 md:w-1/2">
          <TypographyH1>{t("subtitle")}</TypographyH1>

          <TypographyParagraph>{t("description")}</TypographyParagraph>
        </div>

        <div className="relative aspect-video w-full md:w-1/2">
          <Image
            src="https://cdn.taws.espol.edu.ec/wids/about-collage.jpg"
            alt="About collage"
            fill
            sizes="(max-width: 768px) calc(100vw - 2rem), 50vw"
          />
        </div>
      </section>

      <section className="flex w-full flex-col items-center justify-center gap-8">
        <TypographyH1>{t("ambassador")}</TypographyH1>

        <div className="flex items-center justify-center">
          <PersonCard person={ambassador} />
        </div>
      </section>

      <section className="flex flex-col items-center gap-8">
        <TypographyH1>{t("co-ambassadors")}</TypographyH1>

        <div className="flex flex-wrap items-center justify-center gap-8">
          {coAmbassadors.map((coAmbassador) => (
            <PersonCard key={coAmbassador.id} person={coAmbassador} />
          ))}
        </div>
      </section>
    </main>
  );
}
