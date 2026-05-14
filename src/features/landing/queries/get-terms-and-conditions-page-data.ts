import "server-only";

import { cacheTag } from "next/cache";
import config from "@payload-config";
import { getPayload } from "payload";

import { LANDING_TAG } from "@/shared/constants/cache-tags";
import type { Locale } from "@/shared/lib/next-intl/types";

export async function getTermsAndConditionsPageData(locale: Locale) {
  "use cache";
  cacheTag(LANDING_TAG);

  const payload = await getPayload({ config });

  const data = await payload.findGlobal({
    slug: "terms-and-conditions",
    locale,
  });

  return data;
}
