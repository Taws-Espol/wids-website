import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import type { Locale } from "@/shared/lib/next-intl/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const metadata: Record<Locale, Metadata> = {
    en: {
      title: "WiDS Guayaquil | NextGen",
      description:
        "WiDS NextGen inspires secondary school students to consider careers involving data science, artificial intelligence (AI), and related fields.",
    },
    es: {
      title: "WiDS Guayaquil | NextGen",
      description:
        "WiDS NextGen inspira a estudiantes de secundaria a considerar carreras relacionadas con la ciencia de datos, inteligencia artificial (IA) y campos afines.",
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
