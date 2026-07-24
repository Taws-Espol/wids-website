import { Suspense } from "react";
import { cookies } from "next/headers";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/shared/components/ui/link";
import { TypographyH1 } from "@/shared/components/ui/typography-h1";
import { TypographyParagraph } from "@/shared/components/ui/typography-paragraph";
import { ATTENDANCE_TOKEN_COOKIE_NAME } from "@/shared/constants/attendance";
import type { Locale } from "@/shared/lib/next-intl/types";
import { formatDateTimeText } from "@/shared/utils/format-datetime-text";

import { AttendancePanel } from "@/features/registration/components/attendance-panel";
import { getConferenceRegistrationByAttendanceToken } from "@/features/registration/queries/get-conference-registration-by-attendance-token";

export default async function ConferenceAttendancePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 py-20 text-center">
      <Suspense fallback={<AttendanceFallback />}>
        <AttendanceContent locale={locale} />
      </Suspense>
    </main>
  );
}

function AttendanceFallback() {
  return (
    <div
      aria-hidden
      className="bg-muted h-55 w-full max-w-130 animate-pulse rounded-[24px]"
    />
  );
}

async function AttendanceContent({ locale }: { locale: Locale }) {
  const t = await getTranslations(
    "features.registration.attendance-confirmation",
  );

  const cookieStore = await cookies();
  const token = cookieStore.get(ATTENDANCE_TOKEN_COOKIE_NAME)?.value;

  const registration = token
    ? await getConferenceRegistrationByAttendanceToken(token)
    : null;

  if (!registration) {
    return (
      <>
        <TypographyH1 className="text-[28px] md:text-[32px]">
          {t("not-found.title")}
        </TypographyH1>
        <TypographyParagraph className="text-muted-foreground max-w-110">
          {t("not-found.description")}
        </TypographyParagraph>
        <Link href="/conference">{t("not-found.cta")}</Link>
      </>
    );
  }

  const event =
    typeof registration.event === "object" ? registration.event : null;

  const hasEventPassed = event != null && new Date(event.date) < new Date();

  if (!event || hasEventPassed) {
    return (
      <>
        <TypographyH1 className="text-[28px] md:text-[32px]">
          {t("event-passed.title")}
        </TypographyH1>
        <TypographyParagraph className="text-muted-foreground max-w-110">
          {t("event-passed.description")}
        </TypographyParagraph>
      </>
    );
  }

  return (
    <AttendancePanel
      initialConfirmed={registration.attendanceConfirmed}
      name={registration.firstName}
      eventTitle={event.title}
      eventDateTimeText={formatDateTimeText(event.date, locale)}
      eventLocation={event.location}
    />
  );
}
