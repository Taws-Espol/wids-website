import { cacheTag } from "next/cache";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";

import { LANDING_TAG } from "@/shared/constants/cache-tags";
import { TypographyH1 } from "@/shared/components/ui/typography-h1";
import { TypographyParagraph } from "@/shared/components/ui/typography-paragraph";
import type { Locale } from "@/shared/lib/next-intl/types";

import { PersonCard } from "@/features/landing/components/person-card";
import { SponsorCard } from "@/features/landing/components/sponsor-card";
import { HeroSlider } from "@/features/landing/components/hero-slider";
import { getHomePageData } from "@/features/landing/queries/get-home-page-data";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  "use cache";

  const { locale } = await params;

  setRequestLocale(locale);
  cacheTag(LANDING_TAG);

  const t = await getTranslations("features.landing.home");

  const { edition, events, ambassadors, sponsors } =
    await getHomePageData(locale);

  const ambassador = ambassadors.find(
    (ambassador) => ambassador.role === "ambassador",
  );
  const coAmbassadors = ambassadors.filter(
    (ambassador) => ambassador.role === "co-ambassador",
  );

  return (
    <main className="flex flex-col gap-20 px-4 pb-20 md:px-4 lg:px-8 xl:px-42">
      {events.length > 0 && <HeroSlider events={events} />}

      {edition && (
        <section className="flex flex-col items-center gap-8 md:flex-row">
          <div className="flex w-full flex-col gap-8 md:w-1/2">
            <TypographyH1>{edition.title}</TypographyH1>

            <TypographyParagraph>{edition.description}</TypographyParagraph>
          </div>

          <div className="relative aspect-640/541 w-full md:w-1/2">
            <Image
              src="https://cdn.taws.espol.edu.ec/wids/home-collage.png"
              alt="Home collage"
              fill
              sizes="(max-width: 768px) calc(100vw - 2rem), 50vw"
            />
          </div>
        </section>
      )}

      {ambassador && (
        <section className="flex w-full flex-col items-center justify-center gap-8">
          <TypographyH1>{t("ambassador")}</TypographyH1>

          <div className="flex items-center justify-center">
            <PersonCard person={ambassador} />
          </div>
        </section>
      )}

      {coAmbassadors.length > 0 && (
        <section className="flex flex-col items-center gap-8">
          <TypographyH1>{t("co-ambassadors")}</TypographyH1>

          <div className="flex flex-wrap items-center justify-center gap-8">
            {coAmbassadors.map((coAmbassador) => (
              <PersonCard key={coAmbassador.id} person={coAmbassador} />
            ))}
          </div>
        </section>
      )}

      {sponsors.length > 0 && (
        <section className="flex flex-col items-center gap-8">
          <TypographyH1>{t("sponsors")}</TypographyH1>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {sponsors.map((sponsor) => (
              <SponsorCard key={sponsor.id} sponsor={sponsor} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
