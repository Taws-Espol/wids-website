import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CalendarIcon,
  ClockIcon,
  Location01Icon,
  CheckCircle,
} from "@hugeicons/core-free-icons";

import { TypographyH1 } from "@/shared/components/ui/typography-h1";
import { TypographyParagraph } from "@/shared/components/ui/typography-paragraph";
import type { Locale } from "@/shared/lib/next-intl/types";
import type { Speaker } from "@/shared/lib/payload/types/payload";

import { HeroSection } from "@/features/landing/components/hero-section";
import { Stepper } from "@/features/landing/components/stepper";
import { PersonCard } from "@/features/landing/components/person-card";
import { getConferencePageData } from "@/features/landing/queries/get-conference-page-data";
import { ConferenceRegistrationDialog } from "@/features/registration/components/conference-registration-dialog";

export default async function Conference({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("features.landing.conference");

  const { event, schedule, speakers } = await getConferencePageData(locale);

  return (
    <main className="flex flex-col gap-20 px-4 py-20 md:px-4 lg:px-8 xl:px-42">
      <HeroSection
        title={t("title")}
        src="https://cdn.taws.espol.edu.ec/wids/conference-hero.webp"
        alt="Conference hero"
        color="green_light"
      />

      {event && (
        <section className="flex flex-col items-center gap-8 md:flex-row">
          <div className="flex w-full flex-col gap-8 md:w-1/2">
            <TypographyH1>{event.title}</TypographyH1>

            <TypographyParagraph>{event.description}</TypographyParagraph>

            <Suspense>
              <ConferenceRegistrationDialog
                ctaLabel={t("cta")}
                eventId={event.id}
                registrationStart={event.registrationStart ?? ""}
                registrationEnd={event.registrationEnd ?? ""}
              />
            </Suspense>
          </div>

          <div className="relative aspect-square w-full md:w-1/2">
            <Image
              src="https://cdn.taws.espol.edu.ec/wids/conference-collage.webp"
              alt="Conference collage"
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

          <div className="flex flex-col gap-8 md:flex-row md:flex-wrap md:justify-evenly md:gap-12">
            <div className="flex flex-1 flex-col items-center gap-2 text-center">
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

            <div className="flex flex-1 flex-col items-center gap-2 text-center">
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

            <div className="flex flex-1 flex-col items-center gap-2 text-center">
              <Link
                href={event.locationUrl || "#"}
                target={event.locationUrl ? "_blank" : undefined}
                rel={event.locationUrl ? "noopener noreferrer" : undefined}
              >
                <HugeiconsIcon
                  icon={Location01Icon}
                  className="text-w-green-dark size-12"
                />
              </Link>
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
