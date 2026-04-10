import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  images: {
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== "production",
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "cdn.taws.espol.edu.ec",
      },
      {
        protocol: "https",
        hostname: "s3.taws.espol.edu.ec",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/api/media/file/:filename*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin(
  "./src/shared/lib/next-intl/request.ts",
);

export default withNextIntl(withPayload(nextConfig));
