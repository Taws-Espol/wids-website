import type { Metadata } from "next";

import type { Locale } from "@/shared/lib/next-intl/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const metadata: Record<Locale, Metadata> = {
    en: {
      title: "WiDS Guayaquil | Datathon",
      description:
        "WiDS Datathon provides a platform for data science enthusiasts to learn, apply and hone their skills through the social impact challenges.",
    },
    es: {
      title: "WiDS Guayaquil | Datathon",
      description:
        "El Datathon WiDS ofrece una plataforma para que entusiastas de la ciencia de datos aprendan, apliquen y perfeccionen sus habilidades a través de retos de impacto social.",
    },
  };

  return metadata[locale];
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
