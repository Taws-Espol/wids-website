import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { TypographyH1 } from "@/shared/components/ui/typography-h1";
import { TypographyParagraph } from "@/shared/components/ui/typography-paragraph";
import type { Locale } from "@/shared/lib/next-intl/types";

import { HeroSection } from "@/features/landing/components/hero-section";
import { PostCard } from "@/features/blog/components/post-card";
import { getBlogPosts } from "@/features/blog/queries/get-blog-posts";

export default async function Blog({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("features.landing.blog");
  const posts = await getBlogPosts(locale);

  return (
    <main className="flex flex-col gap-20 px-4 py-20 md:px-4 lg:px-8 xl:px-42">
      <HeroSection
        title={t("title")}
        src="https://cdn.taws.espol.edu.ec/wids/blog-hero.webp"
        alt="Blog hero"
        color="yellow"
      />

      <section className="flex flex-col items-center gap-8 md:flex-row">
        <div className="flex w-full flex-col gap-8 md:w-1/2">
          <TypographyH1>{t("subtitle")}</TypographyH1>

          <TypographyParagraph>{t("description")}</TypographyParagraph>
        </div>

        <div className="relative aspect-square w-full md:w-1/2">
          <Image
            src="https://cdn.taws.espol.edu.ec/wids/blog-collage.webp"
            alt="Blog collage"
            fill
            sizes="(max-width: 768px) calc(100vw - 2rem), 50vw"
          />
        </div>
      </section>

      <section>
        {posts.length === 0 ? (
          <TypographyParagraph className="text-w-gray">
            {t("empty")}
          </TypographyParagraph>
        ) : (
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} locale={locale} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
