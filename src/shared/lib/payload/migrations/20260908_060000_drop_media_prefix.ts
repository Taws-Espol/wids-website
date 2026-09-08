import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

/**
 * Drops the vestigial `media.prefix` column.
 *
 * Objects live at the root of the private bucket, so there is no prefix to
 * store. Since the `prefix` option was removed from the collection's
 * `s3Storage` config, the plugin no longer injects the field: Payload does not
 * select the column, does not write it, and `getFilePrefix` returns an empty
 * string, which resolves keys to the bucket root. The column has been dead
 * weight and schema drift since then.
 *
 * This has to be its own deploy. `payload migrate` runs before the new
 * container takes over, so dropping the column while a release that still
 * selects it is serving would break every media read for the length of the
 * deploy. Safe here only because the running release already omits it.
 */

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "media" DROP COLUMN IF EXISTS "prefix";
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Restores the state immediately before this migration: the column existed
  // with an empty default, every row holding ''. Postgres backfills existing
  // rows from the DEFAULT, so no separate UPDATE is needed.
  await db.execute(sql`
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "prefix" varchar DEFAULT '';
  `);
}
