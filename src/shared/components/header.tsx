"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import { Button } from "@/shared/components/ui/button";
import { Link } from "@/shared/components/ui/link";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/shared/components/ui/navigation-menu";
import { TypographyParagraph } from "@/shared/components/ui/typography-paragraph";
import { NAVIGATION_ITEMS, SOCIAL_LINKS } from "@/shared/constants/app";

export function Header() {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const t = useTranslations("shared.header");

  return (
    <header className="flex w-full items-center justify-between p-2 md:px-4 lg:px-8 xl:px-42">
      <Link href="/" className="relative aspect-1030/280 h-20 md:h-16 lg:h-28">
        <Image
          src="/assets/images/logo.svg"
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

          <DrawerContent className="before:bg-w-green-dark bg-w-green-dark text-w-green-dark-foreground">
            <DrawerHeader className="flex w-full flex-col">
              <DrawerTitle className="sr-only">Menu</DrawerTitle>
              <DrawerDescription className="sr-only">
                Choose an option from the menu.
              </DrawerDescription>

              <DrawerClose asChild className="self-end">
                <Button variant="transparent" size="icon">
                  <HugeiconsIcon icon={Cancel01Icon} className="size-7" />
                </Button>
              </DrawerClose>
            </DrawerHeader>

            <nav className="px-12 py-6">
              <Accordion className="text-w-green-dark-foreground gap-0 border-none">
                {NAVIGATION_ITEMS.map((item) => (
                  <AccordionItem
                    key={item.key}
                    className="text-w-green-dark-foreground m-0 border-none p-0 data-open:bg-transparent"
                  >
                    {item.children && item.children.length > 0 ? (
                      <>
                        <AccordionTrigger
                          nativeButton={false}
                          render={<Link href={item.href} variant="alt-nav" />}
                          className="text-w-green-dark-foreground **:data-[slot=accordion-trigger-icon]:text-w-green-dark-foreground"
                        >
                          {t(item.key)}
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-2 pl-4">
                          {item.children?.map((child) => (
                            <Link
                              key={child.key}
                              href={child.href}
                              variant="alt-subnav"
                              className="text-w-green-dark-foreground"
                              onClick={() => setIsDrawerOpen(false)}
                            >
                              {t(child.key)}
                            </Link>
                          ))}
                        </AccordionContent>
                      </>
                    ) : (
                      <>
                        <AccordionTrigger
                          nativeButton={false}
                          render={
                            <Link
                              href={item.href}
                              variant="alt-nav"
                              onClick={() => setIsDrawerOpen(false)}
                            />
                          }
                          className="text-w-green-dark-foreground **:data-[slot=accordion-trigger-icon]:text-transparent"
                        >
                          {t(item.key)}
                        </AccordionTrigger>
                      </>
                    )}
                  </AccordionItem>
                ))}
              </Accordion>
            </nav>

            <DrawerFooter className="flex flex-col gap-6 px-10 py-20">
              <div className="flex w-full flex-wrap gap-6">
                {SOCIAL_LINKS.map((item) => (
                  <Link
                    title={item.label}
                    key={item.platform}
                    href={item.href}
                    className="text-w-green-dark-foreground hover:text-w-green-dark-foreground/50 flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <HugeiconsIcon icon={item.icon} className="size-5" />
                  </Link>
                ))}
              </div>

              <TypographyParagraph className="font-light">
                {t("nav.description")}
              </TypographyParagraph>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>

      <div className="hidden items-center justify-between gap-8 md:flex">
        <NavigationMenu>
          <NavigationMenuList className="gap-4">
            {NAVIGATION_ITEMS.map((item) => (
              <NavigationMenuItem key={item.key}>
                {item.children && item.children.length > 0 ? (
                  <>
                    <NavigationMenuTrigger
                      nativeButton={false}
                      render={
                        <Link
                          variant="main-nav"
                          href={item.href}
                          underlineColor={item.color}
                        />
                      }
                      className={navigationMenuTriggerStyle()}
                    >
                      {t(item.key)}
                    </NavigationMenuTrigger>

                    <NavigationMenuContent>
                      {item.children?.map((child) => (
                        <NavigationMenuLink
                          key={child.key}
                          render={
                            <Link
                              href={child.href}
                              underlineColor={item.color}
                            />
                          }
                        >
                          {t(child.key)}
                        </NavigationMenuLink>
                      ))}
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink
                    render={
                      <Link
                        variant="main-nav"
                        href={item.href}
                        underlineColor={item.color}
                      />
                    }
                    className={navigationMenuTriggerStyle()}
                  >
                    {t(item.key)}
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <Button
          variant="yellow"
          onClick={() => router.push("/conference")}
          className="md:text-sm lg:text-lg xl:text-xl"
        >
          {t("cta")}
        </Button>
      </div>
    </header>
  );
}
