import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import type { Locale } from "@/shared/lib/next-intl/types";
import {
  COLLEGE_YEAR_OPTIONS,
  HEARD_ABOUT_OPTIONS,
  SEX_OPTIONS,
} from "@/shared/lib/payload/constants/registrations";

import { registerForDatathonAction } from "@/features/registration/actions/register-for-datathon";
import { datathonRegistrationSchema } from "@/features/registration/schemas/datathon-registration";
import type { DatathonRegistrationValues } from "@/features/registration/types/datathon-registration";

interface Props {
  eventId: number;
  closeDialog: () => void;
}

const createDefaultMember = (isLeader = false) => ({
  isLeader,
  firstName: "",
  lastName: "",
  sex: SEX_OPTIONS[0].value,
  nationalId: "",
  email: "",
  phoneNumber: "",
  universityName: "",
  major: "",
  year: COLLEGE_YEAR_OPTIONS[0].value,
});

export const useDatathonRegistrationForm = ({
  eventId,
  closeDialog,
}: Props) => {
  const t = useTranslations("features.registration.datathon-form");
  const locale = useLocale() as Locale;

  const form = useForm<DatathonRegistrationValues>({
    resolver: zodResolver(datathonRegistrationSchema),
    defaultValues: {
      acceptedTerms: false,
      heardAboutEvent: HEARD_ABOUT_OPTIONS[0].value,
      members: [],
      allowIndividualsToJoin: false,
      receiveNotifications: false,
      teamName: "",
    },
  });

  const membersFieldArray = useFieldArray({
    control: form.control,
    name: "members",
  });

  const memberCount = useWatch({
    control: form.control,
    name: "memberCount",
  });

  useEffect(() => {
    const targetCount =
      typeof memberCount === "number" && Number.isFinite(memberCount)
        ? Math.max(0, Math.min(4, memberCount))
        : 0;

    const currentCount = membersFieldArray.fields.length;

    if (targetCount > currentCount) {
      for (let index = currentCount; index < targetCount; index += 1) {
        membersFieldArray.append(createDefaultMember(index === 0), {
          shouldFocus: false,
        });
      }
      return;
    }

    if (targetCount < currentCount) {
      membersFieldArray.remove(
        Array.from(
          { length: currentCount - targetCount },
          (_, index) => currentCount - 1 - index,
        ),
      );
    }
  }, [memberCount, membersFieldArray]);

  const handleSubmit = async (values: DatathonRegistrationValues) => {
    form.clearErrors();

    const { error } = await registerForDatathonAction(eventId, locale, values);

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
    memberCount,
    membersFieldArray,
    handleSubmit,
    t,
  };
};
