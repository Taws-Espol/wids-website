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
