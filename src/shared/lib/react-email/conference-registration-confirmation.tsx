import { getConferenceRegistrationConfirmationPixelUrl } from "@/shared/lib/umami/umami-email-pixels";
import type { Locale } from "@/shared/lib/next-intl/types";

import { EmailDetailsCard } from "./email-details-card";
import {
  buildTransactionalEmail,
  type EmailDefinition,
} from "./render-transactional-email";

export type ConferenceRegistrationConfirmationData = {
  eventTitle: string;
  eventDateTimeText: string;
  eventLocation: string;
};

export const conferenceRegistrationConfirmationEmail: EmailDefinition<ConferenceRegistrationConfirmationData> =
  {
    namespace: "features.registration.conference-emails.confirmation",
    program: "conference",
    getPixelUrl: getConferenceRegistrationConfirmationPixelUrl,
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

type PreviewProps = ConferenceRegistrationConfirmationData & {
  locale: Locale;
  name: string;
  eventUrl: string;
};

/** Rendered by `pnpm dev:email`. Production sends go through the task. */
export const ConferenceRegistrationConfirmationEmail = async ({
  locale,
  name,
  eventUrl,
  ...data
}: PreviewProps) =>
  (
    await buildTransactionalEmail({
      definition: conferenceRegistrationConfirmationEmail,
      locale,
      name,
      ctaHref: eventUrl,
      data,
    })
  ).element;

ConferenceRegistrationConfirmationEmail.PreviewProps = {
  locale: "es",
  name: "Ana",
  eventTitle: "WiDS Conference Guayaquil 2026",
  eventDateTimeText: "12 de mayo de 2026, 09:00",
  eventLocation: "ESPOL, Guayaquil",
  eventUrl: "https://wids.taws.espol.edu.ec/es/conferencia",
} satisfies PreviewProps;

export default ConferenceRegistrationConfirmationEmail;
