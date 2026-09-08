import type { Metadata } from "next";

import { routing } from "@/shared/lib/next-intl/routing";
import type { Locale } from "@/shared/lib/next-intl/types";
import { getAppUrl } from "@/shared/utils/get-app-url";

type Pathname = keyof typeof routing.pathnames;

/**
 * Routes with no `[param]` segment, which are the only ones this helper can
 * resolve on its own. A parameterised route builds its own canonical from the
 * values behind the params.
 */
export type StaticPathname = Exclude<Pathname, `${string}[${string}`>;

/**
 * Resolves a route to its absolute URL in one locale.
 *
 * Deliberately *not* using next-intl's `getPathname`. That helper reaches into
 * request scope, and under `cacheComponents` it silently drops the whole
 * `alternates` block during prerendering — measured: with it, `es/about.html`
 * and `es/blog.html` built without a canonical while `en/about.html` had one,
 * for no reason visible in the source. Building the path here keeps
 * `generateMetadata` pure, which also makes it unit-testable.
 *
 * The trade is that the locale prefix is applied here rather than derived, so
 * the assertion below fails loudly if `localePrefix` ever stops being
 * "always" — the alternative is silently emitting URLs that redirect, which is
 * how the sitemap broke in #178.
 */
function toUrl(pathname: StaticPathname, locale: Locale) {
  const localized = routing.pathnames[pathname][locale];
  const path = localized === "/" ? `/${locale}` : `/${locale}${localized}`;

  return new URL(path, getAppUrl()).toString();
}

/**
 * Builds the canonical URL and the `hreflang` alternates for a route.
 *
 * This carries more weight than it normally would: the `Link` response header
 * next-intl emits was turned off in #180 to work around a Next.js bug, so
 * without these tags the sitemap is the only `hreflang` signal the site has.
 */
export function getAlternatesMetadata(
  pathname: StaticPathname,
  currentLocale: Locale,
): Metadata["alternates"] {
  return {
    canonical: toUrl(pathname, currentLocale),
    languages: {
      ...Object.fromEntries(
        routing.locales.map((locale) => [locale, toUrl(pathname, locale)]),
      ),
      // Marks the URL for readers whose language the site does not publish.
      // That is the default locale; there is no unprefixed URL to point at.
      "x-default": toUrl(pathname, routing.defaultLocale),
    },
  };
}
