import { useState } from "react";
import { useTranslations } from "next-intl";

import { useIsMobile } from "@/shared/hooks/use-is-mobile";

export const useDatathonRegistrationDialog = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const t = useTranslations("features.registration.datathon-dialog");
  const [isIndividual, setIsIndividual] = useState(false);

  return {
    open,
    setOpen,
    isMobile,
    isIndividual,
    setIsIndividual,
    t,
  };
};
