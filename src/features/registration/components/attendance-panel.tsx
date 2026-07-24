"use client";

import { useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";

import { Button } from "@/shared/components/ui/button";
import { TypographyH1 } from "@/shared/components/ui/typography-h1";
import { TypographyParagraph } from "@/shared/components/ui/typography-paragraph";
import type { Locale } from "@/shared/lib/next-intl/types";

import { setConferenceAttendanceAction } from "@/features/registration/actions/set-conference-attendance";

interface Props {
  initialConfirmed: boolean;
  name: string;
  eventTitle: string;
  eventDateTimeText: string;
  eventLocation: string;
}

export function AttendancePanel({
  initialConfirmed,
  name,
  eventTitle,
  eventDateTimeText,
  eventLocation,
}: Props) {
  const t = useTranslations("features.registration.attendance-confirmation");
  const locale = useLocale() as Locale;

  const [confirmed, setConfirmed] = useState(initialConfirmed);
  const [isPending, startTransition] = useTransition();

  const setAttendance = (next: boolean) => {
    startTransition(async () => {
      const { error } = await setConferenceAttendanceAction(next, locale);

      if (error) {
        switch (error.code) {
          case "EVENT_PASSED":
            toast.error(t("errors.event-passed"));
            return;
          case "TOKEN_MISSING":
          case "TOKEN_INVALID":
            toast.error(t("errors.token-invalid"));
            return;
          default:
            toast.error(t("errors.unknown"));
            return;
        }
      }

      setConfirmed(next);
      toast.success(next ? t("toasts.confirmed") : t("toasts.cancelled"));
    });
  };

  if (confirmed) {
    return (
      <div className="border-w-green-light bg-w-green-light/10 flex w-full max-w-130 flex-col items-center gap-4 rounded-[24px] border p-8 text-center">
        <TypographyH1 className="text-[28px] md:text-[32px]">
          {t("confirmed.heading")}
        </TypographyH1>

        <TypographyParagraph className="text-muted-foreground">
          {t("confirmed.description")}
        </TypographyParagraph>

        <Button
          type="button"
          variant="transparent"
          className="text-muted-foreground text-[15px] underline"
          disabled={isPending}
          onClick={() => setAttendance(false)}
        >
          {isPending ? t("states.pending") : t("confirmed.cancel-cta")}
        </Button>
      </div>
    );
  }

  return (
    <div className="border-border flex w-full max-w-130 flex-col items-center gap-6 rounded-[24px] border p-8 text-center">
      <div className="flex flex-col gap-2">
        <TypographyH1 className="text-[28px] md:text-[32px]">
          {t("pending.heading")}
        </TypographyH1>

        <TypographyParagraph className="text-muted-foreground">
          {t("pending.greeting")} {name}, {t("pending.description")}
        </TypographyParagraph>
      </div>

      <div className="bg-muted w-full rounded-[16px] px-4 py-3 text-left">
        <TypographyParagraph className="font-semibold">
          {eventTitle}
        </TypographyParagraph>
        <TypographyParagraph className="text-muted-foreground text-[15px]">
          {t("pending.event-date-label")} {eventDateTimeText}
          <br />
          {t("pending.event-location-label")} {eventLocation}
        </TypographyParagraph>
      </div>

      <Button
        type="button"
        data-umami-event="Attendance confirm button"
        disabled={isPending}
        onClick={() => setAttendance(true)}
      >
        {isPending ? t("states.pending") : t("pending.confirm-cta")}
      </Button>
    </div>
  );
}
