import * as migration_20260414_203346 from "./20260414_203346";
import * as migration_20260511_032740 from "./20260511_032740";
import * as migration_20260513_225900 from "./20260513_225900";
import * as migration_20260521_022131 from "./20260521_022131";
import * as migration_20260724_020828_add_conference_attendance_confirmation from "./20260724_020828_add_conference_attendance_confirmation";
import * as migration_20260724_035754_add_attendance_confirmation_job_slug from "./20260724_035754_add_attendance_confirmation_job_slug";
import * as migration_20260725_012713_add_posts_collection from "./20260725_012713_add_posts_collection";

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
];
