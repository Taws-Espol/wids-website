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
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/shared/components/ui/field";

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
          <DrawerContent className="px-6">
            <DrawerHeader>
              <DrawerTitle>{t("title")}</DrawerTitle>

              <DrawerDescription>{t("description")}</DrawerDescription>
            </DrawerHeader>

            <FieldSet className="w-full max-w-xs px-4 pb-8">
              <FieldLegend variant="label">
                {isIndividual ? t("team.cta") : t("individual.cta")}
              </FieldLegend>
              <FieldDescription>
                {isIndividual
                  ? t("team.description")
                  : t("individual.description")}
              </FieldDescription>
              <RadioGroup
                defaultValue="team"
                onValueChange={(value) =>
                  setIsIndividual(value === "individual")
                }
              >
                <Field orientation="horizontal">
                  <RadioGroupItem value="team" id="team" />
                  <FieldLabel htmlFor="team" className="font-normal">
                    Team
                  </FieldLabel>
                </Field>
                <Field orientation="horizontal">
                  <RadioGroupItem value="individual" id="individual" />
                  <FieldLabel htmlFor="individual" className="font-normal">
                    Individual
                  </FieldLabel>
                </Field>
              </RadioGroup>
            </FieldSet>

            {isIndividual && (
              <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4">
                <DatathonRegistrationIndividualForm
                  eventId={eventId}
                  closeDialog={() => setOpen(false)}
                />
              </div>
            )}

            {!isIndividual && (
              <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4">
                <DatathonRegistrationForm
                  eventId={eventId}
                  closeDialog={() => setOpen(false)}
                />
              </div>
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

          <FieldSet className="w-full px-8 pb-8">
            <FieldLegend variant="label">
              {isIndividual ? t("team.cta") : t("individual.cta")}
            </FieldLegend>
            <FieldDescription>
              {isIndividual
                ? t("team.description")
                : t("individual.description")}
            </FieldDescription>
            <RadioGroup
              defaultValue="team"
              onValueChange={(value) => setIsIndividual(value === "individual")}
            >
              <Field orientation="horizontal">
                <RadioGroupItem value="team" id="team" />
                <FieldLabel htmlFor="team" className="font-normal">
                  Team
                </FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <RadioGroupItem value="individual" id="individual" />
                <FieldLabel htmlFor="individual" className="font-normal">
                  Individual
                </FieldLabel>
              </Field>
            </RadioGroup>
          </FieldSet>

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
