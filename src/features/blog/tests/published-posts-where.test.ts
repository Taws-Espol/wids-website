import { describe, expect, it } from "vitest";

import { POSTS_TAG, postTag } from "@/shared/constants/cache-tags";
import {
  publishedPostBySlugWhere,
  publishedPostsWhere,
} from "@/features/blog/utils/published-posts-where";

/**
 * The one rule here with a privacy consequence: a draft must never reach a
 * reader. Access control also enforces it, but the Local API bypasses access
 * control by default, so this filter is the lock that is cheap to test.
 */
describe("publishedPostsWhere", () => {
  it("constrains the query to published posts", () => {
    expect(publishedPostsWhere()).toEqual({
      _status: { equals: "published" },
    });
  });

  it("never opts into drafts", () => {
    expect(JSON.stringify(publishedPostsWhere())).not.toContain("draft");
  });
});

describe("publishedPostBySlugWhere", () => {
  it("requires both the slug and the published status", () => {
    expect(publishedPostBySlugWhere("mi-post")).toEqual({
      and: [
        { _status: { equals: "published" } },
        { slug: { equals: "mi-post" } },
      ],
    });
  });

  it("cannot be satisfied by the slug alone", () => {
    const where = publishedPostBySlugWhere("mi-post");

    // An `or` here would let a draft through on a slug match.
    expect(where).not.toHaveProperty("or");
    expect(where.and).toHaveLength(2);
  });

  it.each(["", "  ", "../admin", "a-real-slug"])(
    "keeps the status constraint for slug %o",
    (slug) => {
      expect(publishedPostBySlugWhere(slug).and?.[0]).toEqual({
        _status: { equals: "published" },
      });
    },
  );
});

describe("postTag", () => {
  it("namespaces the tag under the listing tag", () => {
    expect(postTag(7)).toBe(`${POSTS_TAG}:7`);
  });

  it("gives different posts different tags", () => {
    expect(postTag(1)).not.toBe(postTag(2));
  });

  it("accepts string and numeric ids alike", () => {
    expect(postTag("7")).toBe(postTag(7));
  });
});
