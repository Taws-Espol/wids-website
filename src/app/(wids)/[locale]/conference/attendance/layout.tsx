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
      title: "WiDS Guayaquil | Confirm your attendance",
      robots: { index: false, follow: false },
      // Clears the canonical inherited from the conference layout, which would
      // otherwise point this page at /conference.
      alternates: { canonical: null },
    },
    es: {
      title: "WiDS Guayaquil | Confirma tu asistencia",
      robots: { index: false, follow: false },
      alternates: { canonical: null },
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
