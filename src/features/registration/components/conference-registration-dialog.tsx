"use client";

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
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/shared/components/ui/drawer";

import { ConferenceRegistrationForm } from "@/features/registration/components/conference-registration-form";
import { useConferenceRegistrationCta } from "@/features/registration/hooks/use-conference-registration-cta";

type Props = {
  ctaLabel: string;
  eventId: number;
};

export function ConferenceRegistrationDialog({ ctaLabel, eventId }: Props) {
  const { open, setOpen, isMobile, t } = useConferenceRegistrationCta();

  const triggerButton = (
    <Button
      variant="green-light"
      className="self-start"
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
          <DrawerContent>
            <DrawerHeader className="mb-8">
              <DrawerTitle>{t("container.title")}</DrawerTitle>

              <DrawerDescription>
                {t("container.description")}
              </DrawerDescription>
            </DrawerHeader>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4">
              <ConferenceRegistrationForm
                eventId={eventId}
                closeDialog={() => setOpen(false)}
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
          <DialogHeader className="p-8">
            <DialogTitle>{t("container.title")}</DialogTitle>
            <DialogDescription>{t("container.description")}</DialogDescription>
          </DialogHeader>

          <ConferenceRegistrationForm
            eventId={eventId}
            closeDialog={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
