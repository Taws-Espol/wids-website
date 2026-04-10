import { defineRouting } from "next-intl/routing";

import { LOCALES } from "@/shared/constants/i18n";

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: "es",
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
    "/nextgen": {
      en: "/nextgen",
      es: "/nextgen",
    },
    "/datathon": {
      en: "/datathon",
      es: "/datathon",
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
