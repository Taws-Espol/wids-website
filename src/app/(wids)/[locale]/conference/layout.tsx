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
      title: "WiDS Guayaquil | Conference",
      description:
        "WiDS Conference brings together data science professionals, researchers, and enthusiasts to share insights, discuss trends, and explore innovative applications of data science.",
    },
    es: {
      title: "WiDS Guayaquil | Conferencia",
      description:
        "La Conferencia WiDS reúne a profesionales, investigadores y entusiastas de la ciencia de datos para compartir conocimientos, discutir tendencias y explorar aplicaciones innovadoras de la ciencia de datos.",
    },
  };

  return metadata[locale];
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
