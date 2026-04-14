import { cacheTag } from "next/cache";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CalendarIcon,
  ClockIcon,
  Location01Icon,
  CheckCircle,
} from "@hugeicons/core-free-icons";

import { LANDING_TAG } from "@/shared/constants/cache-tags";
import { Button } from "@/shared/components/ui/button";
import {
  TypographyH1,
  TypographyParagraph,
} from "@/shared/components/ui/typography-eyebrow";
import type { Locale } from "@/shared/lib/next-intl/types";
import type { Speaker } from "@/shared/lib/payload/types/payload";

import { BreadcrumbBanner } from "@/features/landing/components/breadcrumb-banner";
import { Stepper } from "@/features/landing/components/stepper";
import { PersonCard } from "@/features/landing/components/person-card";
import { getDatathonPageData } from "@/features/landing/queries/get-datathon-page-data";

export default async function Datathon({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  "use cache";

  const { locale } = await params;

  setRequestLocale(locale);
  cacheTag(LANDING_TAG);

  const t = await getTranslations("features.landing.learn-datathon");

  const { event, schedule, speakers } = await getDatathonPageData(locale);

  return (
    <main className="flex flex-col gap-20 px-4 pb-20 md:px-4 lg:px-8 xl:px-42">
      <BreadcrumbBanner
        title={t("title")}
        backLinkHref="/learn"
        backLinkLabel="Learn"
        color="blue"
      />

      {event && (
        <section className="flex flex-col items-center gap-8 md:flex-row">
          <div className="flex w-full flex-col gap-8 md:w-1/2">
            <TypographyH1>{event.title}</TypographyH1>

            <TypographyParagraph>{event.description}</TypographyParagraph>

            <Button variant="blue" className="self-start">
              {t("cta")}
            </Button>
          </div>

          <div className="relative aspect-1024/683 w-full md:w-1/2">
            <Image
              src="https://cdn.taws.espol.edu.ec/wids/learn-collage.jpg"
              alt="Learn collage"
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 768px) calc(100vw - 2rem), 50vw"
            />
          </div>
        </section>
      )}

      {event && (
        <section className="flex w-full flex-col items-center justify-center gap-16">
          <TypographyH1>{t("details")}</TypographyH1>

          <div className="flex flex-col gap-8 md:flex-row md:gap-24">
            <div className="flex flex-col items-center gap-2 text-center">
              <HugeiconsIcon
                icon={CalendarIcon}
                className="text-w-green-dark size-12"
              />
              <TypographyParagraph>
                {new Date(event.date).toLocaleDateString(locale, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  timeZone: "America/Guayaquil",
                })}
              </TypographyParagraph>
            </div>

            <div className="flex flex-col items-center gap-2 text-center">
              <HugeiconsIcon
                icon={ClockIcon}
                className="text-w-green-dark size-12"
              />
              <TypographyParagraph>
                {t(`duration-units.${event.durationUnit}`, {
                  count: event.duration,
                })}
              </TypographyParagraph>
            </div>

            <div className="flex flex-col items-center gap-2 text-center">
              <HugeiconsIcon
                icon={Location01Icon}
                className="text-w-green-dark size-12"
              />
              <TypographyParagraph>{event.location}</TypographyParagraph>
            </div>
          </div>
        </section>
      )}

      {event && event.requirements && event.requirements.length > 0 && (
        <section className="flex w-full flex-col items-center justify-center gap-16">
          <TypographyH1>{t("requirements")}</TypographyH1>

          <div className="flex flex-col gap-8 md:flex-row md:flex-wrap md:justify-evenly md:gap-12">
            {event?.requirements.map((requirement) => (
              <div
                key={requirement.id}
                className="flex flex-1 flex-col items-center gap-2 text-center"
              >
                <HugeiconsIcon
                  icon={CheckCircle}
                  className="text-w-green-dark size-12"
                />
                <TypographyParagraph>{requirement.text}</TypographyParagraph>
              </div>
            ))}
          </div>
        </section>
      )}

      {speakers.length > 0 && (
        <section className="flex flex-col items-center gap-8">
          <TypographyH1>{t("speakers")}</TypographyH1>

          <div className="flex flex-wrap items-center justify-center gap-8">
            {speakers.map((speaker) => (
              <PersonCard key={speaker.id} person={speaker} />
            ))}
          </div>
        </section>
      )}

      {schedule.length > 0 && (
        <section className="flex w-full flex-col items-center justify-center gap-8">
          <TypographyH1>{t("schedule")}</TypographyH1>

          <Stepper
            items={schedule.map((schedule) => ({
              title: schedule.title ?? "",
              description: schedule.description ?? "",
              location: schedule.location ?? "",
              date: schedule.startTime,
              duration: t(`duration-units.${schedule.durationUnit}`, {
                count: schedule.duration,
              }),
              speakerName: (schedule.speaker as Speaker)?.name ?? "",
              speakerTitle: (schedule.speaker as Speaker)?.title ?? "",
            }))}
            locale={locale}
            color="blue"
          />
        </section>
      )}
    </main>
  );
}
