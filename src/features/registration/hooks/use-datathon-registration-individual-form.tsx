import { useLocale, useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { Locale } from "@/shared/lib/next-intl/types";
import {
  COLLEGE_YEAR_OPTIONS,
  HEARD_ABOUT_OPTIONS,
  SEX_OPTIONS,
} from "@/shared/lib/payload/constants/registrations";

import { registerForDatathonIndividualAction } from "@/features/registration/actions/register-for-datathon-individual";
import { datathonRegistrationIndividualSchema } from "@/features/registration/schemas/datathon-registration-individuals";
import type { DatathonRegistrationIndividualValues } from "@/features/registration/types/datathon-registration-individuals";

interface Props {
  eventId: number;
  closeDialog: () => void;
}

export const useDatathonRegistrationIndividualForm = ({
  eventId,
  closeDialog,
}: Props) => {
  const t = useTranslations("features.registration.datathon-individual-form");
  const locale = useLocale() as Locale;

  const form = useForm<DatathonRegistrationIndividualValues>({
    resolver: zodResolver(datathonRegistrationIndividualSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      sex: SEX_OPTIONS[0].value,
      nationalId: "",
      email: "",
      phoneNumber: "",
      universityName: "",
      major: "",
      year: COLLEGE_YEAR_OPTIONS[0].value,
      heardAboutEvent: HEARD_ABOUT_OPTIONS[0].value,
      receiveNotifications: false,
      acceptedTerms: false,
    },
  });

  const handleSubmit = async (values: DatathonRegistrationIndividualValues) => {
    form.clearErrors();

    const { error } = await registerForDatathonIndividualAction(
      eventId,
      locale,
      values,
    );

    if (error) {
      switch (error.code) {
        case "SCHEMA_VALIDATION":
          form.setError("root.serverError", {
            message: "errors.schema-validation",
          });
          return;
        case "UNIQUE_EMAIL":
          form.setError("root.serverError", {
            message: "validation.email-duplicate",
          });
          return;
        case "UNIQUE_PHONE_NUMBER":
          form.setError("root.serverError", {
            message: "validation.phone-number-duplicate",
          });
          return;
        case "UNIQUE_TEAM_NAME":
          form.setError("root.serverError", {
            message: "validation.team-name-duplicate",
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
    handleSubmit,
    t,
  };
};
