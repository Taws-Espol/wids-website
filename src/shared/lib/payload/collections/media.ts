import type { CollectionConfig } from "payload";
import { MEDIA_TAG } from "../../../constants/cache-tags.ts";
import { revalidateCache } from "../../../utils/revalidate-cache.ts";
import { isAdminOrEditor } from "../utils/is-admin-or-editor.ts";

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Media", plural: "Media" },
  upload: {
    adminThumbnail: "thumbnail",
    mimeTypes: ["image/*"],
    crop: true,
    focalPoint: true,
    /**
     * Files stream through the app now that the bucket is private, and the S3
     * adapter sets `Content-Type`, `ETag` and range headers but no
     * `Cache-Control` — so without this every view would revalidate against
     * the origin and re-stream on any cache miss.
     *
     * An hour is deliberately conservative: filenames are reused when an editor
     * replaces an image, so a long immutable TTL would pin the old bytes.
     * `stale-while-revalidate` absorbs the traffic that the CDN used to.
     */
    modifyResponseHeaders: ({ headers }) => {
      headers.set(
        "Cache-Control",
        "public, max-age=3600, stale-while-revalidate=86400",
      );

      return headers;
    },
  },
  access: {
    /**
     * `read` must stay public, and must keep returning a boolean rather than a
     * query constraint. `checkFileAccess` only looks the document up when read
     * access returns a where-clause, so a boolean lets the file route serve any
     * object in the bucket — which is what the static page images rely on,
     * since they have no media document.
     */
    create: isAdminOrEditor,
    read: () => true,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  admin: {
    group: "Media",
    defaultColumns: ["filename", "alt", "createdAt"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  hooks: {
    afterChange: [
      async ({ req }) => {
        await revalidateCache({ req, source: "media", tag: MEDIA_TAG });
      },
    ],
  },
};
