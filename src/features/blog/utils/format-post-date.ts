import { SITE_TIME_ZONE } from "@/shared/constants/time-zone";
import type { Locale } from "@/shared/lib/next-intl/types";

/**
 * Renders a post's publish date in the reader's language, in the site's zone.
 * Formatting in UTC pushed evening posts to the next day.
 */
export function formatPostDate(value: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: SITE_TIME_ZONE,
  }).format(new Date(value));
}
