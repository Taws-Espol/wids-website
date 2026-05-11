import * as migration_20260414_203346 from "./20260414_203346";
import * as migration_20260511_032740 from "./20260511_032740";

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
];
