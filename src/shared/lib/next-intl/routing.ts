import { defineRouting } from "next-intl/routing";

import { LOCALES } from "@/shared/lib/next-intl/locales";

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: "es",
  /**
   * TEMPORARY — works around a Next.js bug, not a decision about hreflang.
   * Revert to the default (`true`) once the upstream fix lands.
   *
   * On every revalidation of a prerendered route, Next appends the proxy's
   * `Link` header to the one already stored with the cached entry instead of
   * replacing it, so the hreflang set compounds without bound. Measured on
   * 2026-09-01: /es carried the same three-entry set 340 times, 67 KB of
   * response headers. At `x-nextjs-stale-time: 300` that is ~28 hours of
   * uptime, and it keeps growing. Chrome tolerates the size; Safari rejects the
   * response outright and reports it as "the page's address isn't valid".
   *
   * next-intl is not at fault — its own header is clean. Hitting the app
   * directly on localhost shows two `Link` headers: the proxy's, with one copy,
   * and the cached prerender's, with N copies and Next's own preconnect/preload
   * hints at the tail. Same merge path as vercel/next.js#69000.
   *
   * There is no userland fix: the header is assembled inside the caching layer,
   * so the only other lever is giving up ISR. `sitemap.ts` still emits hreflang
   * for every route, so search engines keep a complete signal meanwhile.
   */
  alternateLinks: false,
  pathnames: {
    "/": {
      en: "/",
      es: "/",
    },
    "/about": {
      en: "/about",
      es: "/nosotros",
    },
    "/conference": {
      en: "/conference",
      es: "/conferencia",
    },
    "/conference/attendance": {
      en: "/conference/attendance",
      es: "/conferencia/asistencia",
    },
    "/learn": {
      en: "/learn",
      es: "/aprender",
    },
    "/learn/datathon": {
      en: "/learn/datathon",
      es: "/aprender/datathon",
    },
    "/learn/nextgen": {
      en: "/learn/nextgen",
      es: "/aprender/nextgen",
    },
    "/terms-and-conditions": {
      en: "/terms-and-conditions",
      es: "/terminos-y-condiciones",
    },
    "/blog": {
      en: "/blog",
      es: "/blog",
    },
    "/blog/[slug]": {
      en: "/blog/[slug]",
      es: "/blog/[slug]",
    },
  },
});
