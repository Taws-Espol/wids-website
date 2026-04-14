import { Barlow, Barlow_Condensed } from "next/font/google";

import { Button } from "@/shared/components/ui/button";
import { TypographyH1 } from "@/shared/components/ui/typography-h1";
import { TypographyH2 } from "@/shared/components/ui/typography-h2";
import { TypographyH3 } from "@/shared/components/ui/typography-h3";
import { TypographyH4 } from "@/shared/components/ui/typography-h4";
import { TypographyH5 } from "@/shared/components/ui/typography-h5";
import { TypographyH6 } from "@/shared/components/ui/typography-h6";
import { Link } from "@/shared/components/ui/link";
import { cn } from "@/shared/utils/cn";

import "@/shared/styles/globals.css";

export const barlow = Barlow({
  subsets: ["latin"],
  variable: "--font-barlow",
  weight: ["300", "400", "500", "600", "700"],
});

export const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  weight: ["400", "700"],
});

export default function StylesPage() {
  return (
    <html
      lang="en"
      className={cn(
        "font-barlow antialiased",
        barlow.variable,
        barlowCondensed.variable,
      )}
    >
      <body className="flex flex-col items-center justify-center gap-4">
        <TypographyH1>Heading 1</TypographyH1>
        <TypographyH2>Heading 2</TypographyH2>
        <TypographyH3>Heading 3</TypographyH3>
        <TypographyH4>Heading 4</TypographyH4>
        <TypographyH5>Heading 5</TypographyH5>
        <TypographyH6>Heading 6</TypographyH6>
        <Button variant="green-light">Button</Button>
        <Button variant="blue">Button</Button>
        <Button variant="yellow">Button</Button>
        <Button variant="orange">Button</Button>
        <Button variant="purple">Button</Button>
        <Button variant="green-dark">Button</Button>
        <Link variant="default" href="/">
          Link
        </Link>
        <Link variant="main-nav" href="/" underlineColor="#ffcb05">
          Link
        </Link>
        <Link variant="alt-nav" href="/">
          Link
        </Link>
        <Link variant="alt-subnav" href="/">
          Link
        </Link>
      </body>
    </html>
  );
}
