import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "conference_registrations" ADD COLUMN "attendance_confirmed" boolean DEFAULT false NOT NULL;
  ALTER TABLE "conference_registrations" ADD COLUMN "attendance_confirmed_at" timestamp(3) with time zone;
  ALTER TABLE "conference_registrations" ADD COLUMN "attendance_confirmation_email_sent_at" timestamp(3) with time zone;

  -- attendance_token is added nullable first so existing rows can be
  -- backfilled with a unique value before NOT NULL + the unique index
  -- are applied. Payload's field-level defaultValue is JS-only (evaluated
  -- on document create) and does not translate into a SQL DEFAULT here.
  ALTER TABLE "conference_registrations" ADD COLUMN "attendance_token" varchar;
  UPDATE "conference_registrations"
    SET "attendance_token" = replace(gen_random_uuid()::text, '-', '')
    WHERE "attendance_token" IS NULL;
  ALTER TABLE "conference_registrations" ALTER COLUMN "attendance_token" SET NOT NULL;
  CREATE UNIQUE INDEX "conference_registrations_attendance_token_idx" ON "conference_registrations" USING btree ("attendance_token");`);
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "conference_registrations_attendance_token_idx";
  ALTER TABLE "conference_registrations" DROP COLUMN "attendance_confirmed";
  ALTER TABLE "conference_registrations" DROP COLUMN "attendance_confirmed_at";
  ALTER TABLE "conference_registrations" DROP COLUMN "attendance_token";
  ALTER TABLE "conference_registrations" DROP COLUMN "attendance_confirmation_email_sent_at";`);
}
