import { describe, expect, it } from "vitest";

import { mapConferenceRegistrationError } from "@/features/registration/utils/map-conference-registration-error";
import {
  CONFERENCE_REGISTRATION_ERROR_CODES,
  type ConferenceRegistrationErrorCode,
} from "@/shared/constants/conference-registration-error-codes";

const ALL_CODES = Object.values(
  CONFERENCE_REGISTRATION_ERROR_CODES,
) as ConferenceRegistrationErrorCode[];

describe("mapConferenceRegistrationError", () => {
  // #148: these two reached the user as the generic "unknown" message, because
  // the hook's switch had no case for them.
  it("places a student field error on the fields left empty", () => {
    expect(
      mapConferenceRegistrationError("STUDENT_FIELD_REQUIRED", {
        universityName: "",
        major: "Data Science",
      }),
    ).toEqual([
      { field: "universityName", message: "validation.student-field-required" },
    ]);
  });

  it("places a professional field error on the fields left empty", () => {
    expect(
      mapConferenceRegistrationError("PROFESSIONAL_FIELD_REQUIRED", {
        organizationName: "ESPOL",
        jobTitle: "",
      }),
    ).toEqual([
      { field: "jobTitle", message: "validation.professional-field-required" },
    ]);
  });

  it("flags every branch field when the client cannot tell which one failed", () => {
    expect(
      mapConferenceRegistrationError("STUDENT_FIELD_REQUIRED", {
        universityName: "ESPOL",
        major: "Data Science",
      }).map(({ field }) => field),
    ).toEqual(["universityName", "major"]);
  });

  it.each([
    ["UNIQUE_EMAIL", "email"],
    ["EMAIL_REQUIRED", "email"],
    ["INVALID_EMAIL", "email"],
    ["UNIQUE_PHONE_NUMBER", "phoneNumber"],
    ["PHONE_REQUIRED", "phoneNumber"],
    ["INVALID_PHONE_NUMBER", "phoneNumber"],
    ["ACCEPTED_TERMS_REQUIRED", "acceptedTerms"],
  ] as Array<[ConferenceRegistrationErrorCode, string]>)(
    "%s targets the %s field",
    (code, field) => {
      expect(mapConferenceRegistrationError(code, {})).toEqual([
        { field, message: expect.any(String) },
      ]);
    },
  );

  it.each([
    "SCHEMA_VALIDATION",
    "PAYLOAD_VALIDATION",
    "UNKNOWN",
    "REQUIRED",
  ] as ConferenceRegistrationErrorCode[])(
    "%s falls back to the banner, having no field to point at",
    (code) => {
      expect(mapConferenceRegistrationError(code, {})[0].field).toBe(
        "root.serverError",
      );
    },
  );

  // Guards the whole point of #148: a code that nothing handles must not
  // silently degrade to the generic message.
  it("handles every declared error code", () => {
    for (const code of ALL_CODES) {
      const result = mapConferenceRegistrationError(code, {});

      expect(result.length).toBeGreaterThan(0);
      expect(result[0].message).toEqual(expect.any(String));
    }
  });

  it("throws rather than degrading when given an unknown code", () => {
    expect(() =>
      mapConferenceRegistrationError(
        "NOT_A_REAL_CODE" as ConferenceRegistrationErrorCode,
        {},
      ),
    ).toThrow(/Unhandled conference registration error/);
  });
});
