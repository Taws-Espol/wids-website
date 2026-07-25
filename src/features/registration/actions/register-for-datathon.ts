"use server";

import config from "@payload-config";
import { getPayload, ValidationError } from "payload";

import type { ActionResponse } from "@/shared/types/action";
import {
  DATATHON_REGISTRATION_ERROR_CODES,
  isDatathonRegistrationErrorCode,
  type DatathonRegistrationErrorCode,
} from "@/shared/constants/datathon-registration-error-codes";
import type { Locale } from "@/shared/lib/next-intl/types";
import { tryCatch } from "@/shared/utils/try-catch";

import { datathonRegistrationSchema } from "@/features/registration/schemas/datathon-registration";
import type { DatathonRegistrationValues } from "@/features/registration/types/datathon-registration";

export async function registerForDatathonAction(
  eventId: number,
  locale: Locale,
  values: DatathonRegistrationValues,
): Promise<ActionResponse<null, DatathonRegistrationErrorCode>> {
  // Schema validation

  const validatedValues = datathonRegistrationSchema.safeParse(values);

  if (!validatedValues.success) {
    return {
      data: null,
      error: {
        code: DATATHON_REGISTRATION_ERROR_CODES.SCHEMA_VALIDATION,
        message: "Datathon registration schema validation failed.",
      },
    };
  }

  // Create registration record

  const payload = await getPayload({ config });

  const { error: createRegistrationError } = await tryCatch(
    payload.create({
      collection: "datathon-registrations",
      context: { datathonRegistrationLocale: locale },
      data: {
        event: eventId,
        ...validatedValues.data,
      },
    }),
  );

  if (createRegistrationError) {
    if (createRegistrationError instanceof ValidationError) {
      // Narrow rather than assert: Payload generates its own messages too,
      // and an unrecognised one must not flow on as a code.
      const rawMessage = createRegistrationError.data.errors[0]?.message;

      return {
        data: null,
        error: {
          code: isDatathonRegistrationErrorCode(rawMessage)
            ? rawMessage
            : DATATHON_REGISTRATION_ERROR_CODES.PAYLOAD_VALIDATION,
          message: "Validation error while creating registration for Datathon.",
        },
      };
    }

    payload.logger.error({
      message: "Unexpected error while creating registration for Datathon.",
      error: createRegistrationError,
    });

    return {
      data: null,
      error: {
        code: DATATHON_REGISTRATION_ERROR_CODES.UNKNOWN,
        message: "Unexpected error while creating registration for Datathon.",
      },
    };
  }

  return {
    data: null,
    error: null,
  };
}
