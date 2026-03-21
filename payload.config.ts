import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { s3Storage } from "@payloadcms/storage-s3";
import sharp from "sharp";

import { Ambassadors } from "@/shared/lib/payload/collections/ambassadors";
import { Events } from "@/shared/lib/payload/collections/events";
import { Media } from "@/shared/lib/payload/collections/media";
import { Schedule } from "@/shared/lib/payload/collections/schedules";
import { Speakers } from "@/shared/lib/payload/collections/speakers";
import { Sponsors } from "@/shared/lib/payload/collections/sponsors";
import { Users } from "@/shared/lib/payload/collections/users";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  editor: lexicalEditor(),
  collections: [
    Users,
    Media,
    Ambassadors,
    Sponsors,
    Speakers,
    Events,
    Schedule,
  ],
  bin: [
    {
      key: "seed",
      scriptPath: path.resolve(dirname, "seed.ts"),
    },
  ],
  plugins: [
    s3Storage({
      collections: {
        media: {
          signedDownloads: {
            expiresIn: 3600,
          },
        },
      },
      bucket: process.env.S3_BUCKET_NAME || "",
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
        },
        region: process.env.S3_REGION || "",
        endpoint: process.env.S3_ENDPOINT || "",
        forcePathStyle: true,
      },
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || "",
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),
  sharp,
});
