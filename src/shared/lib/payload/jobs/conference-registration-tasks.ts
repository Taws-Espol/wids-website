import { createTranslator } from "next-intl";
import { render } from "react-email";
import type { TaskConfig } from "payload";
import { LOCALES } from "@/shared/constants/i18n";
import type { Locale } from "@/shared/lib/next-intl/types";
import { routing } from "@/shared/lib/next-intl/routing";
import { getAppUrl } from "@/shared/utils/get-app-url";
import { ConferenceRegistrationConfirmationEmail } from "@/shared/lib/react-email/conference-registration-confirmation";
import { ConferenceRegistrationReminderEmail } from "@/shared/lib/react-email/conference-registration-reminder";

export const CONFERENCE_REGISTRATION_CONFIRMATION_TASK_SLUG =
  "conference-registration-confirmation" as const;

export const CONFERENCE_REGISTRATION_REMINDER_TASK_SLUG =
  "conference-registration-reminder" as const;

type ConferenceRegistrationTaskInputOutput = {
  input: {
    "registration-id": number;
    "event-id": number;
    locale: Locale;
  };
  output: {
    success: boolean;
  };
};

const EVENT_DATE_TIME_FORMATTER_OPTIONS = {
  dateStyle: "long",
  timeStyle: "short",
  timeZone: "America/Guayaquil",
} as const;

function resolveLocale(locale: string): Locale {
  if (LOCALES.includes(locale as Locale)) {
    return locale as Locale;
  }

  return "es";
}

function resolveConferencePathname(locale: Locale): string {
  const conferencePathname = routing.pathnames["/conference"];

  if (typeof conferencePathname === "string") {
    return conferencePathname;
  }

  return (
    conferencePathname[locale] ?? conferencePathname[routing.defaultLocale]
  );
}

function formatEventDateTimeText(eventDate: string, locale: Locale): string {
  return new Intl.DateTimeFormat(
    locale,
    EVENT_DATE_TIME_FORMATTER_OPTIONS,
  ).format(new Date(eventDate));
}

type ConferenceEmailNamespace =
  | "features.registration.conference-emails.confirmation"
  | "features.registration.conference-emails.reminder";

async function getConferenceEmailSubject(
  locale: Locale,
  namespace: ConferenceEmailNamespace,
): Promise<string> {
  const messages = (await import(`../../../../../messages/${locale}.json`))
    .default;
  const t = createTranslator({
    locale,
    messages,
    namespace,
  });

  return t("subject");
}

async function getConferenceRegistrationConfirmationSubject(
  locale: Locale,
): Promise<string> {
  return getConferenceEmailSubject(
    locale,
    "features.registration.conference-emails.confirmation",
  );
}

async function getConferenceRegistrationReminderSubject(
  locale: Locale,
): Promise<string> {
  return getConferenceEmailSubject(
    locale,
    "features.registration.conference-emails.reminder",
  );
}

export const conferenceRegistrationConfirmationTask: TaskConfig<ConferenceRegistrationTaskInputOutput> =
  {
    slug: CONFERENCE_REGISTRATION_CONFIRMATION_TASK_SLUG,
    inputSchema: [
      {
        name: "registration-id",
        type: "number",
        required: true,
      },
      {
        name: "event-id",
        type: "number",
        required: true,
      },
      {
        name: "locale",
        type: "text",
        required: true,
      },
    ],
    handler: async ({ input, req }) => {
      const locale = resolveLocale(input.locale);
      const registration = await req.payload.findByID({
        collection: "conference-registrations",
        id: input["registration-id"],
        depth: 0,
      });

      const event = await req.payload.findByID({
        collection: "events",
        id: input["event-id"],
        depth: 0,
        locale,
      });

      if (!registration.email) {
        throw new Error(
          `Conference registration ${input["registration-id"]} has no email.`,
        );
      }

      const eventUrl = new URL(
        `/${locale}${resolveConferencePathname(locale)}`,
        getAppUrl().origin,
      ).toString();
      const subject =
        await getConferenceRegistrationConfirmationSubject(locale);
      const html = await render(
        await ConferenceRegistrationConfirmationEmail({
          locale,
          name: registration.firstName ?? "there",
          eventTitle: event.title ?? "WiDS Conference",
          eventDateTimeText: formatEventDateTimeText(event.date, locale),
          eventLocation: event.location ?? "",
          eventUrl,
        }),
      );

      await req.payload.sendEmail({
        to: registration.email,
        subject,
        html,
      });

      return {
        output: {
          success: true,
        },
      };
    },
  };

export const conferenceRegistrationReminderTask: TaskConfig<ConferenceRegistrationTaskInputOutput> =
  {
    slug: CONFERENCE_REGISTRATION_REMINDER_TASK_SLUG,
    inputSchema: [
      {
        name: "registration-id",
        type: "number",
        required: true,
      },
      {
        name: "event-id",
        type: "number",
        required: true,
      },
      {
        name: "locale",
        type: "text",
        required: true,
      },
    ],
    handler: async ({ input, req }) => {
      const locale = resolveLocale(input.locale);
      const registration = await req.payload.findByID({
        collection: "conference-registrations",
        id: input["registration-id"],
        depth: 0,
      });

      const event = await req.payload.findByID({
        collection: "events",
        id: input["event-id"],
        depth: 0,
        locale,
      });

      if (!registration.email) {
        throw new Error(
          `Conference registration ${input["registration-id"]} has no email.`,
        );
      }

      const eventUrl = new URL(
        `/${locale}${resolveConferencePathname(locale)}`,
        getAppUrl().origin,
      ).toString();
      const subject = await getConferenceRegistrationReminderSubject(locale);
      const html = await render(
        await ConferenceRegistrationReminderEmail({
          locale,
          name: registration.firstName ?? "there",
          eventTitle: event.title ?? "WiDS Conference",
          eventDateTimeText: formatEventDateTimeText(event.date, locale),
          eventLocation: event.location ?? "",
          eventUrl,
        }),
      );

      await req.payload.sendEmail({
        to: registration.email,
        subject,
        html,
      });

      return {
        output: {
          success: true,
        },
      };
    },
  };
