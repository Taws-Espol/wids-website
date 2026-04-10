import "server-only";

import config from "@payload-config";
import { getPayload } from "payload";

import type { Locale } from "@/shared/lib/next-intl/types";

export async function getHomePageData(locale: Locale) {
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
    return null;
  }

  const currentEditionId = currentEdition.id;

  // 2. Get the three events for this edition and their dates
  const eventsResult = await payload.find({
    collection: "events",
    locale,
    depth: 0,
    where: {
      edition: { equals: currentEditionId },
    },
    limit: 3,
    sort: "date",
  });

  const events = eventsResult.docs?.map((event) => ({
    id: event.id,
    title: event.title,
    date: event.date,
    type: event.type,
  }));

  // 3. Get all ambassadors of this edition
  const ambassadorsResult = await payload.find({
    collection: "ambassadors",
    locale,
    depth: 0,
    where: {
      edition: { equals: currentEditionId },
    },
  });
  const ambassadors = ambassadorsResult.docs ?? [];

  // 4. Get all sponsors of this edition
  const sponsorsResult = await payload.find({
    collection: "sponsors",
    locale,
    depth: 0,
    where: {
      edition: { equals: currentEditionId },
    },
  });
  const sponsors = sponsorsResult.docs ?? [];

  return {
    edition: currentEdition,
    events,
    ambassadors,
    sponsors,
  };
}
