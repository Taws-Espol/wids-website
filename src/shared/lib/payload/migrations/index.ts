import * as migration_20260414_203346 from "./20260414_203346";

export const migrations = [
  {
    up: migration_20260414_203346.up,
    down: migration_20260414_203346.down,
    name: "20260414_203346",
  },
];
