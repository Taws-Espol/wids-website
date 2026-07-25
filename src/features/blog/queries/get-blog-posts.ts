import "server-only";

import { cacheTag } from "next/cache";
import config from "@payload-config";
import { getPayload } from "payload";

import { MEDIA_TAG, POSTS_TAG } from "@/shared/constants/cache-tags";
import type { Locale } from "@/shared/lib/next-intl/types";

import { publishedPostsWhere } from "../utils/published-posts-where";

/** Volume is low; revisit if the archive ever approaches this. */
const MAX_POSTS = 50;

export async function getBlogPosts(locale: Locale) {
  "use cache";
  // depth 1 populates coverImage, so a media edit has to invalidate this too.
  cacheTag(POSTS_TAG, MEDIA_TAG);

  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "posts",
    locale,
    depth: 1,
    limit: MAX_POSTS,
    sort: "-publishedAt",
    where: publishedPostsWhere(),
  });

  return result.docs ?? [];
}
