import type { MetadataRoute } from "next";

import { routing } from "@/shared/lib/next-intl/routing";
import { getAppUrl } from "@/shared/utils/get-app-url";

const SITEMAP_EXCLUDED_PATHNAMES = new Set<string>(["/conference/attendance"]);

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.entries(routing.pathnames)
    .filter(([key]) => !SITEMAP_EXCLUDED_PATHNAMES.has(key))
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
}
