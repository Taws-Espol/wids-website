import { getAppUrl } from "@/shared/utils/get-app-url";

export const UMAMI_TRACKED_HOSTNAMES = [
  "wids.espol.edu.ec",
  "www.wids.espol.edu.ec",
];

export const UMAMI_TRACKED_DOMAINS = UMAMI_TRACKED_HOSTNAMES.join(",");

export function isUmamiTrackingEnabled() {
  return UMAMI_TRACKED_HOSTNAMES.includes(getAppUrl().hostname);
}
