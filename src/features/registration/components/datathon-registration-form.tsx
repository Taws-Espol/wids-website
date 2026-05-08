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
  FieldSet,
} from "@/shared/components/ui/field";
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

import { useDatathonRegistrationForm } from "@/features/registration/hooks/use-datathon-registration-form";

type Props = {
  eventId: number;
  closeDialog: () => void;
};

export function DatathonRegistrationForm({ eventId, closeDialog }: Props) {
  const { form, membersFieldArray, handleSubmit, t } =
    useDatathonRegistrationForm({
      eventId,
      closeDialog,
    });

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="flex flex-col gap-5 md:p-8"
    >
      <FieldGroup>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Controller
            name="teamName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="teamName">
                  {t("fields.team-name.label")}
                </FieldLabel>

                <Input
                  {...field}
                  id="teamName"
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
            name="memberCount"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="memberCount">
                  {t("fields.member-count.label")}
                </FieldLabel>

                <Input
                  id="memberCount"
                  type="number"
                  min={1}
                  max={3}
                  value={field.value ?? ""}
                  onChange={(event) => {
                    const nextValue = event.target.value;

                    if (nextValue === "") {
                      field.onChange(null);
                      return;
                    }

                    const parsedValue = Number(nextValue);
                    field.onChange(
                      Number.isNaN(parsedValue)
                        ? null
                        : Math.min(3, parsedValue),
                    );
                  }}
                  aria-invalid={fieldState.invalid}
                />

                <FieldDescription>
                  {t("fields.member-count.description")}
                </FieldDescription>

                {fieldState.error?.message && (
                  <FieldError>{t(fieldState.error.message)}</FieldError>
                )}
              </Field>
            )}
          />
        </div>

        {membersFieldArray.fields.length > 0 && (
          <FieldSet>
            <div className="mb-2 text-sm font-medium">
              {t("fields.members.label")}
            </div>

            <div className="flex flex-col gap-8">
              {membersFieldArray.fields.map((member, index) => (
                <div
                  key={member.id}
                  className="rounded-md border border-slate-200 p-4"
                >
                  <div className="mb-4 text-sm font-medium">
                    {t("fields.members.member-title", {
                      index: index + 1,
                    })}
                  </div>

                  <Controller
                    name={`members.${index}.isLeader` as const}
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field
                        className="mb-4 w-full max-w-xs"
                        data-invalid={fieldState.invalid}
                      >
                        <div className="flex w-full min-w-0 items-start gap-2">
                          <Checkbox
                            id={`members.${index}.isLeader`}
                            name={field.name}
                            checked={field.value}
                            onCheckedChange={(checked) => {
                              if (checked === true) {
                                membersFieldArray.fields.forEach((_, idx) => {
                                  form.setValue(
                                    `members.${idx}.isLeader`,
                                    idx === index,
                                    {
                                      shouldDirty: true,
                                      shouldValidate: true,
                                    },
                                  );
                                });
                                return;
                              }

                              field.onChange(false);
                            }}
                            aria-invalid={fieldState.invalid}
                          />
                          <FieldLabel
                            className="font-normal"
                            htmlFor={`members.${index}.isLeader`}
                          >
                            {t("fields.members.is-leader.label")}
                          </FieldLabel>
                        </div>
                      </Field>
                    )}
                  />

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Controller
                      name={`members.${index}.firstName` as const}
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={`members.${index}.firstName`}>
                            {t("fields.members.first-name.label")}
                          </FieldLabel>

                          <Input
                            {...field}
                            id={`members.${index}.firstName`}
                            type="text"
                            aria-invalid={fieldState.invalid}
                          />

                          {fieldState.error?.message && (
                            <FieldError>
                              {t(fieldState.error.message)}
                            </FieldError>
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name={`members.${index}.lastName` as const}
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={`members.${index}.lastName`}>
                            {t("fields.members.last-name.label")}
                          </FieldLabel>

                          <Input
                            {...field}
                            id={`members.${index}.lastName`}
                            type="text"
                            aria-invalid={fieldState.invalid}
                          />

                          {fieldState.error?.message && (
                            <FieldError>
                              {t(fieldState.error.message)}
                            </FieldError>
                          )}
                        </Field>
                      )}
                    />
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Controller
                      name={`members.${index}.sex` as const}
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={`members.${index}.sex`}>
                            {t("fields.members.sex.label")}
                          </FieldLabel>

                          <Select
                            id={`members.${index}.sex`}
                            name={field.name}
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger aria-invalid={fieldState.invalid}>
                              <SelectValue>
                                {(value) =>
                                  typeof value === "string"
                                    ? t(`fields.members.sex.options.${value}`)
                                    : ""
                                }
                              </SelectValue>
                            </SelectTrigger>

                            <SelectContent>
                              {SEX_OPTIONS.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                  {t(
                                    `fields.members.sex.options.${item.value}`,
                                  )}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          {fieldState.error?.message && (
                            <FieldError>
                              {t(fieldState.error.message)}
                            </FieldError>
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name={`members.${index}.year` as const}
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={`members.${index}.year`}>
                            {t("fields.members.year.label")}
                          </FieldLabel>

                          <Select
                            id={`members.${index}.year`}
                            name={field.name}
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger aria-invalid={fieldState.invalid}>
                              <SelectValue>
                                {(value) =>
                                  typeof value === "string"
                                    ? t(`fields.members.year.options.${value}`)
                                    : ""
                                }
                              </SelectValue>
                            </SelectTrigger>

                            <SelectContent>
                              {COLLEGE_YEAR_OPTIONS.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                  {t(
                                    `fields.members.year.options.${item.value}`,
                                  )}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          {fieldState.error?.message && (
                            <FieldError>
                              {t(fieldState.error.message)}
                            </FieldError>
                          )}
                        </Field>
                      )}
                    />
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Controller
                      name={`members.${index}.email` as const}
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={`members.${index}.email`}>
                            {t("fields.members.email.label")}
                          </FieldLabel>

                          <Input
                            {...field}
                            id={`members.${index}.email`}
                            type="email"
                            aria-invalid={fieldState.invalid}
                          />

                          {fieldState.error?.message && (
                            <FieldError>
                              {t(fieldState.error.message)}
                            </FieldError>
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name={`members.${index}.phoneNumber` as const}
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={`members.${index}.phoneNumber`}>
                            {t("fields.members.phone-number.label")}
                          </FieldLabel>

                          <Input
                            {...field}
                            id={`members.${index}.phoneNumber`}
                            type="tel"
                            aria-invalid={fieldState.invalid}
                          />

                          {fieldState.error?.message && (
                            <FieldError>
                              {t(fieldState.error.message)}
                            </FieldError>
                          )}
                        </Field>
                      )}
                    />
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Controller
                      name={`members.${index}.universityName` as const}
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel
                            htmlFor={`members.${index}.universityName`}
                          >
                            {t("fields.members.university-name.label")}
                          </FieldLabel>

                          <Input
                            {...field}
                            id={`members.${index}.universityName`}
                            type="text"
                            aria-invalid={fieldState.invalid}
                          />

                          {fieldState.error?.message && (
                            <FieldError>
                              {t(fieldState.error.message)}
                            </FieldError>
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name={`members.${index}.major` as const}
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={`members.${index}.major`}>
                            {t("fields.members.major.label")}
                          </FieldLabel>

                          <Input
                            {...field}
                            id={`members.${index}.major`}
                            type="text"
                            aria-invalid={fieldState.invalid}
                          />

                          {fieldState.error?.message && (
                            <FieldError>
                              {t(fieldState.error.message)}
                            </FieldError>
                          )}
                        </Field>
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>

            {typeof form.formState.errors.members?.message === "string" && (
              <FieldError>
                {t(form.formState.errors.members.message)}
              </FieldError>
            )}
          </FieldSet>
        )}

        <Controller
          name="bankVoucher"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="w-full" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="bankVoucher">
                {t("fields.bank-voucher.label")}
              </FieldLabel>

              <Input
                id="bankVoucher"
                type="file"
                accept="application/pdf,image/jpeg,image/jpg,image/png,image/webp"
                onChange={(event) => {
                  const file = event.target.files?.[0] ?? null;
                  field.onChange(file);
                }}
                aria-invalid={fieldState.invalid}
              />

              <FieldDescription>
                {t("fields.bank-voucher.description")}
              </FieldDescription>

              {fieldState.error?.message && (
                <FieldError>{t(fieldState.error.message)}</FieldError>
              )}
            </Field>
          )}
        />

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
                  {t("fields.accepted-terms.label")}
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
