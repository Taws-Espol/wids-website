import { APP_NAME } from "@/shared/constants/app";
import type { Event } from "@/shared/lib/payload/types/payload";
import { getAppUrl } from "@/shared/utils/get-app-url";

const MILLISECONDS_PER_UNIT: Record<Event["durationUnit"], number> = {
  minutes: 60_000,
  hours: 3_600_000,
  days: 86_400_000,
};

/**
 * Derives the end of an event from its start plus the CMS duration.
 *
 * Exported for the tests: an off-by-one unit here is invisible on the page but
 * wrong in every search result that shows the event's time.
 */
export function getEventEndDate(event: Event): string {
  const start = new Date(event.date);
  const end = new Date(
    start.getTime() +
      event.duration * MILLISECONDS_PER_UNIT[event.durationUnit],
  );

  return end.toISOString();
}

/**
 * Maps a CMS event onto schema.org's `Event`.
 *
 * Everything comes from data the page has already loaded; nothing extra is
 * fetched. Optional fields are omitted rather than emitted empty, since a
 * `location` with no name is worse than no `location` at all.
 */
export function getEventJsonLd(event: Event) {
  const appUrl = getAppUrl();

  const offers = event.registrationStart
    ? {
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          price: 0,
          priceCurrency: "USD",
          validFrom: new Date(event.registrationStart).toISOString(),
          ...(event.registrationEnd
            ? { validThrough: new Date(event.registrationEnd).toISOString() }
            : {}),
        },
      }
    : {};

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: new Date(event.date).toISOString(),
    endDate: getEventEndDate(event),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: event.location,
      ...(event.locationUrl ? { url: event.locationUrl } : {}),
    },
    organizer: {
      "@type": "Organization",
      name: APP_NAME,
      url: appUrl.toString(),
    },
    ...offers,
  };
}
