import type { ReactElement, ReactNode } from "react";
import { createTranslator } from "next-intl";
import { render } from "react-email";

import type { Locale } from "@/shared/lib/next-intl/types";

import type { EmailTheme } from "./email-theme";
import { TransactionalEmail } from "./transactional-email";

export type EmailTranslator = {
  (key: string): string;
  has: (key: string) => boolean;
};

/**
 * Everything that distinguishes one transactional email from another. The
 * namespace is declared here once — the subject line and the body are both
 * read from it, so they cannot drift apart.
 */
export type EmailDefinition<TData> = {
  namespace: string;
  theme: EmailTheme;
  getPixelUrl?: () => string;
  children?: (t: EmailTranslator, data: TData) => ReactNode;
};

type Options<TData> = {
  definition: EmailDefinition<TData>;
  locale: Locale;
  name: string;
  ctaHref: string;
  data: TData;
};

export async function buildTransactionalEmail<TData>({
  definition,
  locale,
  name,
  ctaHref,
  data,
}: Options<TData>): Promise<{ subject: string; element: ReactElement }> {
  const messages = (await import(`../../../../messages/${locale}.json`))
    .default;

  const t = createTranslator({
    locale,
    messages,
    namespace: definition.namespace,
  }) as unknown as EmailTranslator;

  const element = (
    <TransactionalEmail
      copy={{
        preview: t("preview"),
        heading: t("heading"),
        greeting: t("greeting"),
        description: t("description"),
        emphasis: t.has("emphasis") ? t("emphasis") : undefined,
        cta: t("cta"),
        copyAndPasteLabel: t("copy-and-paste-label"),
        footerNote: t("footer-note"),
      }}
      name={name}
      ctaHref={ctaHref}
      theme={definition.theme}
      pixelUrl={definition.getPixelUrl?.()}
    >
      {definition.children?.(t, data)}
    </TransactionalEmail>
  );

  return { subject: t("subject"), element };
}

export async function renderTransactionalEmail<TData>(
  options: Options<TData>,
): Promise<{ subject: string; html: string }> {
  const { subject, element } = await buildTransactionalEmail(options);

  return { subject, html: await render(element) };
}
