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

import { DatathonRegistrationForm } from "@/features/registration/components/datathon-registration-form";
import { DatathonRegistrationIndividualForm } from "@/features/registration/components/datathon-registration-individual-form";
import { useDatathonRegistrationDialog } from "@/features/registration/hooks/use-datathon-registration-dialog";

type Props = {
  ctaLabel: string;
  eventId: number;
  eventDate: string;
};

export function DatathonRegistrationDialog({
  ctaLabel,
  eventId,
  eventDate,
}: Props) {
  const { open, setOpen, isMobile, t, isIndividual, setIsIndividual } =
    useDatathonRegistrationDialog();

  if (new Date(eventDate) <= new Date()) return null;

  const triggerButton = (
    <Button variant="blue" className="self-start" onClick={() => setOpen(true)}>
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
              <DrawerTitle>{t("title")}</DrawerTitle>

              <DrawerDescription>{t("description")}</DrawerDescription>
            </DrawerHeader>

            <div className="flex items-center gap-2 px-8 pb-4">
              <span className="text-sm">
                {isIndividual ? t("team.cta") : t("individual.cta")}
              </span>
              <span
                aria-checked={isIndividual}
                role="switch"
                className="text-muted-foreground cursor-pointer text-sm hover:underline"
                onClick={() => setIsIndividual((value) => !value)}
              >
                {isIndividual
                  ? t("team.description")
                  : t("individual.description")}
              </span>
            </div>

            {isIndividual && (
              <DatathonRegistrationIndividualForm
                eventId={eventId}
                closeDialog={() => setOpen(false)}
              />
            )}

            {!isIndividual && (
              <DatathonRegistrationForm
                eventId={eventId}
                closeDialog={() => setOpen(false)}
              />
            )}
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
            <DialogTitle>{t("title")}</DialogTitle>
            <DialogDescription>{t("description")}</DialogDescription>
          </DialogHeader>

          <div className="flex items-center gap-2 px-8 pb-4">
            <span className="text-sm">
              {isIndividual ? t("team.cta") : t("individual.cta")}
            </span>
            <span
              aria-checked={isIndividual}
              role="switch"
              className="text-muted-foreground cursor-pointer text-sm hover:underline"
              onClick={() => setIsIndividual((value) => !value)}
            >
              {isIndividual
                ? t("team.description")
                : t("individual.description")}
            </span>
          </div>

          {isIndividual && (
            <DatathonRegistrationIndividualForm
              eventId={eventId}
              closeDialog={() => setOpen(false)}
            />
          )}

          {!isIndividual && (
            <DatathonRegistrationForm
              eventId={eventId}
              closeDialog={() => setOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
