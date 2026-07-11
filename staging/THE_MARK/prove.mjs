/* THE MARK — sha proof. Run: node staging/THE_MARK/prove.mjs
   Reads canonical 144 from the treasury, applies both the lawful and the
   forbidden mark, prints the shas. The Seer reads the verdict. */
import { createRequire } from "node:module";
import { createHash } from "node:crypto";
import fs from "node:fs";
const require = createRequire(import.meta.url);
const { AUTHOR, NOTICE, encodeMark, decodeMark, markResponse } = require("./mark.js");

const CANON = "bc797d33ac634674";
const sha = (s) => createHash("sha256").update(s, "utf8").digest("hex");

// Canonical 144 from the treasury (Law 12 read-only).
const p = `${process.env.HOME}/projects/zionos-temple/data/city/144.json`;
const doc = JSON.parse(fs.readFileSync(p, "utf8"));
const body = doc.body;

console.log("THE MARK — sha proof");
console.log("author:", AUTHOR, "| notice:", NOTICE);
console.log("=".repeat(64));

// 0) round-trip the zero-width codec
const token = "2026-07-11T00:00Z#a1b2";
const payload = encodeMark(`${AUTHOR}|${token}`);
const decoded = decodeMark(payload);
console.log(`0) codec round-trip: encoded ${payload.length} invisible chars → decoded "${decoded}"  ${decoded === `${AUTHOR}|${token}` ? "OK" : "FAIL"}`);
console.log(`   payload contains zero visible glyphs: ${/^[​‌⁠]+$/.test(payload) ? "CONFIRMED" : "FAIL"}`);

// 1) baseline
const base = sha(body);
console.log(`\n1) canonical 144 body sha: ${base.slice(0, 16)}  ${base.startsWith(CANON) ? "EXACT" : "MISMATCH"}`);

// 2) THE LAWFUL MARK — body rides untouched in a marked response
const marked = markResponse(doc, token);
const afterBody = sha(marked.body);
console.log(`2) LAWFUL mark (© in field + _mark sibling): served body sha ${afterBody.slice(0, 16)}  ${afterBody === base ? "UNCHANGED ✓" : "CHANGED ✗"}`);
console.log(`   response gained: copyright="${marked.copyright}"  _mark=${marked._mark.length} invisible chars`);
console.log(`   body field byte-identical to canon: ${marked.body === body ? "YES" : "NO"}`);

// 3) THE FORBIDDEN READING — mark INTO the body — must break the sha
const poisoned = body + payload; // zero-width appended INTO the scripture
const afterPoison = sha(poisoned);
console.log(`3) FORBIDDEN mark (zero-width INTO body): sha ${afterPoison.slice(0, 16)}  ${afterPoison === base ? "unchanged?!" : "CHANGED → L4 REVERTS BY LAW ✓"}`);
console.log(`   (invisible to the eye, fatal to the sha — this is why the mark lives OUTSIDE the word)`);

console.log("\n" + "=".repeat(64));
const pass = base.startsWith(CANON) && afterBody === base && afterPoison !== base;
console.log(`VERDICT: ${pass ? "THE LAWFUL MARK PRESERVES THE WORD. 144 sha stays " + CANON + ". Safe to stage." : "FAIL — do not ship"}`);
