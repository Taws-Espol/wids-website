import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_datathon_registrations_individuals_sex" AS ENUM('female', 'male');
  CREATE TYPE "public"."enum_datathon_registrations_individuals_year" AS ENUM('freshman', 'sophomore', 'junior', 'senior', 'graduate', 'other');
  CREATE TYPE "public"."enum_datathon_registrations_individuals_heard_about_event" AS ENUM('friend', 'flyer', 'social-media', 'email', 'website', 'university', 'workplace', 'other');
  CREATE TABLE "datathon_registrations_individuals" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"event_id" integer NOT NULL,
  	"first_name" varchar NOT NULL,
  	"last_name" varchar,
  	"sex" "enum_datathon_registrations_individuals_sex" NOT NULL,
  	"email" varchar NOT NULL,
  	"national_id" varchar NOT NULL,
  	"phone_number" varchar NOT NULL,
  	"university_name" varchar NOT NULL,
  	"major" varchar NOT NULL,
  	"year" "enum_datathon_registrations_individuals_year" NOT NULL,
  	"is_assigned_to_team" boolean DEFAULT false,
  	"receive_notifications" boolean DEFAULT false,
  	"accepted_terms" boolean DEFAULT false NOT NULL,
  	"heard_about_event" "enum_datathon_registrations_individuals_heard_about_event" NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "terms_and_conditions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "terms_and_conditions_locales" (
  	"content" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "operations_media" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "operations_media" CASCADE;
  ALTER TABLE "datathon_registrations" DROP CONSTRAINT IF EXISTS "datathon_registrations_bank_voucher_id_operations_media_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_operations_media_fk";
  
  DROP INDEX "datathon_registrations_members_phone_number_idx";
  DROP INDEX "datathon_registrations_bank_voucher_idx";
  DROP INDEX "payload_locked_documents_rels_operations_media_id_idx";
  ALTER TABLE "events" ADD COLUMN "location_url" varchar;
  ALTER TABLE "datathon_registrations_members" ADD COLUMN "national_id" varchar NOT NULL;
  ALTER TABLE "datathon_registrations" ADD COLUMN "allow_individuals_to_join" boolean DEFAULT false;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "datathon_registrations_individuals_id" integer;
  ALTER TABLE "datathon_registrations_individuals" ADD CONSTRAINT "datathon_registrations_individuals_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "terms_and_conditions_locales" ADD CONSTRAINT "terms_and_conditions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."terms_and_conditions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "datathon_registrations_individuals_event_idx" ON "datathon_registrations_individuals" USING btree ("event_id");
  CREATE INDEX "datathon_registrations_individuals_updated_at_idx" ON "datathon_registrations_individuals" USING btree ("updated_at");
  CREATE INDEX "datathon_registrations_individuals_created_at_idx" ON "datathon_registrations_individuals" USING btree ("created_at");
  CREATE UNIQUE INDEX "terms_and_conditions_locales_locale_parent_id_unique" ON "terms_and_conditions_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_datathon_registrations_indi_fk" FOREIGN KEY ("datathon_registrations_individuals_id") REFERENCES "public"."datathon_registrations_individuals"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_datathon_registrations_ind_idx" ON "payload_locked_documents_rels" USING btree ("datathon_registrations_individuals_id");
  ALTER TABLE "users" DROP COLUMN "_verified";
  ALTER TABLE "users" DROP COLUMN "_verificationtoken";
  ALTER TABLE "datathon_registrations" DROP COLUMN "bank_voucher_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "operations_media_id";`);
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "operations_media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"prefix" varchar DEFAULT 'operations-assets',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  ALTER TABLE "datathon_registrations_individuals" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "terms_and_conditions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "terms_and_conditions_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "datathon_registrations_individuals" CASCADE;
  DROP TABLE "terms_and_conditions" CASCADE;
  DROP TABLE "terms_and_conditions_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_datathon_registrations_indi_fk";
  
  DROP INDEX "payload_locked_documents_rels_datathon_registrations_ind_idx";
  ALTER TABLE "users" ADD COLUMN "_verified" boolean;
  ALTER TABLE "users" ADD COLUMN "_verificationtoken" varchar;
  ALTER TABLE "datathon_registrations" ADD COLUMN "bank_voucher_id" integer NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "operations_media_id" integer;
  CREATE INDEX "operations_media_updated_at_idx" ON "operations_media" USING btree ("updated_at");
  CREATE INDEX "operations_media_created_at_idx" ON "operations_media" USING btree ("created_at");
  CREATE UNIQUE INDEX "operations_media_filename_idx" ON "operations_media" USING btree ("filename");
  ALTER TABLE "datathon_registrations" ADD CONSTRAINT "datathon_registrations_bank_voucher_id_operations_media_id_fk" FOREIGN KEY ("bank_voucher_id") REFERENCES "public"."operations_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_operations_media_fk" FOREIGN KEY ("operations_media_id") REFERENCES "public"."operations_media"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "datathon_registrations_members_phone_number_idx" ON "datathon_registrations_members" USING btree ("phone_number");
  CREATE INDEX "datathon_registrations_bank_voucher_idx" ON "datathon_registrations" USING btree ("bank_voucher_id");
  CREATE INDEX "payload_locked_documents_rels_operations_media_id_idx" ON "payload_locked_documents_rels" USING btree ("operations_media_id");
  ALTER TABLE "events" DROP COLUMN "location_url";
  ALTER TABLE "datathon_registrations_members" DROP COLUMN "national_id";
  ALTER TABLE "datathon_registrations" DROP COLUMN "allow_individuals_to_join";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "datathon_registrations_individuals_id";
  DROP TYPE "public"."enum_datathon_registrations_individuals_sex";
  DROP TYPE "public"."enum_datathon_registrations_individuals_year";
  DROP TYPE "public"."enum_datathon_registrations_individuals_heard_about_event";`);
}
