import { getDatathonRegistrationReminderPixelUrl } from "@/shared/lib/umami/umami-email-pixels";
import type { Locale } from "@/shared/lib/next-intl/types";

import { EmailDetailsCard } from "./email-details-card";
import {
  buildTransactionalEmail,
  type EmailDefinition,
} from "./render-transactional-email";

export type DatathonRegistrationReminderData = {
  teamName: string;
  eventTitle: string;
  eventDateTimeText: string;
  eventLocation: string;
};

export const datathonRegistrationReminderEmail: EmailDefinition<DatathonRegistrationReminderData> =
  {
    namespace: "features.registration.datathon-emails.reminder",
    program: "datathon",
    getPixelUrl: getDatathonRegistrationReminderPixelUrl,
    children: (t, data) => (
      <EmailDetailsCard
        program="datathon"
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

type PreviewProps = DatathonRegistrationReminderData & {
  locale: Locale;
  name: string;
  eventUrl: string;
};

/** Rendered by `pnpm dev:email`. Production sends go through the task. */
export const DatathonRegistrationReminderEmail = async ({
  locale,
  name,
  eventUrl,
  ...data
}: PreviewProps) =>
  (
    await buildTransactionalEmail({
      definition: datathonRegistrationReminderEmail,
      locale,
      name,
      ctaHref: eventUrl,
      data,
    })
  ).element;

DatathonRegistrationReminderEmail.PreviewProps = {
  locale: "es",
  name: "Ana",
  teamName: "Data Alchemists",
  eventTitle: "WiDS Datathon Guayaquil 2026",
  eventDateTimeText: "20 de mayo de 2026, 09:00",
  eventLocation: "ESPOL, Guayaquil",
  eventUrl: "https://wids.taws.espol.edu.ec/es/aprender/datathon",
} satisfies PreviewProps;

export default DatathonRegistrationReminderEmail;
