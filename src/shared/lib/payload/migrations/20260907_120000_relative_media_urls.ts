import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

/**
 * Points media rows at the private bucket: relative URLs, and no `wids/`
 * prefix.
 *
 * Two columns, for two different reasons.
 *
 * `url` is cleanup only. The cloud-storage plugin attaches an afterRead hook to
 * the `url` field that recomputes the value from `generateFileURL` on every read
 * whenever the document has a filename, so the application already returns the
 * relative path without this migration. `beforeChange` only writes the column
 * when a document is saved, so untouched rows would keep the stale absolute URL
 * indefinitely — visible to anything reading the database directly: raw SQL, a
 * dump, an export, another service.
 *
 * `prefix` is load-bearing and this part is required. The storage key is built
 * as `docPrefix || collectionPrefix`, and `getFilePrefix` resolves `docPrefix`
 * from this column when the request carries no `?prefix=` param. Existing rows
 * hold `'wids'`, which would win over the now-empty collection prefix and keep
 * every read pointing at `wids/<filename>` in a bucket that stores objects at
 * the root.
 */

const CDN_PREFIX = "https://cdn.taws.espol.edu.ec/wids/";
const MEDIA_ROUTE_PREFIX = "/api/media/file/";
const OLD_BUCKET_PREFIX = "wids";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "media"
    SET "url" = ${MEDIA_ROUTE_PREFIX} || SUBSTRING("url" FROM ${CDN_PREFIX.length + 1})
    WHERE "url" LIKE ${`${CDN_PREFIX}%`};
  `);

  await db.execute(sql`
    UPDATE "media"
    SET "prefix" = ''
    WHERE "prefix" = ${OLD_BUCKET_PREFIX};
  `);

  // New rows must land at the root too; the column default still says 'wids'.
  // The literal is inline because Postgres rejects a bind parameter in
  // ALTER COLUMN ... SET DEFAULT, and the tagged template would produce one.
  await db.execute(sql`
    ALTER TABLE "media" ALTER COLUMN "prefix" SET DEFAULT '';
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Inline literal, not interpolated — see the note in `up`.
  await db.execute(sql`
    ALTER TABLE "media" ALTER COLUMN "prefix" SET DEFAULT 'wids';
  `);

  await db.execute(sql`
    UPDATE "media"
    SET "prefix" = ${OLD_BUCKET_PREFIX}
    WHERE "prefix" = '' OR "prefix" IS NULL;
  `);

  await db.execute(sql`
    UPDATE "media"
    SET "url" = ${CDN_PREFIX} || SUBSTRING("url" FROM ${MEDIA_ROUTE_PREFIX.length + 1})
    WHERE "url" LIKE ${`${MEDIA_ROUTE_PREFIX}%`};
  `);
}
