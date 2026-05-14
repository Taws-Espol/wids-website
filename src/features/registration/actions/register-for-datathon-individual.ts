"use server";

import config from "@payload-config";
import { getPayload, ValidationError } from "payload";

import type { ActionResponse } from "@/shared/types/action";
import {
  DATATHON_REGISTRATION_ERROR_CODES,
  type DatathonRegistrationErrorCode,
} from "@/shared/constants/datathon-registration-error-codes";
import type { Locale } from "@/shared/lib/next-intl/types";
import { tryCatch } from "@/shared/utils/try-catch";

import { datathonRegistrationIndividualSchema } from "@/features/registration/schemas/datathon-registration-individuals";
import { DatathonRegistrationIndividualValues } from "@/features/registration/types/datathon-registration-individuals";

type PayloadValidationIssue = {
  message?: string;
  path?: string;
};

function isPayloadUniqueMessage(message: string): boolean {
  return message === "Value must be unique";
}

function normalizePayloadPath(path: string): string {
  return path.replaceAll("[", ".").replaceAll("]", "");
}

function mapDatathonPayloadValidationError(
  payloadValidationError: ValidationError,
): DatathonRegistrationErrorCode {
  const issues = (payloadValidationError.data?.errors ?? []) as
    | PayloadValidationIssue[]
    | undefined;

  if (!issues || issues.length === 0) {
    return DATATHON_REGISTRATION_ERROR_CODES.PAYLOAD_VALIDATION;
  }

  for (const issue of issues) {
    const message = issue.message ?? "";
    const normalizedPath = normalizePayloadPath(issue.path ?? "");
    if (message === DATATHON_REGISTRATION_ERROR_CODES.UNIQUE_EMAIL) {
      return DATATHON_REGISTRATION_ERROR_CODES.UNIQUE_EMAIL;
    }

    if (message === DATATHON_REGISTRATION_ERROR_CODES.UNIQUE_PHONE_NUMBER) {
      return DATATHON_REGISTRATION_ERROR_CODES.UNIQUE_PHONE_NUMBER;
    }

    if (message === DATATHON_REGISTRATION_ERROR_CODES.UNIQUE_TEAM_NAME) {
      return DATATHON_REGISTRATION_ERROR_CODES.UNIQUE_TEAM_NAME;
    }

    if (!isPayloadUniqueMessage(message)) continue;

    if (/^members(\.\d+)?\.email$/.test(normalizedPath)) {
      return DATATHON_REGISTRATION_ERROR_CODES.UNIQUE_EMAIL;
    }

    if (/^members(\.\d+)?\.phoneNumber$/.test(normalizedPath)) {
      return DATATHON_REGISTRATION_ERROR_CODES.UNIQUE_PHONE_NUMBER;
    }
  }

  return DATATHON_REGISTRATION_ERROR_CODES.PAYLOAD_VALIDATION;
}

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
      const errorCode = mapDatathonPayloadValidationError(
        createRegistrationError,
      );

      return {
        data: null,
        error: {
          code: errorCode,
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
