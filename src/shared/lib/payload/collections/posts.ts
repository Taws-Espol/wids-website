import { slugField, type CollectionConfig } from "payload";
import {
  BlockquoteFeature,
  BoldFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineCodeFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  StrikethroughFeature,
  UnderlineFeature,
  UnorderedListFeature,
  UploadFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

import { POSTS_TAG, postTag } from "../../../constants/cache-tags.ts";
import { revalidateCache } from "../../../utils/revalidate-cache.ts";
import { isAdminOrEditor } from "../utils/is-admin-or-editor.ts";

export const Posts: CollectionConfig = {
  slug: "posts",
  labels: { singular: "Post", plural: "Posts" },
  access: {
    create: isAdminOrEditor,
    // Drafts stay private: a reader may only see a published post.
    read: ({ req }) =>
      isAdminOrEditor({ req }) || { _status: { equals: "published" } },
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  admin: {
    group: "Content",
    defaultColumns: ["title", "publishedAt", "_status", "updatedAt"],
    useAsTitle: "title",
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    // Payload's own slug helper: generates from the title, adds the regenerate
    // toggle, and defaults to required, unique and indexed.
    slugField({ useAsSlug: "title", localized: true }),
    {
      name: "excerpt",
      type: "textarea",
      required: true,
      localized: true,
      admin: {
        description:
          "Shown on the blog listing card and used as the page description.",
      },
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "author",
      type: "text",
      admin: {
        position: "sidebar",
        description: "Leave empty for a post from WiDS Guayaquil itself.",
      },
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
        date: { pickerAppearance: "dayAndTime" },
      },
    },
    {
      name: "content",
      type: "richText",
      required: true,
      localized: true,
      /*
       * Configured rather than left on defaults: every enabled feature is a node
       * type the renderer has to handle, and the defaults include relationship,
       * checklist, alignment and indent, which the post page has no design for.
       */
      editor: lexicalEditor({
        features: () => [
          ParagraphFeature(),
          HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
          BoldFeature(),
          ItalicFeature(),
          UnderlineFeature(),
          StrikethroughFeature(),
          InlineCodeFeature(),
          UnorderedListFeature(),
          OrderedListFeature(),
          LinkFeature(),
          BlockquoteFeature(),
          HorizontalRuleFeature(),
          UploadFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Stamp a publish date the first time a post goes live.
        if (data._status === "published" && !data.publishedAt) {
          data.publishedAt = new Date().toISOString();
        }

        return data;
      },
    ],
    afterChange: [
      async ({ doc, req }) => {
        await revalidateCache({
          req,
          source: "posts",
          // The listing plus this post's own page; other posts stay cached.
          tag: `${POSTS_TAG},${postTag(doc.id)}`,
        });
      },
    ],
    afterDelete: [
      async ({ doc, req }) => {
        await revalidateCache({
          req,
          source: "posts",
          tag: `${POSTS_TAG},${postTag(doc.id)}`,
        });
      },
    ],
  },
  timestamps: true,
};
