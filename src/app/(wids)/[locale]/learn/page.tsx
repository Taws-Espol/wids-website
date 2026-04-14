import { cacheTag } from "next/cache";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  LaptopProgrammingIcon,
  TeachingIcon,
} from "@hugeicons/core-free-icons";

import { LANDING_TAG } from "@/shared/constants/cache-tags";
import { TypographyH1 } from "@/shared/components/ui/typography-h1";
import { TypographyH2 } from "@/shared/components/ui/typography-h2";
import { Link } from "@/shared/components/ui/link";
import { TypographyParagraph } from "@/shared/components/ui/typography-paragraph";
import type { Locale } from "@/shared/lib/next-intl/types";

import { HeroSection } from "@/features/landing/components/hero-section";

export default async function Learn({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  "use cache";

  const { locale } = await params;

  setRequestLocale(locale);
  cacheTag(LANDING_TAG);

  const t = await getTranslations("features.landing.learn");

  return (
    <main className="flex flex-col gap-20 px-4 py-20 md:px-4 lg:px-8 xl:px-42">
      <HeroSection
        title={t("title")}
        src="https://cdn.taws.espol.edu.ec/wids/learn-hero.jpg"
        alt="Learn hero"
        color="blue"
      />

      <section className="flex flex-col items-center gap-8 md:flex-row">
        <div className="flex w-full flex-col gap-8 md:w-1/2">
          <TypographyH1>{t("subtitle")}</TypographyH1>

          <TypographyParagraph>{t("description")}</TypographyParagraph>
        </div>

        <div className="relative aspect-1024/683 w-full md:w-1/2">
          <Image
            src="https://cdn.taws.espol.edu.ec/wids/learn-collage.jpg"
            alt="Learn collage"
            fill
            sizes="(max-width: 768px) calc(100vw - 2rem), 50vw"
          />
        </div>
      </section>

      <section className="flex flex-col items-center gap-32 md:flex-row md:px-16">
        <div className="flex flex-col items-center gap-8">
          <HugeiconsIcon
            icon={LaptopProgrammingIcon}
            className="text-w-green-dark size-16"
          />
          <TypographyH2>{t("datathon")}</TypographyH2>
          <TypographyParagraph>{t("datathon-description")}</TypographyParagraph>
          <Link href="/learn/datathon" className="-mt-6 self-start">
            {t("datathon-cta")}
          </Link>
        </div>

        <div className="flex flex-col items-center gap-8">
          <HugeiconsIcon
            icon={TeachingIcon}
            className="text-w-green-dark size-16"
          />
          <TypographyH2>{t("nextgen")}</TypographyH2>
          <TypographyParagraph>{t("nextgen-description")}</TypographyParagraph>
          <Link href="/learn/nextgen" className="-mt-6 self-start">
            {t("nextgen-cta")}
          </Link>
        </div>
      </section>
    </main>
  );
}
