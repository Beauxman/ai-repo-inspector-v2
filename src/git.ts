import { execFileSync } from "node:child_process";
import type { ChangedFile } from "./types.js";

function git(repositoryPath: string, args: string[]): string {
  try {
    return execFileSync("git", args, {
      cwd: repositoryPath,
      encoding: "utf8",
    }).trim();
  } catch {
    return "";
  }
}

export function changedFiles(repositoryPath: string, baseRef?: string): ChangedFile[] {
  const base = baseRef ?? "main";
  let output = git(repositoryPath, ["diff", "--name-status", `${base}...HEAD`]);

  if (!output) {
    output = git(repositoryPath, ["diff", "--name-status"]);
  }

  return output
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const [code, ...pathParts] = line.split("\t");
      const status = code === "A" ? "added" : code === "D" ? "deleted" : "modified";
      return { path: pathParts.join("\t"), status };
    });
}
