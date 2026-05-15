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
} from "@/shared/components/ui/field";
import { Link } from "@/shared/components/ui/link";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { TypographyParagraph } from "@/shared/components/ui/typography-paragraph";
import {
  COLLEGE_YEAR_OPTIONS,
  HEARD_ABOUT_OPTIONS,
  SEX_OPTIONS,
} from "@/shared/lib/payload/constants/registrations";

import { useDatathonRegistrationIndividualForm } from "@/features/registration/hooks/use-datathon-registration-individual-form";

type Props = {
  eventId: number;
  closeDialog: () => void;
};

export function DatathonRegistrationIndividualForm({
  eventId,
  closeDialog,
}: Props) {
  const { form, handleSubmit, t } = useDatathonRegistrationIndividualForm({
    eventId,
    closeDialog,
  });

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="flex flex-col gap-5 md:p-8"
    >
      <FieldGroup>
        <div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
                    {...field}
                    id="lastName"
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
              name="sex"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="sex">{t("fields.sex.label")}</FieldLabel>

                  <Select
                    id="sex"
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger aria-invalid={fieldState.invalid}>
                      <SelectValue>
                        {(value) =>
                          typeof value === "string"
                            ? t(`fields.sex.options.${value}`)
                            : ""
                        }
                      </SelectValue>
                    </SelectTrigger>

                    <SelectContent>
                      {SEX_OPTIONS.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {t(`fields.sex.options.${item.value}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {fieldState.error?.message && (
                    <FieldError>{t(fieldState.error.message)}</FieldError>
                  )}
                </Field>
              )}
            />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">
                    {t("fields.email.label")}
                  </FieldLabel>

                  <Input
                    {...field}
                    id="email"
                    type="email"
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.error?.message && (
                    <FieldError>{t(fieldState.error.message)}</FieldError>
                  )}
                </Field>
              )}
            />

            <Controller
              name="nationalId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="nationalId">
                    {t("fields.national-id.label")}
                  </FieldLabel>

                  <Input
                    {...field}
                    id="nationalId"
                    type="text"
                    aria-invalid={fieldState.invalid}
                    onChange={(e) => {
                      field.onChange(e);
                      void form.trigger("nationalId");
                    }}
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
                    {...field}
                    id="phoneNumber"
                    type="tel"
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.error?.message && (
                    <FieldError>{t(fieldState.error.message)}</FieldError>
                  )}
                </Field>
              )}
            />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Controller
              name="universityName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="universityName">
                    {t("fields.university-name.label")}
                  </FieldLabel>

                  <Input
                    {...field}
                    id="universityName"
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
              name="major"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="major">
                    {t("fields.major.label")}
                  </FieldLabel>

                  <Input
                    {...field}
                    id="major"
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
              name="year"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="year">
                    {t("fields.year.label")}
                  </FieldLabel>

                  <Select
                    id="year"
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger aria-invalid={fieldState.invalid}>
                      <SelectValue>
                        {(value) =>
                          typeof value === "string"
                            ? t(`fields.year.options.${value}`)
                            : ""
                        }
                      </SelectValue>
                    </SelectTrigger>

                    <SelectContent>
                      {COLLEGE_YEAR_OPTIONS.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {t(`fields.year.options.${item.value}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {fieldState.error?.message && (
                    <FieldError>{t(fieldState.error.message)}</FieldError>
                  )}
                </Field>
              )}
            />
          </div>
        </div>

        <Controller
          name="heardAboutEvent"
          control={form.control}
          render={({ field, fieldState }) => (
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
                  <SelectValue>
                    {(value) =>
                      typeof value === "string"
                        ? t(`fields.heard-about-event.options.${value}`)
                        : ""
                    }
                  </SelectValue>
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
          )}
        />

        <Controller
          name="receiveNotifications"
          control={form.control}
          render={({ field, fieldState }) => (
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
          )}
        />

        <Controller
          name="acceptedTerms"
          control={form.control}
          render={({ field, fieldState }) => (
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
                  <Link href="/terms-and-conditions" target="_blank">
                    {t("fields.accepted-terms.label")}
                  </Link>
                </FieldLabel>
              </div>

              {fieldState.error?.message && (
                <FieldError>{t(fieldState.error.message)}</FieldError>
              )}
            </Field>
          )}
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
          variant="blue"
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
