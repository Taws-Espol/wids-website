import { getTranslations } from "next-intl/server";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  MailIcon,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  LinkedinIcon,
} from "@hugeicons/core-free-icons";
import Image from "next/image";

import { Link } from "@/shared/components/ui/link";
import { TypographyH3 } from "@/shared/components/ui/typography-h3";
import { TypographyParagraph } from "@/shared/components/ui/typography-paragraph";
import { NAVIGATION_ITEMS } from "@/shared/constants/app";

const socialLinks = [
  {
    platform: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/widsespol",
    icon: FacebookIcon,
  },
  {
    platform: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/widsespol/",
    icon: InstagramIcon,
  },
  {
    platform: "x",
    label: "X",
    href: "https://x.com/widsespol",
    icon: TwitterIcon,
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/wids-guayaquil",
    icon: LinkedinIcon,
  },
];

export async function Footer() {
  const t = await getTranslations("shared.footer");

  return (
    <footer className="border-w-green-dark/20 flex w-full flex-col items-center justify-between gap-10 border-t px-4 py-16 sm:px-8 md:flex-row lg:px-42">
      <div className="flex flex-col items-center gap-10 sm:flex-row">
        <Link href="/" className="relative aspect-500/560 w-1/2 min-w-46">
          <Image src="/logo-v.svg" alt="WiDS logo" fill />
        </Link>

        <div className="flex flex-col gap-4">
          <TypographyH3>{t("siteName")}</TypographyH3>

          <TypographyParagraph className="text-foreground/90">
            {t("description")}
          </TypographyParagraph>

          <Link
            href={`mailto:wids_taws@fiec.espol.edu.ec`}
            className="flex items-center gap-2 no-underline"
          >
            <HugeiconsIcon icon={MailIcon} className="size-4" />
            wids_taws@fiec.espol.edu.ec
          </Link>

          <div className="flex flex-wrap gap-x-6 gap-y-3 pt-2">
            {socialLinks.map((item) => (
              <Link
                title={item.label}
                key={item.platform}
                href={item.href}
                className="flex items-center gap-2 text-sm md:text-base"
                target="_blank"
                rel="noopener noreferrer"
              >
                <HugeiconsIcon icon={item.icon} className="size-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <nav className="hidden md:block">
        <ul className="flex flex-col gap-2">
          {NAVIGATION_ITEMS.map((item) => (
            <li key={item.key}>
              <Link href={item.href}>{t(item.key)}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
