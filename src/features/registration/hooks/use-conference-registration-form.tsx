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
import { mapConferenceRegistrationError } from "@/features/registration/utils/map-conference-registration-error";
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
      for (const { field, message } of mapConferenceRegistrationError(
        error.code,
        form.getValues(),
      )) {
        form.setError(field, { message });
      }

      return;
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
