import "server-only";

import { cacheTag } from "next/cache";
import config from "@payload-config";
import { getPayload } from "payload";

import {
  AMBASSADORS_TAG,
  EDITIONS_TAG,
  EVENTS_TAG,
  MEDIA_TAG,
  SPONSORS_TAG,
} from "@/shared/constants/cache-tags";
import type { Locale } from "@/shared/lib/next-intl/types";

export async function getHomePageData(locale: Locale) {
  "use cache";
  cacheTag(AMBASSADORS_TAG, EDITIONS_TAG, EVENTS_TAG, MEDIA_TAG, SPONSORS_TAG);

  const payload = await getPayload({ config });

  // 1. Get the latest/current edition (by year, assuming descending sort)
  const editionsResult = await payload.find({
    collection: "editions",
    locale,
    depth: 0,
    limit: 1,
    sort: "-year",
  });
  const edition = editionsResult.docs?.[0];
  if (!edition) {
    return {
      edition: null,
      events: [],
      ambassadors: [],
      sponsors: [],
    };
  }

  const editionId = edition.id;

  // 2. Get the three events for this edition and their dates
  const eventsResult = await payload.find({
    collection: "events",
    locale,
    depth: 0,
    where: {
      edition: { equals: editionId },
    },
    sort: "date",
  });

  const events = eventsResult.docs ?? [];

  // 3. Get all ambassadors of this edition
  const ambassadorsResult = await payload.find({
    collection: "ambassadors",
    locale,
    depth: 1,
    where: {
      edition: { equals: editionId },
    },
  });
  const ambassadors = ambassadorsResult.docs ?? [];

  // 4. Get all sponsors of this edition
  const sponsorsResult = await payload.find({
    collection: "sponsors",
    locale,
    depth: 1,
    where: {
      edition: { equals: editionId },
    },
  });
  const sponsors = sponsorsResult.docs ?? [];

  return {
    edition,
    events,
    ambassadors,
    sponsors,
  };
}
