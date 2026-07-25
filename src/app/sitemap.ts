import type { MetadataRoute } from "next";

import { routing } from "@/shared/lib/next-intl/routing";
import { getAppUrl } from "@/shared/utils/get-app-url";

import { getBlogPosts } from "@/features/blog/queries/get-blog-posts";

const SITEMAP_EXCLUDED_PATHNAMES = new Set<string>(["/conference/attendance"]);

/** `/blog/[slug]` is a template, not a URL — its posts are added separately. */
const isDynamicPathname = (pathname: string) => pathname.includes("[");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = Object.entries(routing.pathnames)
    .filter(
      ([key]) =>
        !SITEMAP_EXCLUDED_PATHNAMES.has(key) && !isDynamicPathname(key),
    )
    .map(([, pathname]) => ({
      url: new URL(pathname.es, getAppUrl()).toString(),
      lastModified: new Date(),
      changeFrequency: pathname.es === "/" ? "weekly" : "monthly",
      priority: pathname.es === "/" ? 1 : 0.8,
      alternates: {
        languages: {
          en: new URL(pathname.en, getAppUrl()).toString(),
          es: new URL(pathname.es, getAppUrl()).toString(),
        },
      },
    }));

  // Slugs are localized, so each locale is fetched and the pair matched by id.
  const [spanishPosts, englishPosts] = await Promise.all([
    getBlogPosts("es"),
    getBlogPosts("en"),
  ]);

  const englishSlugById = new Map(
    englishPosts.map((post) => [post.id, post.slug]),
  );

  const postEntries: MetadataRoute.Sitemap = spanishPosts.map((post) => ({
    url: new URL(`/blog/${post.slug}`, getAppUrl()).toString(),
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly",
    priority: 0.6,
    alternates: {
      languages: {
        en: new URL(
          `/en/blog/${englishSlugById.get(post.id) ?? post.slug}`,
          getAppUrl(),
        ).toString(),
        es: new URL(`/blog/${post.slug}`, getAppUrl()).toString(),
      },
    },
  }));

  return [...staticEntries, ...postEntries];
}
