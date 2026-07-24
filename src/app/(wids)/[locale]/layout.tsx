import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { Barlow, Barlow_Condensed } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import { Toaster } from "@/shared/components/ui/sonner";
import { Footer } from "@/shared/components/footer";
import { Header } from "@/shared/components/header";
import { routing } from "@/shared/lib/next-intl/routing";
import { UMAMI_TRACKED_DOMAINS } from "@/shared/lib/umami/umami-domains";
import { cn } from "@/shared/utils/cn";
import { getAppUrl } from "@/shared/utils/get-app-url";
import "@/shared/styles/globals.css";

export const barlow = Barlow({
  subsets: ["latin"],
  variable: "--font-barlow",
  weight: ["300", "400", "600", "700"],
  display: "swap",
  preload: false,
});

export const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  weight: ["400", "700"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: getAppUrl(),
  applicationName: "WiDS Guayaquil",
  title:
    "WiDS Guayaquil | Elevando, Celebrando y Apoyando a las Mujeres en Ciencia de Datos",
  description:
    "Women in Data Science (WiDS) Guayaquil empodera a las mujeres para que alcancen su máximo potencial en el campo de la ciencia de datos.",
  openGraph: {
    siteName: "WiDS Guayaquil",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) return notFound();

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={cn(
        "font-barlow antialiased",
        barlow.variable,
        barlowCondensed.variable,
      )}
    >
      <head>
        <Script
          defer
          src="https://analytics.taws.espol.edu.ec/script.js"
          data-website-id="a9968fe2-7cbd-485c-889b-df72651c22d9"
          data-domains={UMAMI_TRACKED_DOMAINS}
        />
      </head>
      <body>
        <NextIntlClientProvider>
          <Header />
          {children}
          <Toaster />
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
