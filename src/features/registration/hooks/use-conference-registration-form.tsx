import { useLocale, useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import type { Locale } from "@/shared/lib/next-intl/types";
import {
  ATTENDANCE_MODES,
  HEARD_ABOUT_OPTIONS,
  PARTICIPANT_TYPES,
} from "@/shared/lib/payload/constants/registrations";

import { registerForConferenceAction } from "@/features/registration/actions/register-for-conference";
import { conferenceRegistrationSchema } from "@/features/registration/schemas/conference-registration";
import type { ConferenceRegistrationValues } from "@/features/registration/types/conference-registration";

interface Props {
  eventId: number;
  closeDialog: () => void;
}

export const useConferenceRegistrationForm = ({
  eventId,
  closeDialog,
}: Props) => {
  const t = useTranslations("features.registration.conference-form");
  const locale = useLocale() as Locale;

  const form = useForm<ConferenceRegistrationValues>({
    resolver: zodResolver(conferenceRegistrationSchema),
    defaultValues: {
      acceptedTerms: false,
      attendanceMode: ATTENDANCE_MODES[0],
      email: "",
      firstName: "",
      heardAboutEvent: HEARD_ABOUT_OPTIONS[0].value,
      jobTitle: "",
      lastName: "",
      major: "",
      organizationName: "",
      participantType: PARTICIPANT_TYPES[0],
      phoneNumber: "",
      receiveNotifications: false,
      universityName: "",
    },
  });

  const participantType = useWatch({
    control: form.control,
    name: "participantType",
  });

  const handleSubmit = async (values: ConferenceRegistrationValues) => {
    form.clearErrors();

    const payload: ConferenceRegistrationValues =
      values.participantType === "student"
        ? { ...values, organizationName: undefined, jobTitle: undefined }
        : { ...values, universityName: undefined, major: undefined };

    const { error } = await registerForConferenceAction(
      eventId,
      locale,
      payload,
    );

    if (error) {
      switch (error.code) {
        case "SCHEMA_VALIDATION":
          form.setError("root.serverError", {
            message: "errors.schema-validation",
          });
          return;
        case "UNIQUE_EMAIL":
          form.setError("email", {
            message: "validation.email-duplicate",
          });
          return;
        case "UNIQUE_PHONE_NUMBER":
          form.setError("phoneNumber", {
            message: "validation.phone-number-duplicate",
          });
          return;
        case "PAYLOAD_VALIDATION":
          form.setError("root.serverError", {
            message: "errors.payload-validation",
          });
          return;
        case "UNKNOWN":
          form.setError("root.serverError", {
            message: "errors.unknown",
          });
          return;
        default:
          form.setError("root.serverError", {
            message: "errors.unknown",
          });
          return;
      }
    }

    toast.success(t("states.success"));
    closeDialog();
  };

  return {
    form,
    participantType,
    handleSubmit,
    t,
  };
};
