import { getConferenceAttendanceConfirmationPixelUrl } from "@/shared/lib/umami/umami-email-pixels";
import type { Locale } from "@/shared/lib/next-intl/types";

import { EmailDetailsCard } from "./email-details-card";
import {
  buildTransactionalEmail,
  type EmailDefinition,
} from "./render-transactional-email";

export type ConferenceAttendanceConfirmationData = {
  eventTitle: string;
  eventDateTimeText: string;
  eventLocation: string;
};

export const conferenceAttendanceConfirmationEmail: EmailDefinition<ConferenceAttendanceConfirmationData> =
  {
    namespace:
      "features.registration.conference-emails.attendance-confirmation",
    program: "conference",
    getPixelUrl: getConferenceAttendanceConfirmationPixelUrl,
    children: (t, data) => (
      <EmailDetailsCard
        program="conference"
        title={data.eventTitle}
        rows={[
          <>
            {t("event-date-label")} {data.eventDateTimeText}
            <br />
            {t("event-location-label")} {data.eventLocation}
          </>,
        ]}
      />
    ),
  };

type PreviewProps = ConferenceAttendanceConfirmationData & {
  locale: Locale;
  name: string;
  confirmUrl: string;
};

/** Rendered by `pnpm dev:email`. Production sends go through the task. */
export const ConferenceAttendanceConfirmationEmail = async ({
  locale,
  name,
  confirmUrl,
  ...data
}: PreviewProps) =>
  (
    await buildTransactionalEmail({
      definition: conferenceAttendanceConfirmationEmail,
      locale,
      name,
      ctaHref: confirmUrl,
      data,
    })
  ).element;

ConferenceAttendanceConfirmationEmail.PreviewProps = {
  locale: "es",
  name: "Ana",
  eventTitle: "WiDS Conference Guayaquil 2026",
  eventDateTimeText: "12 de mayo de 2026, 09:00",
  eventLocation: "ESPOL, Guayaquil",
  confirmUrl:
    "https://wids.taws.espol.edu.ec/api/attendance?t=example-token&utm_source=email&utm_medium=email&utm_campaign=attendance-confirmation",
} satisfies PreviewProps;

export default ConferenceAttendanceConfirmationEmail;
