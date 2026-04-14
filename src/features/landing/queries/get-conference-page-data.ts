import "server-only";

import { cacheTag } from "next/cache";
import config from "@payload-config";
import { getPayload } from "payload";

import { LANDING_TAG } from "@/shared/constants/cache-tags";
import type { Locale } from "@/shared/lib/next-intl/types";

export async function getConferencePageData(locale: Locale) {
  "use cache";

  cacheTag(LANDING_TAG);

  const payload = await getPayload({ config });

  // 1. Get the latest/current edition (by year, assuming descending sort)
  const editionsResult = await payload.find({
    collection: "editions",
    locale,
    depth: 0,
    limit: 1,
    sort: "-year",
  });

  const currentEdition = editionsResult.docs?.[0];
  if (!currentEdition) {
    return {
      event: null,
      speakers: [],
      schedule: [],
    };
  }

  const currentEditionId = currentEdition.id;

  // 2. Get the conference event for this edition
  const eventResult = await payload.find({
    collection: "events",
    locale,
    depth: 0,
    where: {
      type: { equals: "conference" },
      edition: { equals: currentEditionId },
    },
  });
  const event = eventResult.docs?.[0];
  if (!event) {
    return {
      event: null,
      speakers: [],
      schedule: [],
    };
  }

  // 3. Get the speakers for the conference event
  const speakersResult = await payload.find({
    collection: "speakers",
    locale,
    depth: 1,
    where: {
      event: { equals: event?.id },
    },
  });
  const speakers = speakersResult.docs ?? [];

  // 4. Get the schedule for the conference event
  const scheduleResult = await payload.find({
    collection: "schedules",
    locale,
    depth: 1,
    where: {
      event: { equals: event?.id },
    },
    sort: "startTime",
  });
  const schedule = scheduleResult.docs ?? [];

  return {
    event,
    speakers,
    schedule,
  };
}
