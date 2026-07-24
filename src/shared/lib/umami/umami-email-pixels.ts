import { isUmamiTrackingEnabled } from "./umami-domains";

const UMAMI_PIXEL_BASE_URL = "https://analytics.taws.espol.edu.ec/p";

const TRANSPARENT_PIXEL_URL =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

function getPixelUrl(id: string) {
  return isUmamiTrackingEnabled()
    ? `${UMAMI_PIXEL_BASE_URL}/${id}`
    : TRANSPARENT_PIXEL_URL;
}

export function getConferenceRegistrationConfirmationPixelUrl() {
  return getPixelUrl("s4vmt4BFG");
}

export function getConferenceRegistrationReminderPixelUrl() {
  return getPixelUrl("Euv3U53YE");
}

export function getDatathonRegistrationConfirmationPixelUrl() {
  return getPixelUrl("7Y6Unu0TK");
}

export function getDatathonRegistrationReminderPixelUrl() {
  return getPixelUrl("vxymZsi2k");
}

export function getConferenceAttendanceConfirmationPixelUrl() {
  return getPixelUrl("PkJ4rJLpZ");
}
