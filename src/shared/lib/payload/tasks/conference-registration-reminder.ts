import { render } from "react-email";
import type { TaskConfig } from "payload";

import type { Locale } from "@/shared/lib/next-intl/types";
import { LOCALES } from "@/shared/lib/next-intl/locales";
import { CONFERENCE_REGISTRATION_REMINDER_TASK_SLUG } from "@/shared/lib/payload/constants/slugs";
import { ConferenceRegistrationReminderEmail } from "@/shared/lib/react-email/conference-registration-reminder";
import { getAppUrl } from "@/shared/utils/get-app-url";
import { getEmailSubject } from "@/shared/utils/get-email-subject";
import { formatDateTimeText } from "@/shared/utils/format-datetime-text";
import { tryCatch } from "@/shared/utils/try-catch";

type ConferenceRegistrationReminderTaskInputOutput = {
  input: {
    registrationId: number;
    eventId: number;
    locale: Locale;
  };
  output: {
    success: boolean;
    message?: string;
  };
};

export const conferenceRegistrationReminderTask: TaskConfig<ConferenceRegistrationReminderTaskInputOutput> =
  {
    slug: CONFERENCE_REGISTRATION_REMINDER_TASK_SLUG,
    inputSchema: [
      {
        name: "registrationId",
        type: "number",
        required: true,
      },
      {
        name: "eventId",
        type: "number",
        required: true,
      },
      {
        name: "locale",
        type: "select",
        options: LOCALES.map((locale) => ({
          label: locale,
          value: locale,
        })),
        required: true,
        defaultValue: "es",
      },
    ],
    handler: async ({ input, req }) => {
      const { data: registrationData, error: registrationError } =
        await tryCatch(
          req.payload.findByID({
            collection: "conference-registrations",
            id: input.registrationId,
            depth: 0,
            locale: input.locale,
          }),
        );

      if (registrationError) {
        return {
          state: "failed",
          output: {
            success: false,
            message: "Unexpected error while finding conference registration.",
          },
        };
      }

      const { data: eventData, error: eventError } = await tryCatch(
        req.payload.findByID({
          collection: "events",
          id: input.eventId,
          depth: 0,
          locale: input.locale,
        }),
      );

      if (eventError) {
        return {
          state: "failed",
          output: {
            success: false,
            message: "Unexpected error while finding event.",
          },
        };
      }

      const eventUrl = new URL("/conference", getAppUrl().origin).toString();

      const html = await render(
        ConferenceRegistrationReminderEmail({
          locale: input.locale,
          name: registrationData.firstName,
          eventTitle: eventData.title,
          eventDateTimeText: formatDateTimeText(eventData.date, input.locale),
          eventLocation: eventData.location,
          eventUrl,
        }),
      );

      const subject = await getEmailSubject(
        input.locale,
        "features.registration.conference-emails.reminder",
      );

      const { error: sendEmailError } = await tryCatch(
        req.payload.sendEmail({
          to: registrationData.email,
          subject,
          html,
        }),
      );

      if (sendEmailError) {
        return {
          state: "failed",
          output: {
            success: false,
            message: "Unexpected error while sending email.",
          },
        };
      }

      return {
        state: "succeeded",
        output: {
          success: true,
        },
      };
    },
  };
