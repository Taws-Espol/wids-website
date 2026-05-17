import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { TypographyH1 } from "@/shared/components/ui/typography-h1";
import { TypographyParagraph } from "@/shared/components/ui/typography-paragraph";
import type { Locale } from "@/shared/lib/next-intl/types";

import { getTermsAndConditionsPageData } from "@/features/landing/queries/get-terms-and-conditions-page-data";

export default async function TermsAndConditions({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("features.landing.terms-and-conditions");

  const termsAndConditionsData = await getTermsAndConditionsPageData(locale);

  return (
    <main className="flex flex-col gap-20 px-4 py-20 md:px-4 lg:px-8 xl:px-42">
      <section className="flex flex-col items-center gap-8 md:flex-row">
        <div className="flex w-full flex-col gap-8 md:w-1/2">
          <TypographyH1>{t("title")}</TypographyH1>

          <TypographyParagraph>{t("description")}</TypographyParagraph>
        </div>

        <div className="relative aspect-square w-full md:w-1/2">
          <Image
            src="https://cdn.taws.espol.edu.ec/wids/learn-collage.webp"
            alt="Learn collage"
            fill
            sizes="(max-width: 768px) calc(100vw - 2rem), 50vw"
          />
        </div>
      </section>

      {termsAndConditionsData.content && (
        <TypographyParagraph className="text-muted-foreground px-12 wrap-break-word whitespace-pre-wrap">
          {termsAndConditionsData.content}
        </TypographyParagraph>
      )}
    </main>
  );
}
