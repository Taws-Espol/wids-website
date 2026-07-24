import type { TaskConfig } from "payload";

import { LOCALES } from "@/shared/lib/next-intl/locales";
import type { Locale } from "@/shared/lib/next-intl/types";
import { CONFERENCE_ATTENDANCE_CONFIRMATION_TASK_SLUG } from "@/shared/lib/payload/constants/slugs";
import { conferenceAttendanceConfirmationEmail } from "@/shared/lib/react-email/conference-attendance-confirmation";
import { renderTransactionalEmail } from "@/shared/lib/react-email/render-transactional-email";
import { formatDateTimeText } from "@/shared/utils/format-datetime-text";
import { getAppUrl } from "@/shared/utils/get-app-url";
import { tryCatch } from "@/shared/utils/try-catch";

type ConferenceAttendanceConfirmationTaskInputOutput = {
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

export const conferenceAttendanceConfirmationTask: TaskConfig<ConferenceAttendanceConfirmationTaskInputOutput> =
  {
    slug: CONFERENCE_ATTENDANCE_CONFIRMATION_TASK_SLUG,
    // A transient SMTP hiccup shouldn't silently drop the email — retry a
    // few times with backoff before giving up. Neither of the other
    // conference email tasks has this; a bulk campaign is more likely to
    // hit rate limiting than a single transactional send is.
    retries: {
      attempts: 3,
      backoff: { type: "exponential", delay: 60_000 },
    },
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

      // Send-idempotency: if this registration was already emailed (e.g.
      // the queueing script ran twice) or has already confirmed/declined
      // between queue time and now, skip without treating it as a failure.
      if (
        registrationData.attendanceConfirmationEmailSentAt ||
        registrationData.attendanceConfirmed
      ) {
        return {
          state: "succeeded",
          output: { success: true },
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

      const confirmUrl = new URL("/api/attendance", getAppUrl().origin);
      confirmUrl.searchParams.set("t", registrationData.attendanceToken);
      confirmUrl.searchParams.set("utm_source", "email");
      confirmUrl.searchParams.set("utm_medium", "email");
      confirmUrl.searchParams.set("utm_campaign", "attendance-confirmation");

      const { subject, html } = await renderTransactionalEmail({
        definition: conferenceAttendanceConfirmationEmail,
        locale: input.locale,
        name: registrationData.firstName,
        ctaHref: confirmUrl.toString(),
        data: {
          eventTitle: eventData.title,
          eventDateTimeText: formatDateTimeText(eventData.date, input.locale),
          eventLocation: eventData.location,
        },
      });

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

      const { error: markSentError } = await tryCatch(
        req.payload.update({
          collection: "conference-registrations",
          id: input.registrationId,
          data: {
            attendanceConfirmationEmailSentAt: new Date().toISOString(),
          },
        }),
      );

      if (markSentError) {
        // The email did go out; failing to record that shouldn't fail the
        // job (it would just get re-sent on a future queue run). Log and
        // move on.
        req.payload.logger.error({
          message:
            "Sent attendance confirmation email but failed to record attendanceConfirmationEmailSentAt.",
          error: markSentError,
        });
      }

      return {
        state: "succeeded",
        output: {
          success: true,
        },
      };
    },
  };
