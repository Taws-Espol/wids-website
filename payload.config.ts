import path from "node:path";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import { importExportPlugin } from "@payloadcms/plugin-import-export";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { buildConfig } from "payload";
import sharp from "sharp";

import { LOCALES } from "./src/shared/constants/i18n.ts";
import { Ambassadors } from "./src/shared/lib/payload/collections/ambassadors.ts";
import { ConferenceRegistrations } from "./src/shared/lib/payload/collections/conference-registrations.ts";
import { DatathonRegistrations } from "./src/shared/lib/payload/collections/datathon-registrations.ts";
import { Editions } from "./src/shared/lib/payload/collections/editions.ts";
import { Events } from "./src/shared/lib/payload/collections/events.ts";
import { Media } from "./src/shared/lib/payload/collections/media.ts";
import { NextgenRegistrations } from "./src/shared/lib/payload/collections/nextgen-registrations.ts";
import { OperationsMedia } from "./src/shared/lib/payload/collections/operations-media.ts";
import { Schedules } from "./src/shared/lib/payload/collections/schedules.ts";
import { Speakers } from "./src/shared/lib/payload/collections/speakers.ts";
import { Sponsors } from "./src/shared/lib/payload/collections/sponsors.ts";
import { Users } from "./src/shared/lib/payload/collections/users.ts";
import { getAppUrl } from "./src/shared/utils/get-app-url.ts";

export default buildConfig({
  bin: [
    {
      key: "seed",
      scriptPath: path.resolve(process.cwd(), "src/shared/lib/payload/seed.ts"),
    },
  ],
  editor: lexicalEditor(),
  collections: [
    Users,
    Media,
    OperationsMedia,
    Editions,
    Events,
    ConferenceRegistrations,
    DatathonRegistrations,
    NextgenRegistrations,
    Schedules,
    Speakers,
    Ambassadors,
    Sponsors,
  ],
  jobs: {
    shouldAutoRun: () => process.env.ENABLE_JOB_WORKERS === "true",
    autoRun: [
      {
        cron: "* * * * *", // Every minute
        limit: 100,
        queue: "critical",
      },
      {
        cron: "*/5 * * * *", // Every 5 minutes
        limit: 50,
        queue: "default",
      },
      {
        cron: "0 2 * * *", // Daily at 2 AM
        limit: 1000,
        queue: "batch",
      },
    ],
  },
  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: "public/site-assets",
        },
        "operations-media": {
          prefix: "private/operations-assets",
        },
      },
      bucket: process.env.S3_BUCKET_NAME ?? "",
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID ?? "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? "",
        },
        region: process.env.S3_REGION ?? "",
        endpoint: process.env.S3_ENDPOINT ?? "",
        forcePathStyle: true,
      },
    }),
    importExportPlugin({
      collections: [
        { slug: "users" },
        { slug: "conference-registrations" },
        { slug: "datathon-registrations" },
        { slug: "nextgen-registrations" },
      ],
    }),
  ],
  secret: process.env.PAYLOAD_SECRET ?? "",
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL ?? "",
    },
  }),
  sharp,
  localization: {
    locales: LOCALES.map((locale) => locale.toString()),
    defaultLocale: "es",
  },
  typescript: {
    outputFile: path.resolve(
      process.cwd(),
      "src/shared/lib/payload/types/payload.ts",
    ),
  },
  serverURL: getAppUrl().origin,
  email: nodemailerAdapter({
    defaultFromAddress: process.env.DEFAULT_FROM_ADDRESS ?? "",
    defaultFromName: process.env.DEFAULT_FROM_NAME ?? "",
    transportOptions: {
      host: process.env.SMTP_HOST ?? "",
      port: Number(process.env.SMTP_PORT ?? ""),
      secure: true,
      auth: {
        user: process.env.SMTP_USER ?? "",
        pass: process.env.SMTP_PASS ?? "",
      },
    },
  }),
});
