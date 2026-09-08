import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { getAlternatesMetadata } from "@/shared/lib/next-intl/get-alternates-metadata";
import type { Locale } from "@/shared/lib/next-intl/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const metadata: Record<Locale, Metadata> = {
    en: {
      title: "WiDS Guayaquil | Terms and Conditions",
      description:
        "The terms you accept when registering for a WiDS Guayaquil event, covering attendance, the use of your data, and event photography.",
    },
    es: {
      title: "WiDS Guayaquil | Términos y Condiciones",
      description:
        "Los términos que aceptas al registrarte en un evento de WiDS Guayaquil: asistencia, uso de tus datos y fotografía del evento.",
    },
  };

  return {
    ...metadata[locale],
    alternates: getAlternatesMetadata("/terms-and-conditions", locale),
  };
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
