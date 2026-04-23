"use server";

import "server-only";

import config from "@payload-config";
import { getPayload, ValidationError } from "payload";
import type { RequiredDataFromCollectionSlug } from "payload";
import type { ActionResponse } from "@/shared/types/action";
import {
  CONFERENCE_REGISTRATION_CONFIRMATION_TASK_SLUG,
  CONFERENCE_REGISTRATION_REMINDER_TASK_SLUG,
} from "@/shared/lib/payload/jobs/conference-registration-tasks";
import { LOCALES } from "@/shared/constants/i18n";
import type { Locale } from "@/shared/lib/next-intl/types";

import { parseConferenceRegistrationFormData } from "../schemas/conference";
import { CONFERENCE_REGISTRATION_ERROR_KEYS } from "../constants/conference-registration";
import type { ConferenceRegistrationActionData } from "../types/conference-registration-action";

const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

type QueueConferenceRegistrationJobArgs = {
  input: {
    "registration-id": number;
    "event-id": number;
    locale: Locale;
  };
  queue: "batch" | "default";
  task: string;
  waitUntil?: Date;
};

function resolveQueueLocale(localeValue: FormDataEntryValue | null): Locale {
  if (
    typeof localeValue === "string" &&
    LOCALES.includes(localeValue as Locale)
  ) {
    return localeValue as Locale;
  }

  return "es";
}

export async function registerConferenceAction(
  eventId: number,
  _previousState: ActionResponse<ConferenceRegistrationActionData>,
  formData: FormData,
): Promise<ActionResponse<ConferenceRegistrationActionData>> {
  const locale = resolveQueueLocale(formData.get("locale"));
  const validatedFields = parseConferenceRegistrationFormData(formData);

  if (!validatedFields.success) {
    const flattenedErrors = validatedFields.error.flatten().fieldErrors;
    const fields = Object.keys(flattenedErrors);

    return {
      error: {
        errorKeys: [CONFERENCE_REGISTRATION_ERROR_KEYS.schemaValidation],
        fields,
        message: "Conference registration schema validation failed.",
      },
    };
  }

  const payload = await getPayload({ config });
  const payloadData: RequiredDataFromCollectionSlug<"conference-registrations"> =
    {
      event: eventId,
      ...validatedFields.data,
    };
  const queueConferenceRegistrationJob = payload.jobs.queue as (
    args: QueueConferenceRegistrationJobArgs,
  ) => Promise<unknown>;

  try {
    const registration = await payload.create({
      collection: "conference-registrations",
      data: payloadData,
    });

    await queueConferenceRegistrationJob({
      task: CONFERENCE_REGISTRATION_CONFIRMATION_TASK_SLUG,
      input: {
        "registration-id": registration.id,
        "event-id": eventId,
        locale,
      },
      queue: "default",
    });

    const event = await payload.findByID({
      collection: "events",
      id: eventId,
      depth: 0,
    });

    const eventDate = new Date(event.date);
    const reminderDate = new Date(
      eventDate.getTime() - ONE_DAY_IN_MILLISECONDS,
    );

    if (reminderDate.getTime() > Date.now()) {
      await queueConferenceRegistrationJob({
        task: CONFERENCE_REGISTRATION_REMINDER_TASK_SLUG,
        input: {
          "registration-id": registration.id,
          "event-id": eventId,
          locale,
        },
        waitUntil: reminderDate,
        queue: "batch",
      });
    }

    return {
      data: {
        registrationId: registration.id,
      },
    };
  } catch (error) {
    if (error instanceof ValidationError) {
      const fields = Array.from(
        new Set(
          (error.data?.errors ?? [])
            .map((issue) => issue.path?.split(".")[0])
            .filter((field): field is string => Boolean(field)),
        ),
      );

      return {
        error: {
          errorKeys: [CONFERENCE_REGISTRATION_ERROR_KEYS.payloadValidation],
          fields,
          message:
            "Payload validation failed while creating conference registration.",
        },
      };
    }

    return {
      error: {
        errorKeys: [CONFERENCE_REGISTRATION_ERROR_KEYS.unknown],
        message: "Unexpected error while creating conference registration.",
      },
    };
  }
}
