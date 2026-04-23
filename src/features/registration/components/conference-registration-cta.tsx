"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";

import { useIsMobile } from "@/shared/hooks/use-is-mobile";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/shared/components/ui/drawer";

import { ConferenceRegistrationForm } from "./conference-registration-form";

type ConferenceRegistrationCtaProps = {
  ctaLabel: string;
  eventId: number;
};

export function ConferenceRegistrationCta({
  ctaLabel,
  eventId,
}: ConferenceRegistrationCtaProps) {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const t = useTranslations("features.registration.conference-form");

  const triggerButton = (
    <Button
      variant="green-light"
      className="self-center"
      onClick={() => setOpen(true)}
    >
      {ctaLabel}
    </Button>
  );

  if (isMobile) {
    return (
      <>
        {triggerButton}
        <Drawer direction="bottom" open={open} onOpenChange={setOpen}>
          <DrawerContent className="max-h-[90dvh] overflow-hidden">
            <DrawerHeader className="shrink-0 pb-0">
              <DrawerTitle>{t("container.title")}</DrawerTitle>
              <DrawerDescription>
                {t("container.description")}
              </DrawerDescription>
              <DrawerClose asChild className="self-end">
                <Button
                  variant="transparent"
                  size="icon"
                  aria-label={t("actions.close")}
                >
                  <HugeiconsIcon icon={Cancel01Icon} className="size-6" />
                </Button>
              </DrawerClose>
            </DrawerHeader>
            <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4">
              <ConferenceRegistrationForm
                eventId={eventId}
                onSuccess={() => {
                  setOpen(false);
                }}
              />
            </div>
          </DrawerContent>
        </Drawer>
      </>
    );
  }

  return (
    <>
      {triggerButton}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90dvh] overflow-y-auto">
          <DialogHeader className="mb-4">
            <DialogTitle>{t("container.title")}</DialogTitle>
            <DialogDescription>{t("container.description")}</DialogDescription>
          </DialogHeader>

          <ConferenceRegistrationForm
            eventId={eventId}
            onSuccess={() => {
              setOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
