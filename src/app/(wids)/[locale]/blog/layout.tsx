import type { Metadata } from "next";

import type { Locale } from "@/shared/lib/next-intl/types";
import { setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const metadata: Record<Locale, Metadata> = {
    en: {
      title: "WiDS Guayaquil | Blog",
      description:
        "Read the latest news, insights, and updates from the WiDS Guayaquil community.",
    },
    es: {
      title: "WiDS Guayaquil | Blog",
      description:
        "Lee las últimas noticias, insights y actualizaciones de la comunidad WiDS Guayaquil.",
    },
  };

  return metadata[locale];
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return children;
}
