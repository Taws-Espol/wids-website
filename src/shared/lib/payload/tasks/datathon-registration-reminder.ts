import { render } from "react-email";
import type { TaskConfig } from "payload";

import type { Locale } from "@/shared/lib/next-intl/types";
import { LOCALES } from "@/shared/lib/next-intl/locales";
import { DATATHON_REGISTRATION_REMINDER_TASK_SLUG } from "@/shared/lib/payload/constants/slugs";
import { DatathonRegistrationReminderEmail } from "@/shared/lib/react-email/datathon-registration-reminder";
import { getAppUrl } from "@/shared/utils/get-app-url";
import { getEmailSubject } from "@/shared/utils/get-email-subject";
import { formatDateTimeText } from "@/shared/utils/format-datetime-text";
import { tryCatch } from "@/shared/utils/try-catch";

type DatathonRegistrationReminderTaskInputOutput = {
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

type DatathonMember = {
  isLeader?: boolean | null;
  email: string;
  firstName: string;
};

export const datathonRegistrationReminderTask: TaskConfig<DatathonRegistrationReminderTaskInputOutput> =
  {
    slug: DATATHON_REGISTRATION_REMINDER_TASK_SLUG,
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
      const taskContext = {
        eventId: input.eventId,
        locale: input.locale,
        registrationId: input.registrationId,
        task: DATATHON_REGISTRATION_REMINDER_TASK_SLUG,
      };

      const { data: registrationData, error: registrationError } =
        await tryCatch(
          req.payload.findByID({
            collection: "datathon-registrations",
            id: input.registrationId,
            depth: 0,
            locale: input.locale,
          }),
        );

      if (registrationError) {
        req.payload.logger.error({
          ...taskContext,
          error: registrationError,
          message: "Datathon reminder task failed while loading registration.",
        });

        return {
          state: "failed",
          output: {
            success: false,
            message: "Unexpected error while finding Datathon registration.",
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
        req.payload.logger.error({
          ...taskContext,
          error: eventError,
          message: "Datathon reminder task failed while loading event.",
        });

        return {
          state: "failed",
          output: {
            success: false,
            message: "Unexpected error while finding event.",
          },
        };
      }

      const members = registrationData.members as DatathonMember[];
      const leader =
        members.find((member) => member.isLeader === true) ?? members[0];

      if (!leader?.email) {
        req.payload.logger.error({
          ...taskContext,
          message:
            "Datathon reminder task failed because no team leader email was found.",
          teamName: registrationData.teamName,
        });

        return {
          state: "failed",
          output: {
            success: false,
            message:
              "No team leader email was found for Datathon registration.",
          },
        };
      }

      const eventUrl = new URL(
        "/learn/datathon",
        getAppUrl().origin,
      ).toString();

      const { data: html, error: renderEmailError } = await tryCatch(
        render(
          DatathonRegistrationReminderEmail({
            locale: input.locale,
            name: leader.firstName,
            teamName: registrationData.teamName,
            eventTitle: eventData.title,
            eventDateTimeText: formatDateTimeText(eventData.date, input.locale),
            eventLocation: eventData.location,
            eventUrl,
          }),
        ),
      );

      if (renderEmailError) {
        req.payload.logger.error({
          ...taskContext,
          error: renderEmailError,
          message: "Datathon reminder task failed while rendering email.",
        });

        return {
          state: "failed",
          output: {
            success: false,
            message: "Unexpected error while rendering email.",
          },
        };
      }

      const { data: subject, error: subjectError } = await tryCatch(
        getEmailSubject(
          input.locale,
          "features.registration.datathon-emails.reminder",
        ),
      );

      if (subjectError) {
        req.payload.logger.error({
          ...taskContext,
          error: subjectError,
          message:
            "Datathon reminder task failed while generating email subject.",
        });

        return {
          state: "failed",
          output: {
            success: false,
            message: "Unexpected error while generating email subject.",
          },
        };
      }

      const { error: sendEmailError } = await tryCatch(
        req.payload.sendEmail({
          to: leader.email,
          subject,
          html,
        }),
      );

      if (sendEmailError) {
        req.payload.logger.error({
          ...taskContext,
          error: sendEmailError,
          message: "Datathon reminder task failed while sending email.",
          to: leader.email,
        });

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
