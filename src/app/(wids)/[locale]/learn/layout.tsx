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
      title: "WiDS Guayaquil | Learn",
      description:
        "The WiDS Academy is our platform to provide upskilling workshops and educational programs and resources for students, teachers and faculty.",
    },
    es: {
      title: "WiDS Guayaquil | Aprender",
      description:
        "La Academia WiDS es nuestra plataforma para ofrecer talleres de formación y programas y recursos educativos para estudiantes, docentes y profesores.",
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
