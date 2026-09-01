import type { MetadataRoute } from "next";

import { getPathname } from "@/shared/lib/next-intl/navigation";
import { routing } from "@/shared/lib/next-intl/routing";
import type { Locale } from "@/shared/lib/next-intl/types";
import { getAppUrl } from "@/shared/utils/get-app-url";

type Pathname = keyof typeof routing.pathnames;

/**
 * Routes with no `[param]` segment, which are the only ones that name a URL on
 * their own. `/blog/[slug]` is a template; posts are not listed in the sitemap.
 */
type StaticPathname = Exclude<Pathname, `${string}[${string}`>;

const SITEMAP_EXCLUDED_PATHNAMES = new Set<string>(["/conference/attendance"]);

const isStaticPathname = (pathname: Pathname): pathname is StaticPathname =>
  !pathname.includes("[");

/**
 * Resolves a route to its absolute URL in one locale.
 *
 * Goes through `getPathname` rather than reading `routing.pathnames` directly.
 * The raw map holds unprefixed paths, but `localePrefix` is "always", so every
 * real URL carries an `/en` or `/es` segment. Building the URLs by hand omitted
 * it, and unprefixed paths redirect to the *default* locale — so every English
 * alternate resolved to the Spanish page, and both alternates for `/` pointed
 * at the same URL.
 */
function toUrl(pathname: StaticPathname, locale: Locale) {
  return new URL(
    getPathname({ href: pathname, locale }),
    getAppUrl(),
  ).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  return (Object.keys(routing.pathnames) as Pathname[])
    .filter(isStaticPathname)
    .filter((pathname) => !SITEMAP_EXCLUDED_PATHNAMES.has(pathname))
    .map((pathname) => ({
      url: toUrl(pathname, routing.defaultLocale),
      lastModified: new Date(),
      changeFrequency: pathname === "/" ? "weekly" : "monthly",
      priority: pathname === "/" ? 1 : 0.8,
      alternates: {
        languages: {
          ...Object.fromEntries(
            routing.locales.map((locale) => [locale, toUrl(pathname, locale)]),
          ),
          // Marks the URL for readers whose language we do not publish. That is
          // the default locale, not a separate unprefixed URL — none exists.
          "x-default": toUrl(pathname, routing.defaultLocale),
        },
      },
    }));
}
