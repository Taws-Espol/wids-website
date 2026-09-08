import * as migration_20260414_203346 from "@/shared/lib/payload/migrations/20260414_203346";
import * as migration_20260511_032740 from "@/shared/lib/payload/migrations/20260511_032740";
import * as migration_20260513_225900 from "@/shared/lib/payload/migrations/20260513_225900";
import * as migration_20260521_022131 from "@/shared/lib/payload/migrations/20260521_022131";
import * as migration_20260724_020828_add_conference_attendance_confirmation from "@/shared/lib/payload/migrations/20260724_020828_add_conference_attendance_confirmation";
import * as migration_20260724_035754_add_attendance_confirmation_job_slug from "@/shared/lib/payload/migrations/20260724_035754_add_attendance_confirmation_job_slug";
import * as migration_20260725_012713_add_posts_collection from "@/shared/lib/payload/migrations/20260725_012713_add_posts_collection";
import * as migration_20260907_120000_relative_media_urls from "@/shared/lib/payload/migrations/20260907_120000_relative_media_urls";
import * as migration_20260908_060000_drop_media_prefix from "@/shared/lib/payload/migrations/20260908_060000_drop_media_prefix";

export const migrations = [
  {
    up: migration_20260414_203346.up,
    down: migration_20260414_203346.down,
    name: "20260414_203346",
  },
  {
    up: migration_20260511_032740.up,
    down: migration_20260511_032740.down,
    name: "20260511_032740",
  },
  {
    up: migration_20260513_225900.up,
    down: migration_20260513_225900.down,
    name: "20260513_225900",
  },
  {
    up: migration_20260521_022131.up,
    down: migration_20260521_022131.down,
    name: "20260521_022131",
  },
  {
    up: migration_20260724_020828_add_conference_attendance_confirmation.up,
    down: migration_20260724_020828_add_conference_attendance_confirmation.down,
    name: "20260724_020828_add_conference_attendance_confirmation",
  },
  {
    up: migration_20260724_035754_add_attendance_confirmation_job_slug.up,
    down: migration_20260724_035754_add_attendance_confirmation_job_slug.down,
    name: "20260724_035754_add_attendance_confirmation_job_slug",
  },
  {
    up: migration_20260725_012713_add_posts_collection.up,
    down: migration_20260725_012713_add_posts_collection.down,
    name: "20260725_012713_add_posts_collection",
  },
  {
    up: migration_20260907_120000_relative_media_urls.up,
    down: migration_20260907_120000_relative_media_urls.down,
    name: "20260907_120000_relative_media_urls",
  },
  {
    up: migration_20260908_060000_drop_media_prefix.up,
    down: migration_20260908_060000_drop_media_prefix.down,
    name: "20260908_060000_drop_media_prefix",
  },
];
