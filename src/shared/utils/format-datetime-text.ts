import type { Locale } from "@/shared/lib/next-intl/types";

export function formatDateTimeText(date: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "America/Guayaquil",
  }).format(new Date(date));
}
