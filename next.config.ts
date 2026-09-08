import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  /**
   * Required alongside `cacheComponents` for the App Shell flow: a URL whose
   * params `generateStaticParams` did not return is served the shell straight
   * away, then upgraded in the background and cached. That is what lets blog
   * posts be generated on first request instead of at build time.
   */
  partialPrefetching: true,
  cacheLife: {
    /**
     * Everything the CMS serves. The site's content changes roughly once a
     * year, and every collection invalidates its own tag on change (see
     * `revalidate-cache.ts`), so correctness comes from `revalidateTag`, not
     * from this window — it only bounds how long a *missed* invalidation could
     * go unnoticed.
     *
     * `revalidate` is a week rather than the 30 days of the `max` preset
     * because `revalidateCache` logs a failed webhook but never retries, and a
     * month of silent staleness is too long to absorb.
     *
     * `stale` stays above five minutes so cached content remains eligible for
     * the route's App Shell; under that threshold Next excludes it.
     */
    content: {
      stale: 600, // 10 minutes, client-side router cache
      revalidate: 604_800, // 7 days
      expire: 31_536_000, // 1 year
    },
  },
  allowedDevOrigins: ["192.168.0.106"],
  images: {
    // An allowlist the moment it is non-empty: any local path without an entry
    // here is rejected by the optimizer with a 400.
    localPatterns: [
      {
        pathname: "/assets/images/**",
        search: "",
      },
      {
        // Media is served by Payload from the private bucket. `search` is left
        // open because the file route also accepts a `?prefix=` query param.
        pathname: "/api/media/**",
      },
    ],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "s3.taws.espol.edu.ec",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin(
  "./src/shared/lib/next-intl/request.ts",
);

export default withNextIntl(withPayload(nextConfig));
