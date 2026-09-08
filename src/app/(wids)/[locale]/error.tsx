"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

import { PageMessage } from "@/shared/components/page-message";
import { Button } from "@/shared/components/ui/button";

/**
 * Catches render errors in this segment so they land inside the site chrome
 * rather than on Next's built-in 500 page, which renders its own document
 * without the site's styles or fonts.
 *
 * `retry` rather than `reset`: it re-fetches and re-renders the boundary's
 * children, where `reset` only clears the error state. Next 16.3 made `retry`
 * stable and the docs recommend it in most cases.
 *
 * `error.message` is deliberately not rendered. For errors thrown on the
 * server it is a generic digest in production anyway, and in development it can
 * carry internals that do not belong on screen.
 */
export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  const t = useTranslations("shared.error");

  useEffect(() => {
    // The digest is what ties this screen to the server-side log entry.
    console.error(error);
  }, [error]);

  return (
    <main>
      <PageMessage
        title={t("title")}
        description={t("description")}
        action={<Button onClick={retry}>{t("cta")}</Button>}
      />
    </main>
  );
}
