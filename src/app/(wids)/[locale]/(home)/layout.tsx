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
      title:
        "WiDS Guayaquil | Elevating, Celebrating, and Supporting Women in Data Science",
      description:
        "Women in Data Science (WiDS) Guayaquil empowers women to reach their full potential in the field of data science.",
    },
    es: {
      title:
        "WiDS Guayaquil | Elevando, Celebrando y Apoyando a las Mujeres en Ciencia de Datos",
      description:
        "Women in Data Science (WiDS) Guayaquil empodera a las mujeres para que alcancen su máximo potencial en el campo de la ciencia de datos.",
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
