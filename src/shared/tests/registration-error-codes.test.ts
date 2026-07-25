import { describe, expect, it } from "vitest";

import {
  CONFERENCE_REGISTRATION_ERROR_CODES,
  isConferenceRegistrationErrorCode,
} from "@/shared/constants/conference-registration-error-codes";
import {
  DATATHON_REGISTRATION_ERROR_CODES,
  isDatathonRegistrationErrorCode,
} from "@/shared/constants/datathon-registration-error-codes";

/**
 * #151: the actions used to assert Payload's error message was a code. These
 * guards are what replaced the cast, so they need to actually reject the
 * messages Payload generates on its own.
 */
describe.each([
  [
    "conference",
    CONFERENCE_REGISTRATION_ERROR_CODES,
    isConferenceRegistrationErrorCode,
  ],
  [
    "datathon",
    DATATHON_REGISTRATION_ERROR_CODES,
    isDatathonRegistrationErrorCode,
  ],
] as const)("%s error codes", (_label, codes, isErrorCode) => {
  it("accepts every declared code", () => {
    for (const code of Object.values(codes)) {
      expect(isErrorCode(code)).toBe(true);
    }
  });

  it.each([
    "The following field is invalid: email",
    "ValidationError",
    "",
    "unique_email",
    "SOME_CODE_WE_DO_NOT_DECLARE",
  ])("rejects %o, which Payload could produce", (message) => {
    expect(isErrorCode(message)).toBe(false);
  });
});
