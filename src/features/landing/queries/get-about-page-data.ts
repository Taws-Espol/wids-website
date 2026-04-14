import "server-only";

import { cacheTag } from "next/cache";
import config from "@payload-config";
import { getPayload } from "payload";

import type { Locale } from "@/shared/lib/next-intl/types";
import { LANDING_TAG } from "@/shared/constants/cache-tags";

export async function getAboutPageData(locale: Locale) {
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
      ambassador: null,
      coAmbassadors: [],
    };
  }

  const currentEditionId = currentEdition.id;

  // 2. Get all ambassadors of this edition
  const ambassadorsResult = await payload.find({
    collection: "ambassadors",
    locale,
    depth: 1,
    where: {
      edition: { equals: currentEditionId },
    },
  });
  const ambassadors = ambassadorsResult.docs ?? [];
  const ambassador = ambassadors.find(
    (ambassador) => ambassador.role === "ambassador",
  );
  const coAmbassadors = ambassadors.filter(
    (ambassador) => ambassador.role === "co-ambassador",
  );

  return {
    ambassador,
    coAmbassadors,
  };
}
