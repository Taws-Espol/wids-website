import { createTranslator } from "next-intl";

import type { Locale } from "@/shared/lib/next-intl/types";

export async function getEmailSubject(
  locale: Locale,
  namespace: string,
): Promise<string> {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({
    locale,
    messages,
    namespace,
  });

  return t("subject");
}
