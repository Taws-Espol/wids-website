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

import { datathonRegistrationSchema } from "@/features/registration/schemas/datathon-registration";

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

    if (normalizedPath === "teamName") {
      return DATATHON_REGISTRATION_ERROR_CODES.UNIQUE_TEAM_NAME;
    }

    if (/^members(\.\d+)?\.email$/.test(normalizedPath)) {
      return DATATHON_REGISTRATION_ERROR_CODES.UNIQUE_EMAIL;
    }

    if (/^members(\.\d+)?\.phoneNumber$/.test(normalizedPath)) {
      return DATATHON_REGISTRATION_ERROR_CODES.UNIQUE_PHONE_NUMBER;
    }
  }

  return DATATHON_REGISTRATION_ERROR_CODES.PAYLOAD_VALIDATION;
}

function getFormStringValue(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function getFormBooleanValue(formData: FormData, key: string): boolean {
  return getFormStringValue(formData, key) === "true";
}

function getFormMembersValue(formData: FormData): unknown[] {
  const value = formData.get("members");

  if (typeof value !== "string") {
    return [];
  }

  try {
    const parsed = JSON.parse(value) as unknown;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function registerForDatathonAction(
  eventId: number,
  locale: Locale,
  formData: FormData,
): Promise<ActionResponse<null, DatathonRegistrationErrorCode>> {
  const values = {
    teamName: getFormStringValue(formData, "teamName"),
    memberCount: Number(getFormStringValue(formData, "memberCount")),
    members: getFormMembersValue(formData),
    bankVoucher: formData.get("bankVoucher"),
    receiveNotifications: getFormBooleanValue(formData, "receiveNotifications"),
    acceptedTerms: getFormBooleanValue(formData, "acceptedTerms"),
    heardAboutEvent: getFormStringValue(formData, "heardAboutEvent"),
  };

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

  const { bankVoucher, ...registrationData } = validatedValues.data;

  const { data: createdVoucher, error: createVoucherError } = await tryCatch(
    payload.create({
      collection: "operations-media",
      overrideAccess: true,
      data: {
        alt: `Datathon bank voucher - ${registrationData.teamName}`,
      },
      file: {
        data: Buffer.from(await bankVoucher.arrayBuffer()),
        mimetype: bankVoucher.type,
        name: bankVoucher.name,
        size: bankVoucher.size,
      },
    }),
  );

  if (createVoucherError) {
    payload.logger.error({
      message:
        "Unexpected error while uploading bank voucher for Datathon registration.",
      error: createVoucherError,
      teamName: registrationData.teamName,
    });

    return {
      data: null,
      error: {
        code: DATATHON_REGISTRATION_ERROR_CODES.BANK_VOUCHER_UPLOAD_FAILED,
        message:
          "Unexpected error while uploading bank voucher for Datathon registration.",
      },
    };
  }

  const { error: createRegistrationError } = await tryCatch(
    payload.create({
      collection: "datathon-registrations",
      context: { datathonRegistrationLocale: locale },
      data: {
        event: eventId,
        ...registrationData,
        bankVoucher: createdVoucher.id,
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
