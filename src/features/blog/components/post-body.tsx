import Image from "next/image";
import {
  RichText,
  type JSXConvertersFunction,
} from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

import { Link } from "@/shared/components/ui/link";
import { Separator } from "@/shared/components/ui/separator";
import { TypographyH2 } from "@/shared/components/ui/typography-h2";
import { TypographyH3 } from "@/shared/components/ui/typography-h3";
import { TypographyH4 } from "@/shared/components/ui/typography-h4";
import { TypographyParagraph } from "@/shared/components/ui/typography-paragraph";
import type { Media } from "@/shared/lib/payload/types/payload";

type Props = {
  content: SerializedEditorState;
};

function toMedia(value: unknown): Media | null {
  if (typeof value !== "object" || value === null) {
    return null;
  }

  return "url" in value ? (value as Media) : null;
}

const HEADINGS = {
  h2: TypographyH2,
  h3: TypographyH3,
  h4: TypographyH4,
} as const;

/**
 * Payload's default converters emit bare <h2>, <p> and <ul>, which do not carry
 * the site's typography. Each block-level node is mapped to the shared UI
 * component instead, so a post reads like the rest of the site.
 */
const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,

  heading: ({ node, nodesToJSX }) => {
    const Heading = HEADINGS[node.tag as keyof typeof HEADINGS];
    const children = nodesToJSX({ nodes: node.children });

    // Only h2–h4 are enabled on the field; anything else falls back to h4.
    return Heading ? (
      <Heading className="mt-4">{children}</Heading>
    ) : (
      <TypographyH4 className="mt-4">{children}</TypographyH4>
    );
  },

  paragraph: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children });

    // Lexical emits an empty paragraph for a blank line; drop it rather than
    // rendering a stray gap.
    if (node.children.length === 0) {
      return null;
    }

    return <TypographyParagraph>{children}</TypographyParagraph>;
  },

  list: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children });
    const isOrdered = node.tag === "ol";
    const Tag = isOrdered ? "ol" : "ul";

    return (
      <Tag
        className={`font-barlow-condensed flex flex-col gap-2 pl-6 text-[18px] leading-[1.4] ${
          isOrdered ? "list-decimal" : "list-disc"
        }`}
      >
        {children}
      </Tag>
    );
  },

  listitem: ({ node, nodesToJSX }) => (
    <li className="pl-1">{nodesToJSX({ nodes: node.children })}</li>
  ),

  quote: ({ node, nodesToJSX }) => (
    <blockquote className="border-l-w-green-light text-w-foreground border-l-4 pl-4 italic">
      {nodesToJSX({ nodes: node.children })}
    </blockquote>
  ),

  horizontalrule: () => <Separator className="my-4" />,

  link: ({ node, nodesToJSX }) => {
    const url = node.fields.url ?? "";
    const isExternal = /^https?:\/\//.test(url);

    return (
      <Link
        href={url}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {nodesToJSX({ nodes: node.children })}
      </Link>
    );
  },

  upload: ({ node }) => {
    // An upload node can point at any upload collection, so narrow to the one
    // that actually carries an image before rendering it.
    const media = toMedia(node.value);

    if (!media?.url) {
      return null;
    }

    return (
      <Image
        src={media.url}
        alt={media.alt ?? ""}
        width={media.width ?? 1200}
        height={media.height ?? 800}
        sizes="(max-width: 768px) 100vw, 720px"
        className="h-auto w-full rounded-[14px]"
      />
    );
  },
});

export const PostBody = ({ content }: Props) => (
  <RichText
    data={content}
    converters={converters}
    className="flex flex-col gap-6"
  />
);
