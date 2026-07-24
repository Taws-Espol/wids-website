"use server";

import config from "@payload-config";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { getPayload } from "payload";

import { ATTENDANCE_TOKEN_COOKIE_NAME } from "@/shared/constants/attendance";
import {
  CONFERENCE_ATTENDANCE_ERROR_CODES,
  type ConferenceAttendanceErrorCode,
} from "@/shared/constants/conference-attendance-error-codes";
import { routing } from "@/shared/lib/next-intl/routing";
import type { Locale } from "@/shared/lib/next-intl/types";
import type { ActionResponse } from "@/shared/types/action";
import { tryCatch } from "@/shared/utils/try-catch";

import { getConferenceRegistrationByAttendanceToken } from "@/features/registration/queries/get-conference-registration-by-attendance-token";

export async function setConferenceAttendanceAction(
  confirmed: boolean,
  locale: Locale,
): Promise<ActionResponse<null, ConferenceAttendanceErrorCode>> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ATTENDANCE_TOKEN_COOKIE_NAME)?.value;

  if (!token) {
    return {
      data: null,
      error: {
        code: CONFERENCE_ATTENDANCE_ERROR_CODES.TOKEN_MISSING,
        message: "Attendance action called without a token cookie.",
      },
    };
  }

  const payload = await getPayload({ config });

  const { data: registration, error: findError } = await tryCatch(
    getConferenceRegistrationByAttendanceToken(token),
  );

  if (findError) {
    payload.logger.error({
      message:
        "Unexpected error while finding registration by attendance token.",
      error: findError,
    });

    return {
      data: null,
      error: {
        code: CONFERENCE_ATTENDANCE_ERROR_CODES.UNKNOWN,
        message:
          "Unexpected error while finding registration by attendance token.",
      },
    };
  }

  if (!registration) {
    return {
      data: null,
      error: {
        code: CONFERENCE_ATTENDANCE_ERROR_CODES.TOKEN_INVALID,
        message: "No registration found for the given attendance token.",
      },
    };
  }

  const event =
    typeof registration.event === "object" ? registration.event : null;

  if (event && new Date(event.date).getTime() < Date.now()) {
    return {
      data: null,
      error: {
        code: CONFERENCE_ATTENDANCE_ERROR_CODES.EVENT_PASSED,
        message: "Cannot change attendance after the event has passed.",
      },
    };
  }

  const attendancePath = `/${locale}${routing.pathnames["/conference/attendance"][locale]}`;

  if (registration.attendanceConfirmed === confirmed) {
    return { data: null, error: null };
  }

  const { error: updateError } = await tryCatch(
    payload.update({
      collection: "conference-registrations",
      id: registration.id,
      data: {
        attendanceConfirmed: confirmed,
        attendanceConfirmedAt: new Date().toISOString(),
      },
    }),
  );

  if (updateError) {
    payload.logger.error({
      message: "Unexpected error while updating conference attendance.",
      error: updateError,
    });

    return {
      data: null,
      error: {
        code: CONFERENCE_ATTENDANCE_ERROR_CODES.UNKNOWN,
        message: "Unexpected error while updating conference attendance.",
      },
    };
  }

  revalidatePath(attendancePath);

  return { data: null, error: null };
}
