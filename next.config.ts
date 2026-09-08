import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
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
