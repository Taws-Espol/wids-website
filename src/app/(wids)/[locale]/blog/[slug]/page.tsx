import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { TypographyEyebrow } from "@/shared/components/ui/typography-eyebrow";
import { TypographyH1 } from "@/shared/components/ui/typography-h1";
import { TypographyParagraph } from "@/shared/components/ui/typography-paragraph";
import { Link } from "@/shared/lib/next-intl/navigation";
import type { Locale } from "@/shared/lib/next-intl/types";

import { PostBody } from "@/features/blog/components/post-body";
import { PostSkeleton } from "@/features/blog/components/post-skeleton";
import { formatPostDate } from "@/features/blog/utils/format-post-date";
import { getBlogPostBySlug } from "@/features/blog/queries/get-blog-post-by-slug";
import { getLatestPostSlugs } from "@/features/blog/queries/get-latest-post-slugs";

type Params = Promise<{ locale: Locale; slug: string }>;

/**
 * Prerenders only the most recent posts, so build time stays flat as the
 * archive grows; anything older renders on first request via `dynamicParams`.
 *
 * Cache Components rejects an empty array, and a blog with no posts yet is a
 * real state, so a slug that resolves to 404 stands in for that case.
 */
const NO_POSTS_PLACEHOLDER_SLUG = "no-posts-yet";

export async function generateStaticParams({
  params,
}: {
  params: { locale: string };
}) {
  const slugs = await getLatestPostSlugs(params.locale as Locale);

  if (slugs.length === 0) {
    return [{ slug: NO_POSTS_PLACEHOLDER_SLUG }];
  }

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getBlogPostBySlug(slug, locale);

  if (!post) {
    return {};
  }

  const coverImage =
    typeof post.coverImage === "object" ? post.coverImage : null;

  return {
    title: `WiDS Guayaquil | ${post.title}`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt ?? undefined,
      images: coverImage?.url ? [{ url: coverImage.url }] : undefined,
    },
  };
}

/*
 * The slug is runtime data, so under Cache Components it has to resolve inside a
 * Suspense boundary — otherwise it blocks the route's shell from prerendering
 * for every slug not covered by generateStaticParams.
 */
export default function BlogPost({ params }: { params: Params }) {
  return (
    <main className="flex flex-col gap-10 px-4 py-20 md:px-4 lg:px-8 xl:px-64">
      <Suspense fallback={<PostSkeleton />}>
        <PostArticle params={params} />
      </Suspense>
    </main>
  );
}

async function PostArticle({ params }: { params: Params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = await getBlogPostBySlug(slug, locale);

  // Covers both an unknown slug and a draft, since the query filters on status.
  if (!post) {
    notFound();
  }

  const t = await getTranslations("features.landing.blog");
  const coverImage =
    typeof post.coverImage === "object" ? post.coverImage : null;

  return (
    <>
      <article className="flex flex-col gap-8">
        <header className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {post.publishedAt && (
              <TypographyEyebrow className="text-w-green-dark">
                {formatPostDate(post.publishedAt, locale)}
              </TypographyEyebrow>
            )}

            {post.author && (
              <TypographyEyebrow className="text-w-gray">
                · {post.author}
              </TypographyEyebrow>
            )}
          </div>

          <TypographyH1>{post.title}</TypographyH1>

          <TypographyParagraph className="text-w-gray">
            {post.excerpt}
          </TypographyParagraph>
        </header>

        {coverImage?.url && (
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[20px]">
            <Image
              src={coverImage.url}
              alt={coverImage.alt ?? ""}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 900px"
              className="object-cover"
            />
          </div>
        )}

        <PostBody content={post.content} />
      </article>

      <Link href="/blog" className="text-w-green-dark underline">
        {t("back-to-blog")}
      </Link>
    </>
  );
}
