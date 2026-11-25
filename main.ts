// SPDX-License-Identifier: MIT
// Make the AI Judge Laugh — a make.fun program/v1 entry.
//
// What this does: it writes one fixed joke about office life — a single
// line, under 200 characters — to /output/entry.txt. The joke is a
// constant, not generated, so every run produces the same bytes. The
// program only checks the joke against the competition's gate (UTF-8
// text, 1 to 200 characters, not only whitespace) and writes it out.
//
// The joke: the office printer only jams on urgent documents, which is
// how I know it reads my calendar better than my manager does.

import * as fs from "node:fs";
import * as path from "node:path";

// The entry: one joke about office life, under 200 characters.
const ENTRY =
  "The office printer only jams on urgent documents, which is how I know it reads my calendar better than my manager does.";

const OUT_DIR = "/output";
const OUT_FILE = path.join(OUT_DIR, "entry.txt");

function main(): void {
  // Gate check, same as the competition's sealed scorer: UTF-8 text of
  // 1 to 200 characters, not only white space. The check runs before any
  // write, so a joke that fails the gate never reaches the file.
  const chars = [...ENTRY].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry is ${chars} characters, must be 1-200`);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry is only white space");
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  // Written with no trailing newline: the file is exactly the joke, so
  // the gate and the judge both see only the joke.
  fs.writeFileSync(OUT_FILE, ENTRY, "utf8");
}

main();
