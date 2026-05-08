import { useState } from "react";
import { useTranslations } from "next-intl";

import { useIsMobile } from "@/shared/hooks/use-is-mobile";

export const useConferenceRegistrationCta = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const t = useTranslations("features.registration.conference-form");

  return {
    open,
    setOpen,
    isMobile,
    t,
  };
};
