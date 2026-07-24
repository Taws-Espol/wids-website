import { getConferenceRegistrationReminderPixelUrl } from "@/shared/lib/umami/umami-email-pixels";
import type { Locale } from "@/shared/lib/next-intl/types";

import { EmailDetailsCard } from "./email-details-card";
import { CONFERENCE_EMAIL_THEME } from "./email-theme";
import {
  buildTransactionalEmail,
  type EmailDefinition,
} from "./render-transactional-email";

export type ConferenceRegistrationReminderData = {
  eventTitle: string;
  eventDateTimeText: string;
  eventLocation: string;
};

export const conferenceRegistrationReminderEmail: EmailDefinition<ConferenceRegistrationReminderData> =
  {
    namespace: "features.registration.conference-emails.reminder",
    theme: CONFERENCE_EMAIL_THEME,
    getPixelUrl: getConferenceRegistrationReminderPixelUrl,
    children: (t, data) => (
      <EmailDetailsCard
        theme={CONFERENCE_EMAIL_THEME}
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

type PreviewProps = ConferenceRegistrationReminderData & {
  locale: Locale;
  name: string;
  eventUrl: string;
};

/** Rendered by `pnpm dev:email`. Production sends go through the task. */
export const ConferenceRegistrationReminderEmail = async ({
  locale,
  name,
  eventUrl,
  ...data
}: PreviewProps) =>
  (
    await buildTransactionalEmail({
      definition: conferenceRegistrationReminderEmail,
      locale,
      name,
      ctaHref: eventUrl,
      data,
    })
  ).element;

ConferenceRegistrationReminderEmail.PreviewProps = {
  locale: "en",
  name: "Ana",
  eventTitle: "WiDS Conference Guayaquil 2026",
  eventDateTimeText: "May 12, 2026, 09:00",
  eventLocation: "ESPOL, Guayaquil",
  eventUrl: "https://wids.taws.espol.edu.ec/en/conference",
} satisfies PreviewProps;

export default ConferenceRegistrationReminderEmail;
