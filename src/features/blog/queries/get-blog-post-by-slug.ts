import "server-only";

import { cacheTag } from "next/cache";
import config from "@payload-config";
import { getPayload, type Payload } from "payload";

import { MEDIA_TAG, POSTS_TAG, postTag } from "@/shared/constants/cache-tags";
import { routing } from "@/shared/lib/next-intl/routing";
import type { Locale } from "@/shared/lib/next-intl/types";

import { publishedPostBySlugWhere } from "../utils/published-posts-where";

function findBySlug(payload: Payload, slug: string, locale: Locale) {
  return payload.find({
    collection: "posts",
    locale,
    depth: 1,
    limit: 1,
    where: publishedPostBySlugWhere(slug),
  });
}

export async function getBlogPostBySlug(slug: string, locale: Locale) {
  "use cache";

  const payload = await getPayload({ config });

  let result = await findBySlug(payload, slug, locale);

  /*
   * A `where` clause matches against the requested locale's own column, and
   * Payload's fallback only applies to the values it returns. So an untranslated
   * post has no slug in `en` and the lookup misses, even though the post is
   * perfectly readable via the fallback. Retry against the default locale so the
   * reader gets the Spanish post rather than a 404.
   */
  if (result.docs.length === 0 && locale !== routing.defaultLocale) {
    result = await findBySlug(payload, slug, routing.defaultLocale as Locale);
  }

  const post = result.docs?.[0] ?? null;

  if (!post) {
    // A miss is tagged with the listing tag so that publishing a post under
    // this slug clears the cached 404.
    cacheTag(POSTS_TAG);

    return null;
  }

  /*
   * Deliberately not POSTS_TAG. Editing any post revalidates POSTS_TAG for the
   * listing, and if every post page carried it too, one edit would invalidate
   * all of them — which is the thing the per-post tag exists to avoid.
   */
  cacheTag(postTag(post.id), MEDIA_TAG);

  return post;
}
