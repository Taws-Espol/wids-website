import { getDatathonRegistrationConfirmationPixelUrl } from "@/shared/lib/umami/umami-email-pixels";
import type { Locale } from "@/shared/lib/next-intl/types";

import { EmailDetailsCard } from "./email-details-card";
import { DATATHON_EMAIL_THEME } from "./email-theme";
import {
  buildTransactionalEmail,
  type EmailDefinition,
} from "./render-transactional-email";

export type DatathonRegistrationConfirmationData = {
  teamName: string;
  eventTitle: string;
  eventDateTimeText: string;
  eventLocation: string;
};

export const datathonRegistrationConfirmationEmail: EmailDefinition<DatathonRegistrationConfirmationData> =
  {
    namespace: "features.registration.datathon-emails.confirmation",
    theme: DATATHON_EMAIL_THEME,
    getPixelUrl: getDatathonRegistrationConfirmationPixelUrl,
    children: (t, data) => (
      <EmailDetailsCard
        theme={DATATHON_EMAIL_THEME}
        title={data.eventTitle}
        rows={[
          <>
            {t("team-name-label")} {data.teamName}
          </>,
          <>
            {t("event-date-label")} {data.eventDateTimeText}
            <br />
            {t("event-location-label")} {data.eventLocation}
          </>,
        ]}
      />
    ),
  };

type PreviewProps = DatathonRegistrationConfirmationData & {
  locale: Locale;
  name: string;
  eventUrl: string;
};

/** Rendered by `pnpm dev:email`. Production sends go through the task. */
export const DatathonRegistrationConfirmationEmail = async ({
  locale,
  name,
  eventUrl,
  ...data
}: PreviewProps) =>
  (
    await buildTransactionalEmail({
      definition: datathonRegistrationConfirmationEmail,
      locale,
      name,
      ctaHref: eventUrl,
      data,
    })
  ).element;

DatathonRegistrationConfirmationEmail.PreviewProps = {
  locale: "en",
  name: "Ana",
  teamName: "Data Alchemists",
  eventTitle: "WiDS Datathon Guayaquil 2026",
  eventDateTimeText: "May 20, 2026, 09:00",
  eventLocation: "ESPOL, Guayaquil",
  eventUrl: "https://wids.taws.espol.edu.ec/en/learn/datathon",
} satisfies PreviewProps;

export default DatathonRegistrationConfirmationEmail;
