"use client";

import { useId, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";

import { Button } from "@/shared/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/shared/components/ui/field";
import {
  ATTENDANCE_MODES,
  HEARD_ABOUT_OPTIONS,
  PARTICIPANT_TYPES,
} from "@/shared/lib/payload/constants/registrations";

import { registerConferenceAction } from "../actions/conference-registration";
import { conferenceRegistrationSchema } from "../schemas/conference";
import { CONFERENCE_FORM_INPUT_CLASS_NAME } from "../constants/conference-registration";
import type { ConferenceRegistrationFormValues } from "../types/conference-registration-form";

type ConferenceRegistrationFormProps = {
  eventId: number;
  onSuccess?: () => void;
};

export function ConferenceRegistrationForm({
  eventId,
  onSuccess,
}: ConferenceRegistrationFormProps) {
  const [status, setStatus] = useState<"error" | "idle" | "success">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const t = useTranslations("features.registration.conference-form");
  const locale = useLocale();
  const participantTypeLegendId = useId();
  const attendanceModeLegendId = useId();

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ConferenceRegistrationFormValues>({
    resolver: zodResolver(conferenceRegistrationSchema),
    defaultValues: {
      acceptedTerms: false,
      attendanceMode: ATTENDANCE_MODES[0],
      email: "",
      firstName: "",
      heardAboutEvent: HEARD_ABOUT_OPTIONS[0].value,
      jobTitle: undefined,
      lastName: "",
      major: undefined,
      organizationName: undefined,
      participantType: PARTICIPANT_TYPES[0],
      phoneNumber: "",
      receiveNotifications: false,
      universityName: undefined,
    },
  });

  const participantType = useWatch({
    control,
    name: "participantType",
  });

  const onSubmit = handleSubmit(
    async (values) => {
      clearErrors();
      setStatus("idle");
      setStatusMessage("");

      const formData = new FormData();

      for (const [key, value] of Object.entries(values)) {
        if (typeof value === "boolean") {
          formData.set(key, value ? "on" : "false");
          continue;
        }

        if (typeof value === "string") {
          formData.set(key, value);
          continue;
        }

        if (value == null) {
          formData.set(key, "");
          continue;
        }

        formData.set(key, String(value));
      }

      formData.set("locale", locale);

      const result = await registerConferenceAction(eventId, {}, formData);

      if (result.error) {
        const errorKey = result.error.errorKeys?.[0] ?? "errors.unknown";

        setStatus("error");
        setStatusMessage(t(errorKey));

        if (result.error.fields && result.error.fields.length > 0) {
          result.error.fields.forEach((field) => {
            setError(field as never, {
              message: "validation.server-field",
              type: "server",
            });
          });
        }

        return;
      }

      setStatus("success");
      setStatusMessage(t("states.success"));
      reset();
      onSuccess?.();
    },
    () => {
      setStatus("error");
      setStatusMessage(t("errors.schema-validation"));
    },
  );

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      <FieldGroup>
        {status !== "idle" && (
          <p
            className={
              status === "success" ? "text-w-green-dark" : "text-destructive"
            }
            aria-live="polite"
          >
            {statusMessage}
          </p>
        )}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field data-invalid={Boolean(errors.firstName)}>
            <FieldLabel htmlFor="firstName">
              {t("fields.first-name.label")}
            </FieldLabel>
            <input
              id="firstName"
              type="text"
              {...register("firstName")}
              aria-invalid={Boolean(errors.firstName)}
              className={CONFERENCE_FORM_INPUT_CLASS_NAME}
            />
            {errors.firstName && (
              <FieldError>
                {t(errors.firstName.message ?? "validation.required")}
              </FieldError>
            )}
          </Field>

          <Field data-invalid={Boolean(errors.lastName)}>
            <FieldLabel htmlFor="lastName">
              {t("fields.last-name.label")}
            </FieldLabel>
            <input
              id="lastName"
              type="text"
              {...register("lastName")}
              aria-invalid={Boolean(errors.lastName)}
              className={CONFERENCE_FORM_INPUT_CLASS_NAME}
            />
            {errors.lastName && (
              <FieldError>
                {t(errors.lastName.message ?? "validation.required")}
              </FieldError>
            )}
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field data-invalid={Boolean(errors.email)}>
            <FieldLabel htmlFor="email">{t("fields.email.label")}</FieldLabel>
            <input
              id="email"
              type="email"
              {...register("email")}
              aria-invalid={Boolean(errors.email)}
              className={CONFERENCE_FORM_INPUT_CLASS_NAME}
            />
            {errors.email && (
              <FieldError>
                {t(errors.email.message ?? "validation.invalid-email")}
              </FieldError>
            )}
          </Field>

          <Field data-invalid={Boolean(errors.phoneNumber)}>
            <FieldLabel htmlFor="phoneNumber">
              {t("fields.phone-number.label")}
            </FieldLabel>
            <input
              id="phoneNumber"
              type="tel"
              {...register("phoneNumber")}
              aria-invalid={Boolean(errors.phoneNumber)}
              className={CONFERENCE_FORM_INPUT_CLASS_NAME}
            />
            {errors.phoneNumber && (
              <FieldError>
                {t(errors.phoneNumber.message ?? "validation.required")}
              </FieldError>
            )}
          </Field>
        </div>

        <FieldSet>
          <FieldLegend id={participantTypeLegendId}>
            {t("fields.participant-type.label")}
          </FieldLegend>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {PARTICIPANT_TYPES.map((option) => (
              <Field
                key={option}
                data-invalid={Boolean(errors.participantType)}
              >
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    value={option}
                    {...register("participantType")}
                  />
                  {t(`fields.participant-type.options.${option}`)}
                </label>
              </Field>
            ))}
          </div>
        </FieldSet>

        {participantType === "student" && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field data-invalid={Boolean(errors.universityName)}>
              <FieldLabel htmlFor="universityName">
                {t("fields.university-name.label")}
              </FieldLabel>
              <input
                id="universityName"
                type="text"
                {...register("universityName")}
                aria-invalid={Boolean(errors.universityName)}
                className={CONFERENCE_FORM_INPUT_CLASS_NAME}
              />
              {errors.universityName && (
                <FieldError>
                  {t(
                    errors.universityName.message ??
                      "validation.student-field-required",
                  )}
                </FieldError>
              )}
            </Field>

            <Field data-invalid={Boolean(errors.major)}>
              <FieldLabel htmlFor="major">{t("fields.major.label")}</FieldLabel>
              <input
                id="major"
                type="text"
                {...register("major")}
                aria-invalid={Boolean(errors.major)}
                className={CONFERENCE_FORM_INPUT_CLASS_NAME}
              />
              {errors.major && (
                <FieldError>
                  {t(
                    errors.major.message ?? "validation.student-field-required",
                  )}
                </FieldError>
              )}
            </Field>
          </div>
        )}

        {participantType === "professional" && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field data-invalid={Boolean(errors.organizationName)}>
              <FieldLabel htmlFor="organizationName">
                {t("fields.organization-name.label")}
              </FieldLabel>
              <input
                id="organizationName"
                type="text"
                {...register("organizationName")}
                aria-invalid={Boolean(errors.organizationName)}
                className={CONFERENCE_FORM_INPUT_CLASS_NAME}
              />
              {errors.organizationName && (
                <FieldError>
                  {t(
                    errors.organizationName.message ??
                      "validation.professional-field-required",
                  )}
                </FieldError>
              )}
            </Field>

            <Field data-invalid={Boolean(errors.jobTitle)}>
              <FieldLabel htmlFor="jobTitle">
                {t("fields.job-title.label")}
              </FieldLabel>
              <input
                id="jobTitle"
                type="text"
                {...register("jobTitle")}
                aria-invalid={Boolean(errors.jobTitle)}
                className={CONFERENCE_FORM_INPUT_CLASS_NAME}
              />
              {errors.jobTitle && (
                <FieldError>
                  {t(
                    errors.jobTitle.message ??
                      "validation.professional-field-required",
                  )}
                </FieldError>
              )}
            </Field>
          </div>
        )}

        <FieldSet>
          <FieldLegend id={attendanceModeLegendId}>
            {t("fields.attendance-mode.label")}
          </FieldLegend>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {ATTENDANCE_MODES.map((option) => (
              <Field key={option} data-invalid={Boolean(errors.attendanceMode)}>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    value={option}
                    {...register("attendanceMode")}
                  />
                  {t(`fields.attendance-mode.options.${option}`)}
                </label>
              </Field>
            ))}
          </div>
        </FieldSet>

        <Field data-invalid={Boolean(errors.heardAboutEvent)}>
          <FieldLabel htmlFor="heardAboutEvent">
            {t("fields.heard-about-event.label")}
          </FieldLabel>
          <select
            id="heardAboutEvent"
            {...register("heardAboutEvent")}
            aria-invalid={Boolean(errors.heardAboutEvent)}
            className={CONFERENCE_FORM_INPUT_CLASS_NAME}
          >
            {HEARD_ABOUT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {t(`fields.heard-about-event.options.${option.value}`)}
              </option>
            ))}
          </select>
          {errors.heardAboutEvent && (
            <FieldError>
              {t(errors.heardAboutEvent.message ?? "validation.required")}
            </FieldError>
          )}
        </Field>

        <Field data-invalid={Boolean(errors.receiveNotifications)}>
          <label className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              {...register("receiveNotifications")}
              aria-invalid={Boolean(errors.receiveNotifications)}
            />
            <span>{t("fields.receive-notifications.label")}</span>
          </label>
          <FieldDescription>
            {t("fields.receive-notifications.description")}
          </FieldDescription>
        </Field>

        <Field data-invalid={Boolean(errors.acceptedTerms)}>
          <label className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              {...register("acceptedTerms")}
              aria-invalid={Boolean(errors.acceptedTerms)}
            />
            <span>{t("fields.accepted-terms.label")}</span>
          </label>
          {errors.acceptedTerms && (
            <FieldError>
              {t(
                errors.acceptedTerms.message ??
                  "validation.accepted-terms-required",
              )}
            </FieldError>
          )}
        </Field>

        <Button
          type="submit"
          variant="green-dark"
          disabled={isSubmitting}
          className="self-center md:self-end"
        >
          {isSubmitting ? t("states.submitting") : t("actions.submit")}
        </Button>
      </FieldGroup>
    </form>
  );
}
