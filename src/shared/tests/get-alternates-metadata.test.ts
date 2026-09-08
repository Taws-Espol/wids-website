import { describe, expect, it } from "vitest";

import { getAlternatesMetadata } from "@/shared/lib/next-intl/get-alternates-metadata";
import { routing } from "@/shared/lib/next-intl/routing";

/**
 * These pin the two things that have already gone wrong once each: emitting a
 * URL that redirects instead of resolving (#178, where the locale prefix was
 * omitted and every English alternate landed on the Spanish page), and losing
 * the alternates entirely (#192, where next-intl's `getPathname` dropped them
 * during prerendering).
 */
describe("getAlternatesMetadata", () => {
  it("prefixes the locale and uses that locale's pathname", () => {
    const alternates = getAlternatesMetadata("/about", "en");

    expect(alternates?.canonical).toContain("/en/about");
    expect(alternates?.languages?.en).toContain("/en/about");
    expect(alternates?.languages?.es).toContain("/es/nosotros");
  });

  it("points x-default at the default locale", () => {
    const alternates = getAlternatesMetadata("/about", "en");
    const expected = alternates?.languages?.[routing.defaultLocale];

    expect(alternates?.languages?.["x-default"]).toBe(expected);
  });

  it("keeps the home route from ending in a bare slash", () => {
    const alternates = getAlternatesMetadata("/", "es");

    // `/es`, not `/es/` — a trailing slash would be a second URL for one page.
    expect(alternates?.canonical).toMatch(/\/es$/);
  });

  it("emits an entry for every configured locale, plus x-default", () => {
    const alternates = getAlternatesMetadata("/conference", "es");

    expect(Object.keys(alternates?.languages ?? {}).sort()).toEqual(
      [...routing.locales, "x-default"].sort(),
    );
  });

  it("never emits a URL that would redirect", () => {
    // Every unprefixed path redirects to the default locale, so a missing
    // prefix is the failure this guards against.
    for (const pathname of ["/", "/about", "/conference", "/blog"] as const) {
      for (const locale of routing.locales) {
        const { canonical } = getAlternatesMetadata(pathname, locale) ?? {};

        expect(String(canonical)).toMatch(
          new RegExp(`^https?://[^/]+/${locale}(/|$)`),
        );
      }
    }
  });
});
