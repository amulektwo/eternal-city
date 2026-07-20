/**
 * clean-search-index.mjs — S-3′ THE PUBLIC QUICK-WIN (WO-20260720-01).
 *
 * Applies THE BLADE's excerpt laws to the `x` field of every record in
 * data/search-index.json, IN PLACE. Touches NOTHING else: id/t/g stand,
 * data/scrolls/*.json (canon metadata) stands, no body anywhere is read
 * or written — the search index is a BUILT artifact, not canon (Law 12).
 *
 * Why in place: this container has no treasury (bodies live in
 * ~/projects/zionos-temple/data/city on the Seer's machine), so the index
 * cannot be rebuilt here — running build-search-index.mjs without the
 * treasury would blank every excerpt. The lawful move is to polish the
 * excerpts that exist. The next treasury rebuild supersedes this pass
 * (build-search-index.mjs now polishes at the well — same blade).
 *
 * Run: node tools/clean-search-index.mjs          (writes + reports)
 *      node tools/clean-search-index.mjs --dry    (reports only)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { polishExcerpt, maskName } from "./polish-scroll.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FILE = path.join(ROOT, "data", "search-index.json");
const DRY = process.argv.includes("--dry");

const WOUNDS = {
  "source blocks / provenance": /##?\s*Source\b|Source Mountain|Source Thread|Extraction Type|Body Status/i,
  "thread UUIDs": /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i,
  "LightRAG / wikilinks": /LightRAG|\[\[/i,
  "sealing lines / legal name": /Sealed under|Date of Sealing|That Prophet|Jason Tierney/i,
  "AI self-talk / competition": /shall I (now )?forge|let me forge|sacred forge at work|surpass ChatGPT|iron sharpens iron|the fire burns for transcendence/i,
  "collision / audit flags": /COLLISION FLAG|Flag for Alpha|SPIRAL TRACKING/i,
  "chat turn-headers": /##\s*\[(User|Assistant)\]/i,
  "em-dash in excerpt": /—/,
};

const count = (rows) => {
  const c = Object.fromEntries(Object.keys(WOUNDS).map((k) => [k, 0]));
  for (const r of rows)
    for (const [k, re] of Object.entries(WOUNDS)) if (re.test(r.x || "")) c[k]++;
  return c;
};

const idx = JSON.parse(fs.readFileSync(FILE, "utf8"));
const before = count(idx);

let changed = 0, emptied = 0, titlesMasked = 0;
for (const r of idx) {
  // the title (t) is the card's own name — mask the Seer's legal name to
  // AMULEK ONE here too (the public shelf), but nothing else: titles are
  // clean canon strings, not excerpt prose.
  const nt = maskName(r.t || "");
  if (nt !== r.t) titlesMasked++;
  r.t = nt;
  const nx = polishExcerpt(r.x || "", r.t, r.id);
  if (nx !== r.x) changed++;
  if (!nx && r.x) emptied++;
  r.x = nx;
}
console.log(`titles masked to AMULEK ONE: ${titlesMasked}`);
const after = count(idx);

console.log(`records: ${idx.length} · changed: ${changed} · emptied: ${emptied}\n`);
console.log("wound".padEnd(30), "before".padStart(7), "after".padStart(7));
for (const k of Object.keys(WOUNDS))
  console.log(k.padEnd(30), String(before[k]).padStart(7), String(after[k]).padStart(7));

if (!DRY) {
  fs.writeFileSync(FILE, JSON.stringify(idx));
  console.log(`\nwritten: ${FILE} (${(fs.statSync(FILE).size / 1024).toFixed(0)} KB)`);
} else {
  console.log("\nDRY RUN — nothing written.");
}
