#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { TextDecoder } from "node:util";

const repoRoot = process.cwd();
const decoder = new TextDecoder("utf-8", { fatal: true });

const includeTargets = [
  "docs/README.md",
  "docs/README_DOCS.md",
  "docs/1-MASTER",
  "docs/3-TEMPLATES",
];

const textExtensions = new Set([".md", ".txt", ".json", ".yml", ".yaml"]);
const suspiciousSequences = ["Ã", "Â", "â€", "�"];

function toPosix(value) {
  return value.split(path.sep).join("/");
}

function exists(relativePath) {
  return fs.existsSync(path.join(repoRoot, relativePath));
}

function collectFiles(target) {
  const absolute = path.join(repoRoot, target);
  if (!fs.existsSync(absolute)) return [];

  const stat = fs.statSync(absolute);
  if (stat.isFile()) return [absolute];

  const files = [];
  const stack = [absolute];

  while (stack.length) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const absoluteEntry = path.join(current, entry.name);
      const relativeEntry = toPosix(path.relative(repoRoot, absoluteEntry));

      if (entry.isDirectory()) {
        if (
          relativeEntry.startsWith("docs/2-SESSIONS/") ||
          relativeEntry.startsWith("docs/4-ARCHIVES/") ||
          relativeEntry.includes("/PATCH/")
        ) {
          continue;
        }
        stack.push(absoluteEntry);
        continue;
      }

      if (entry.isFile() && textExtensions.has(path.extname(entry.name).toLowerCase())) {
        files.push(absoluteEntry);
      }
    }
  }

  return files;
}

function isAllowedFalsePositive(relativePath, line) {
  // Some QA reference files intentionally show forbidden sequences as literal examples.
  if (
    relativePath === "docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_USERS_RH.md" &&
    /`(Ã|Â|â€|�)`/.test(line)
  ) {
    return true;
  }

  return false;
}

const files = includeTargets
  .filter(exists)
  .flatMap(collectFiles)
  .filter((file, index, array) => array.indexOf(file) === index)
  .sort();

const errors = [];

for (const absolutePath of files) {
  const relativePath = toPosix(path.relative(repoRoot, absolutePath));
  const buffer = fs.readFileSync(absolutePath);

  if (buffer.length >= 3 && buffer[0] === 0xef && buffer[1] === 0xbb && buffer[2] === 0xbf) {
    errors.push({
      file: relativePath,
      line: 1,
      type: "UTF-8 BOM",
      excerpt: "File starts with UTF-8 BOM.",
    });
  }

  let content;
  try {
    content = decoder.decode(buffer);
  } catch (error) {
    errors.push({
      file: relativePath,
      line: 1,
      type: "not UTF-8 strict",
      excerpt: error.message,
    });
    continue;
  }

  const lines = content.split(/\r?\n/);
  lines.forEach((line, index) => {
    if (!suspiciousSequences.some((sequence) => line.includes(sequence))) return;
    if (isAllowedFalsePositive(relativePath, line)) return;

    errors.push({
      file: relativePath,
      line: index + 1,
      type: "suspected mojibake",
      excerpt: line.trim().slice(0, 220),
    });
  });
}

if (errors.length) {
  console.error("Documentation encoding guard failed.");
  console.error(`Checked files: ${files.length}`);
  console.error(`Problems found: ${errors.length}`);
  console.error("");

  for (const error of errors.slice(0, 120)) {
    console.error(`${error.file}:${error.line} [${error.type}] ${error.excerpt}`);
  }

  if (errors.length > 120) {
    console.error(`... ${errors.length - 120} more problem(s) hidden.`);
  }

  console.error("");
  console.error("Fix the listed files before committing/pushing documentation changes.");
  process.exit(1);
}

console.log("Documentation encoding guard passed.");
console.log(`Checked files: ${files.length}`);
console.log("UTF-8 strict: OK");
console.log("UTF-8 without BOM: OK");
console.log("No active mojibake sequence found.");
