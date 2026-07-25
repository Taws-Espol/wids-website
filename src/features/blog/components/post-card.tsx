import Image from "next/image";

import { Link } from "@/shared/lib/next-intl/navigation";
import type { Locale } from "@/shared/lib/next-intl/types";
import type { Post } from "@/shared/lib/payload/types/payload";
import { TypographyEyebrow } from "@/shared/components/ui/typography-eyebrow";
import { TypographyH3 } from "@/shared/components/ui/typography-h3";
import { TypographyParagraph } from "@/shared/components/ui/typography-paragraph";

import { formatPostDate } from "../utils/format-post-date";

type Props = {
  post: Post;
  locale: Locale;
};

export const PostCard = ({ post, locale }: Props) => {
  const coverImage =
    typeof post.coverImage === "object" ? post.coverImage : null;

  return (
    <article className="group flex flex-col gap-4">
      <Link
        href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }}
        className="flex flex-col gap-4 no-underline"
      >
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[14px]">
          {coverImage?.url && (
            <Image
              src={coverImage.url}
              alt={coverImage.alt ?? ""}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}
        </div>

        <div className="flex flex-col gap-2">
          {post.publishedAt && (
            <TypographyEyebrow className="text-w-green-dark">
              {formatPostDate(post.publishedAt, locale)}
            </TypographyEyebrow>
          )}

          <TypographyH3 className="group-hover:underline">
            {post.title}
          </TypographyH3>

          <TypographyParagraph className="line-clamp-3">
            {post.excerpt}
          </TypographyParagraph>
        </div>
      </Link>
    </article>
  );
};
