import "server-only";

import { cacheTag } from "next/cache";
import config from "@payload-config";
import { getPayload } from "payload";

import { POSTS_TAG } from "@/shared/constants/cache-tags";
import type { Locale } from "@/shared/lib/next-intl/types";

import { publishedPostsWhere } from "../utils/published-posts-where";

/**
 * Only the most recent posts are prerendered at build time. Older ones render
 * on first request, since `dynamicParams` is on by default — this keeps build
 * time flat as the archive grows.
 */
export const PRERENDERED_POST_COUNT = 10;

export async function getLatestPostSlugs(locale: Locale) {
  "use cache";
  cacheTag(POSTS_TAG);

  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "posts",
    locale,
    depth: 0,
    limit: PRERENDERED_POST_COUNT,
    sort: "-publishedAt",
    where: publishedPostsWhere(),
    select: { slug: true },
  });

  return (result.docs ?? []).map((post) => post.slug).filter(Boolean);
}
