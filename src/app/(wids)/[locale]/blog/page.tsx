import { cacheTag } from "next/cache";
import { setRequestLocale } from "next-intl/server";
import { BLOG_TAG } from "@/shared/constants/cache-tags";
import type { Locale } from "@/shared/lib/next-intl/types";

export default async function Blog({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  "use cache";

  const { locale } = await params;

  setRequestLocale(locale);
  cacheTag(BLOG_TAG);

  return <div>Blog</div>;
}
