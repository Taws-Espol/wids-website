import type { Where } from "payload";

/**
 * Constrains a posts query to what a reader may see.
 *
 * Payload access control already hides drafts from unauthenticated reads, but
 * the queries run through the Local API, which bypasses access control unless
 * `overrideAccess: false` is passed. This filter is the second lock, and the one
 * that is cheap to test.
 */
export function publishedPostsWhere(): Where {
  return {
    _status: { equals: "published" },
  };
}

/** The same constraint, narrowed to one slug for the detail page. */
export function publishedPostBySlugWhere(slug: string): Where {
  return {
    and: [publishedPostsWhere(), { slug: { equals: slug } }],
  };
}
