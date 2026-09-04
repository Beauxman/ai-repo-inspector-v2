#!/usr/bin/env node
import { writeFileSync } from "node:fs";
import { reviewRepository } from "./core.js";
type Args = {
  command: string;
  repositoryPath?: string;
  baseRef?: string;
  format?: "markdown" | "json";
  validations: string[];
};
function parseArgs(argv: string[]): Args {
  const args: Args = { command: argv[0] ?? "", validations: [] };
  for (let index = 1; index < argv.length; index++) {
    const token = argv[index];
    if (token === "--repo") {
      args.repositoryPath = argv[++index];
    } else if (token === "--base-ref") {
      args.baseRef = argv[++index];
    } else if (token === "--format") {
      const formatInput = argv[++index];
      if (formatInput !== "markdown" && formatInput !== "json") {
        console.error(`Invalid --format value: ${formatInput}. Expected "markdown" or "json".`);
        process.exitCode = 1;
        return args;
      }
      args.format = formatInput;
    } else if (token === "--validate") {
      const validation = argv[++index];
      if (validation) args.validations.push(validation);
    }
  }
  return args;
}
async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (process.exitCode === 1) {
    return;
  }
  if (args.command !== "review" || !args.repositoryPath) {
    console.error("Usage: inspector review --repo <path> [--base-ref <ref>] [--validate <command>]");
    process.exitCode = 1;
    return;
  }
  const report = await reviewRepository({
    repositoryPath: args.repositoryPath,
    baseRef: args.baseRef,
    validationCommands: args.validations,
    format: args.format,
  });
  const outputFilename = args.format === "json" ? "review-report.json" : "review-report.md";
  writeFileSync(outputFilename, report, "utf8");
  console.log(`Review report written to ${outputFilename}`);
}
main().catch((error) => {
  console.error("Fatal error:", error);
  process.exitCode = 1;
});
