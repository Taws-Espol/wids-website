import { cacheTag } from "next/cache";
import { setRequestLocale } from "next-intl/server";
import { LANDING_TAG } from "@/shared/constants/cache-tags";
import type { Locale } from "@/shared/lib/next-intl/types";

export default async function Conference({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  "use cache";

  const { locale } = await params;

  setRequestLocale(locale);
  cacheTag(LANDING_TAG);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-10 px-6 py-16">
      conference
    </main>
  );
}
