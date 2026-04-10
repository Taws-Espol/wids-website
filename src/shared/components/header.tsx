"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/shared/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { NavLink } from "@/shared/components/nav-link";
import { COLORS } from "@/shared/constants/colors";
import { NAVIGATION_ITEMS } from "@/shared/constants/app";

const navUnderlinePalette = Object.values(COLORS);

export function Header() {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const t = useTranslations("shared.header");

  return (
    <header className="flex w-full items-center justify-between p-2 md:px-4 lg:px-8 xl:px-42">
      <Link href="/" className="relative aspect-1030/280 h-20 md:h-16 lg:h-28">
        <Image
          src="/logo.svg"
          alt="WiDS logo"
          loading="eager"
          fetchPriority="high"
          fill
        />
      </Link>
      <div className="flex items-center justify-end gap-8 md:hidden">
        <Drawer
          direction="right"
          open={isDrawerOpen}
          onOpenChange={(open) => {
            if (open) {
              (document.activeElement as HTMLElement)?.blur();
            }
            setIsDrawerOpen(open);
          }}
        >
          <DrawerTrigger asChild>
            <Button variant="transparent" size="icon">
              <HugeiconsIcon
                icon={Menu01Icon}
                className="text-w-green-dark size-7"
              />
            </Button>
          </DrawerTrigger>

          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader className="flex w-full flex-col">
                <DrawerTitle className="sr-only">Menu</DrawerTitle>
                <DrawerDescription className="sr-only">
                  Choose an option from the menu.
                </DrawerDescription>

                <DrawerClose asChild className="self-end">
                  <Button variant="transparent" size="icon">
                    <HugeiconsIcon
                      icon={Cancel01Icon}
                      className="text-w-green-dark size-7"
                    />
                  </Button>
                </DrawerClose>
              </DrawerHeader>

              <nav>
                <ul className="flex flex-col gap-8 px-16 py-8">
                  {NAVIGATION_ITEMS.map((item, index) => (
                    <li key={item.key}>
                      <NavLink
                        onClick={() => setIsDrawerOpen(false)}
                        href={item.href}
                        underlineColor={
                          navUnderlinePalette[
                            index % navUnderlinePalette.length
                          ] ?? ""
                        }
                        className="text-2xl font-normal"
                      >
                        {t(item.key)}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      <div className="hidden items-center justify-between gap-8 md:flex">
        <nav>
          <ul className="flex items-center gap-8">
            {NAVIGATION_ITEMS.map((item, index) => (
              <li key={item.key}>
                <NavLink
                  className="md:text-sm lg:text-lg xl:text-xl"
                  href={item.href}
                  underlineColor={
                    navUnderlinePalette[index % navUnderlinePalette.length] ??
                    ""
                  }
                >
                  {t(item.key)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Button
          variant="yellow"
          onClick={() => router.push("/register")}
          className="md:py-2 md:text-sm lg:text-lg xl:text-xl"
        >
          {t("cta")}
        </Button>
      </div>
    </header>
  );
}
