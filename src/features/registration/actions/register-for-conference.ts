"use server";

import config from "@payload-config";
import { getPayload, ValidationError } from "payload";

import type { ActionResponse } from "@/shared/types/action";
import {
  CONFERENCE_REGISTRATION_ERROR_CODES,
  isConferenceRegistrationErrorCode,
  type ConferenceRegistrationErrorCode,
} from "@/shared/constants/conference-registration-error-codes";
import type { Locale } from "@/shared/lib/next-intl/types";
import { generateAttendanceToken } from "@/shared/lib/payload/utils/generate-attendance-token";
import { tryCatch } from "@/shared/utils/try-catch";

import { conferenceRegistrationSchema } from "@/features/registration/schemas/conference-registration";
import type { ConferenceRegistrationValues } from "@/features/registration/types/conference-registration";

export async function registerForConferenceAction(
  eventId: number,
  locale: Locale,
  values: ConferenceRegistrationValues,
): Promise<ActionResponse<null, ConferenceRegistrationErrorCode>> {
  // Schema validation

  const validatedValues = conferenceRegistrationSchema.safeParse(values);

  if (!validatedValues.success) {
    return {
      data: null,
      error: {
        code: CONFERENCE_REGISTRATION_ERROR_CODES.SCHEMA_VALIDATION,
        message: "Conference registration schema validation failed.",
      },
    };
  }

  // Create registration record

  const payload = await getPayload({ config });

  const { error: createRegistrationError } = await tryCatch(
    payload.create({
      collection: "conference-registrations",
      context: { conferenceRegistrationLocale: locale },
      data: {
        event: eventId,
        ...validatedValues.data,
        attendanceConfirmed: false,
        attendanceToken: generateAttendanceToken(),
      },
    }),
  );

  if (createRegistrationError) {
    if (createRegistrationError instanceof ValidationError) {
      // Payload's message is an arbitrary string: our validators return codes,
      // but Payload generates its own messages too. Narrow rather than assert,
      // so anything unrecognised becomes PAYLOAD_VALIDATION instead of flowing
      // on as a code the client has no case for.
      const rawMessage = createRegistrationError.data.errors[0]?.message;
      const errorCode = isConferenceRegistrationErrorCode(rawMessage)
        ? rawMessage
        : CONFERENCE_REGISTRATION_ERROR_CODES.PAYLOAD_VALIDATION;

      return {
        data: null,
        error: {
          code: errorCode,
          message:
            "Validation error while creating registration for conference.",
        },
      };
    }

    payload.logger.error({
      message: "Unexpected error while creating registration for conference.",
      error: createRegistrationError,
    });

    return {
      data: null,
      error: {
        code: CONFERENCE_REGISTRATION_ERROR_CODES.UNKNOWN,
        message: "Unexpected error while creating registration for conference.",
      },
    };
  }

  return {
    data: null,
    error: null,
  };
}
