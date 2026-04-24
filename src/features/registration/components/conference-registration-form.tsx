"use client";

import { Controller } from "react-hook-form";

import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  ATTENDANCE_MODES,
  HEARD_ABOUT_OPTIONS,
  PARTICIPANT_TYPES,
} from "@/shared/lib/payload/constants/registrations";

import { useConferenceRegistrationForm } from "@/features/registration/hooks/use-conference-registration-form";
import { TypographyParagraph } from "@/shared/components/ui/typography-paragraph";

type Props = {
  eventId: number;
  closeDialog: () => void;
};

export function ConferenceRegistrationForm({ eventId, closeDialog }: Props) {
  const { form, participantType, handleSubmit, t } =
    useConferenceRegistrationForm({ eventId, closeDialog });

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="flex flex-col gap-5 md:p-8"
    >
      <FieldGroup>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Controller
            name="firstName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="firstName">
                  {t("fields.first-name.label")}
                </FieldLabel>

                <Input
                  {...field}
                  id="firstName"
                  type="text"
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.error?.message && (
                  <FieldError>{t(fieldState.error.message)}</FieldError>
                )}
              </Field>
            )}
          />

          <Controller
            name="lastName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="lastName">
                  {t("fields.last-name.label")}
                </FieldLabel>

                <Input
                  id="lastName"
                  type="text"
                  {...field}
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.error?.message && (
                  <FieldError>{t(fieldState.error.message)}</FieldError>
                )}
              </Field>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">
                  {t("fields.email.label")}
                </FieldLabel>

                <Input
                  id="email"
                  type="email"
                  {...field}
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.error?.message && (
                  <FieldError>{t(fieldState.error.message)}</FieldError>
                )}
              </Field>
            )}
          />

          <Controller
            name="phoneNumber"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="phoneNumber">
                  {t("fields.phone-number.label")}
                </FieldLabel>

                <Input
                  id="phoneNumber"
                  type="tel"
                  {...field}
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.error?.message && (
                  <FieldError>{t(fieldState.error.message)}</FieldError>
                )}
              </Field>
            )}
          />
        </div>

        <Controller
          name="participantType"
          control={form.control}
          render={({ field, fieldState }) => {
            return (
              <FieldSet
                className="w-full max-w-xs"
                data-invalid={fieldState.invalid}
              >
                <FieldLegend className="w-full">
                  {t("fields.participant-type.label")}
                </FieldLegend>

                <FieldDescription>
                  {t("fields.participant-type.description")}
                </FieldDescription>

                <RadioGroup
                  id="participantType"
                  {...field}
                  onValueChange={(value) => {
                    field.onChange(value);

                    if (value === "student") {
                      form.setValue("organizationName", "");
                      form.setValue("jobTitle", "");
                      form.clearErrors(["organizationName", "jobTitle"]);
                    }

                    if (value === "professional") {
                      form.setValue("universityName", "");
                      form.setValue("major", "");
                      form.clearErrors(["universityName", "major"]);
                    }
                  }}
                  aria-invalid={fieldState.invalid}
                >
                  {PARTICIPANT_TYPES.map((option) => (
                    <div
                      key={option}
                      className="flex w-full min-w-0 items-center gap-2"
                    >
                      <RadioGroupItem
                        value={option}
                        id={`participantType-${option}`}
                      />
                      <FieldLabel
                        className="font-normal"
                        htmlFor={`participantType-${option}`}
                      >
                        {t(`fields.participant-type.options.${option}`)}
                      </FieldLabel>
                    </div>
                  ))}
                </RadioGroup>

                {fieldState.error?.message && (
                  <FieldError>{t(fieldState.error.message)}</FieldError>
                )}
              </FieldSet>
            );
          }}
        />

        {participantType === "student" && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Controller
              name="universityName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="universityName">
                    {t("fields.university-name.label")}
                  </FieldLabel>

                  <Input
                    id="universityName"
                    type="text"
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.error?.message && (
                    <FieldError>{t(fieldState.error.message)}</FieldError>
                  )}
                </Field>
              )}
            />

            <Controller
              name="major"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="major">
                    {t("fields.major.label")}
                  </FieldLabel>

                  <Input
                    id="major"
                    type="text"
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.error?.message && (
                    <FieldError>{t(fieldState.error.message)}</FieldError>
                  )}
                </Field>
              )}
            />
          </div>
        )}

        {participantType === "professional" && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Controller
              name="organizationName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="organizationName">
                    {t("fields.organization-name.label")}
                  </FieldLabel>

                  <Input
                    id="organizationName"
                    type="text"
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.error?.message && (
                    <FieldError>{t(fieldState.error.message)}</FieldError>
                  )}
                </Field>
              )}
            />

            <Controller
              name="jobTitle"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="jobTitle">
                    {t("fields.job-title.label")}
                  </FieldLabel>

                  <Input
                    id="jobTitle"
                    type="text"
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.error?.message && (
                    <FieldError>{t(fieldState.error.message)}</FieldError>
                  )}
                </Field>
              )}
            />
          </div>
        )}

        <Controller
          name="attendanceMode"
          control={form.control}
          render={({ field, fieldState }) => {
            return (
              <FieldSet
                className="w-full max-w-xs"
                data-invalid={fieldState.invalid}
              >
                <FieldLegend className="w-full">
                  {t("fields.attendance-mode.label")}
                </FieldLegend>

                <FieldDescription>
                  {t("fields.attendance-mode.description")}
                </FieldDescription>
                <RadioGroup
                  id="attendanceMode"
                  {...field}
                  aria-invalid={fieldState.invalid}
                >
                  {ATTENDANCE_MODES.map((option) => (
                    <div
                      key={option}
                      className="flex w-full min-w-0 items-center gap-2"
                    >
                      <RadioGroupItem
                        value={option}
                        id={`attendanceMode-${option}`}
                      />
                      <FieldLabel
                        className="font-normal"
                        htmlFor={`attendanceMode-${option}`}
                      >
                        {t(`fields.attendance-mode.options.${option}`)}
                      </FieldLabel>
                    </div>
                  ))}
                </RadioGroup>

                {fieldState.error?.message && (
                  <FieldError>{t(fieldState.error.message)}</FieldError>
                )}
              </FieldSet>
            );
          }}
        />

        <Controller
          name="heardAboutEvent"
          control={form.control}
          render={({ field, fieldState }) => {
            return (
              <Field
                className="w-full max-w-xs"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel htmlFor="heardAboutEvent">
                  {t("fields.heard-about-event.label")}
                </FieldLabel>

                <Select
                  id="heardAboutEvent"
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    className="w-full"
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    {HEARD_ABOUT_OPTIONS.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {t(`fields.heard-about-event.options.${item.value}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FieldDescription>
                  {t("fields.heard-about-event.description")}
                </FieldDescription>

                {fieldState.error?.message && (
                  <FieldError>{t(fieldState.error.message)}</FieldError>
                )}
              </Field>
            );
          }}
        />

        <Controller
          name="receiveNotifications"
          control={form.control}
          render={({ field, fieldState }) => {
            return (
              <Field
                className="w-full max-w-xs"
                data-invalid={fieldState.invalid}
              >
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="receiveNotifications"
                    name={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                  />
                  <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                    <FieldLabel
                      className="font-normal"
                      htmlFor="receiveNotifications"
                    >
                      {t("fields.receive-notifications.label")}
                    </FieldLabel>

                    <FieldDescription>
                      {t("fields.receive-notifications.description")}
                    </FieldDescription>
                  </div>
                </div>
              </Field>
            );
          }}
        />

        <Controller
          name="acceptedTerms"
          control={form.control}
          render={({ field, fieldState }) => {
            return (
              <Field
                className="w-full max-w-xs"
                data-invalid={fieldState.invalid}
              >
                <div className="flex w-full min-w-0 items-start gap-2">
                  <Checkbox
                    id="acceptedTerms"
                    name={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                  />
                  <FieldLabel className="font-normal" htmlFor="acceptedTerms">
                    {t("fields.accepted-terms.label")}
                  </FieldLabel>
                </div>

                {fieldState.error?.message && (
                  <FieldError>{t(fieldState.error.message)}</FieldError>
                )}
              </Field>
            );
          }}
        />

        {form.formState.errors.root?.serverError?.message && (
          <TypographyParagraph
            role="alert"
            className="border-destructive/40 bg-destructive/10 text-destructive rounded-md border px-3 py-2 text-sm"
          >
            {t(form.formState.errors.root.serverError.message)}
          </TypographyParagraph>
        )}

        <Button
          type="submit"
          variant="green-dark"
          disabled={form.formState.isSubmitting}
          className="mt-4 w-full self-center md:w-auto md:self-end"
        >
          {form.formState.isSubmitting
            ? t("states.submitting")
            : t("actions.submit")}
        </Button>
      </FieldGroup>
    </form>
  );
}
