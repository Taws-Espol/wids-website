import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  allowedDevOrigins: ["192.168.0.106"],
  images: {
    localPatterns: [
      {
        pathname: "/assets/images/**",
        search: "",
      },
    ],
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
};

const withNextIntl = createNextIntlPlugin(
  "./src/shared/lib/next-intl/request.ts",
);

export default withNextIntl(withPayload(nextConfig));
