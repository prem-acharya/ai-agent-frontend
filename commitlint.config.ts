import type { UserConfig } from "@commitlint/types";

const Configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "chore",
        "revert",
      ],
    ],
  },
  helpUrl:
    "https://github.com/conventional-changelog/commitlint/#what-is-commitlint",
  prompt: {
    messages: {
      skip: "❌ Commit message validation failed",
      max: "⚠️ This field cannot be longer than %d characters",
      min: "⚠️ This field cannot be shorter than %d characters",
      emptyWarning: "❌ This field cannot be empty",
      upperLimitWarning: "⚠️ This field is above limit",
      lowerLimitWarning: "⚠️ This field is below limit",
    },
  },
};

export default Configuration;
