import { SITE_TIME_ZONE } from "@/shared/constants/time-zone";
import type { Locale } from "@/shared/lib/next-intl/types";

export function formatDateTimeText(date: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: SITE_TIME_ZONE,
  }).format(new Date(date));
}
