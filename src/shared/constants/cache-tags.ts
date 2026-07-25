/**
 * One tag per content source. A query tags itself with everything it reads; a
 * collection revalidates only its own tag. That way editing a sponsor no longer
 * flushes the conference page.
 *
 * A query fetching with `depth: 1` populates uploads, so it must also tag
 * MEDIA_TAG — replacing an image changes that query's output without touching
 * the collection it queried.
 */
export const EDITIONS_TAG = "editions";
export const EVENTS_TAG = "events";
export const SPEAKERS_TAG = "speakers";
export const SCHEDULES_TAG = "schedules";
export const SPONSORS_TAG = "sponsors";
export const AMBASSADORS_TAG = "ambassadors";
export const MEDIA_TAG = "media";
export const TERMS_AND_CONDITIONS_TAG = "terms-and-conditions";
