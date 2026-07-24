/** @type {import("@commitlint/types").UserConfig} */
export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Adds the two project-specific types this repo actually uses on top of the
    // Conventional Commits set. See CONTRIBUTING.md for when each one applies.
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "hotfix",
        "ops",
        "refactor",
        "perf",
        "docs",
        "style",
        "test",
        "build",
        "ci",
        "chore",
        "revert",
      ],
    ],
    // Scopes are optional and free-form, but must be lower-case kebab-case so
    // that "registration" and "Registrations" cannot both appear in history.
    "scope-case": [2, "always", "kebab-case"],
  },
};
