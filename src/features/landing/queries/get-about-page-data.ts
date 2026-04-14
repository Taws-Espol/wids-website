import "server-only";

import config from "@payload-config";
import { getPayload } from "payload";
import type { Locale } from "@/shared/lib/next-intl/types";

export async function getAboutPageData(locale: Locale) {
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
  const ambassador = ambassadors.filter(
    (ambassador) => ambassador.role === "ambassador",
  )[0];
  const coAmbassadors = ambassadors.filter(
    (ambassador) => ambassador.role === "co-ambassador",
  );

  return {
    ambassador,
    coAmbassadors,
  };
}
