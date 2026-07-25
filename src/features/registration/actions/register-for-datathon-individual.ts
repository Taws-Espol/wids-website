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

import { datathonRegistrationIndividualSchema } from "@/features/registration/schemas/datathon-registration-individuals";
import { DatathonRegistrationIndividualValues } from "@/features/registration/types/datathon-registration-individuals";

export async function registerForDatathonIndividualAction(
  eventId: number,
  locale: Locale,
  values: DatathonRegistrationIndividualValues,
): Promise<ActionResponse<null, DatathonRegistrationErrorCode>> {
  // Schema validation

  const validatedValues =
    datathonRegistrationIndividualSchema.safeParse(values);

  if (!validatedValues.success) {
    return {
      data: null,
      error: {
        code: DATATHON_REGISTRATION_ERROR_CODES.SCHEMA_VALIDATION,
        message: "Datathon registration (individual) schema validation failed.",
      },
    };
  }

  // Create registration record

  const payload = await getPayload({ config });

  const { error: createRegistrationError } = await tryCatch(
    payload.create({
      collection: "datathon-registrations-individuals",
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
          message:
            "Validation error while creating registration for Datathon (individual).",
        },
      };
    }

    payload.logger.error({
      message:
        "Unexpected error while creating registration for Datathon (individual).",
      error: createRegistrationError,
    });

    return {
      data: null,
      error: {
        code: DATATHON_REGISTRATION_ERROR_CODES.UNKNOWN,
        message:
          "Unexpected error while creating registration for Datathon (individual).",
      },
    };
  }

  return {
    data: null,
    error: null,
  };
}
