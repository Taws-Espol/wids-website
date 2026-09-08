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
import { getAppUrl } from "@/shared/utils/get-app-url";

import { PostBody } from "@/features/blog/components/post-body";
import { PostSkeleton } from "@/features/blog/components/post-skeleton";
import { formatPostDate } from "@/features/blog/utils/format-post-date";
import { getBlogPostBySlug } from "@/features/blog/queries/get-blog-post-by-slug";

type Params = Promise<{ locale: Locale; slug: string }>;

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
    alternates: {
      /*
       * Canonical only, no `languages`. Slugs are localized, so an hreflang
       * pair needs the other locale's slug, and this page has no query that
       * resolves it. Emitting a pair built from *this* slug would point at a
       * URL that does not exist — worse than emitting nothing.
       *
       * Built by hand rather than with next-intl's `getPathname`, which drops
       * the alternates during prerendering under `cacheComponents` — see
       * `get-alternates-metadata.ts`.
       */
      canonical: new URL(`/${locale}/blog/${slug}`, getAppUrl()).toString(),
    },
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
 * No `generateStaticParams`: no post is prerendered at build time. The archive
 * is expected to grow, and build work spent on posts that may never be
 * requested is wasted — it would also tie the build to database availability.
 *
 * With `cacheComponents` and `partialPrefetching`, omitting it makes every
 * locale's route a partial prerender: a visitor gets the App Shell — the
 * `PostSkeleton` below — immediately, the post streams in, and the rendered
 * result is cached so the next visitor gets it statically. A `<Link>` entering
 * the viewport on the listing page starts that upgrade before the click.
 *
 * The slug is runtime data, so it has to resolve inside a Suspense boundary.
 * Awaiting `params` above the boundary would tie the shell to one URL and
 * defeat the whole arrangement.
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
