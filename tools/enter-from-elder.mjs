/**
 * enter-from-elder.mjs — THE ENTRY, CONTINUED (Seer's seal, 2026-07-08).
 *
 * Grows the city from the elder treasury under the entry law (4c):
 * full bodies only — non-stub, ≥120 words, no DRAFT/extraction_candidate
 * markers, no thread transcripts (>20k words), fullest clean variant per
 * elder id. Skips ids already in the city and titles already in the city
 * (Law 34 both ways). Elder 15-gate taxonomy folds into the 12 vault
 * houses. Appends to index.json sorted by gate then natural id.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CITY = path.join(ROOT, "data", "scrolls");
const ELDER = path.join(process.env.HOME, "projects/zionos-temple/data/scrolls");

const GATE_MAP = {
  "00": "Gate 00 — Core Law & Genesis",
  "0": "Gate 00 — Core Law & Genesis",
  "1": "Gate 1 — First Story & Eternal Identity",
  "2": "Gate 2 — Chain of Saviors & Maternal Codex",
  "2.5": "Gate 2 — Chain of Saviors & Maternal Codex",
  "3": "Gate 3 — Creation, Intelligences & Elemental Law",
  "4": "Gate 4 — Eternal Law & Covenant",
  "5": "Gate 5 — Law of Descent & Exaltation",
  "6": "Gate 6 — Temple of the Word",
  "7": "Gate 7 — Eternal Councils & Governance",
  "8": "Gate 8 — Meta-Revelation & Scroll Architecture",
  "9": "Gate 9 — Cosmic Governance",
  "10": "Gate 10 — New Jerusalem & 12 Tribes",
  "11": "Gate 11 — Scrollmaker's Law & the Book of the Lamb",
  "12": "Gate 11 — Scrollmaker's Law & the Book of the Lamb",
};

const DRAFT_RE = /\bDRAFT\b|extraction_candidate|## Required Review/i;
const norm = (t) =>
  String(t || "").replace(/\(.*?\)/g, "").toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
const words = (s) => String(s || "").split(/\s+/).filter(Boolean).length;
const natKey = (id) => {
  const m = String(id).match(/^(\d+(?:\.\d+)?)(.*)$/);
  return m ? [parseFloat(m[1]), m[2]] : [Infinity, String(id)];
};

// City occupancy: ids and canonical titles already placed.
const index = JSON.parse(fs.readFileSync(path.join(CITY, "index.json"), "utf8"));
const cityIds = new Set(index.map((e) => String(e.id)));
const cityTitles = new Set(index.map((e) => norm(e.title)));

// Fullest clean elder variant per elder id.
const best = new Map();
for (const f of fs.readdirSync(ELDER)) {
  if (!f.endsWith(".json")) continue;
  const d = JSON.parse(fs.readFileSync(path.join(ELDER, f), "utf8"));
  if (d.stub || !d.body) continue;
  const w = words(d.body);
  if (w < 120 || w > 20000) continue;
  if (DRAFT_RE.test(d.body)) continue;
  const id = String(d.scrollId);
  const cur = best.get(id);
  if (!cur || w > cur.w) best.set(id, { w, d });
}

let entered = 0;
let skippedId = 0;
let skippedTitle = 0;
const newEntries = [];
const gateCounts = {};
for (const [id, { d }] of best) {
  if (cityIds.has(id)) { skippedId++; continue; }
  const nt = norm(d.title);
  if (cityTitles.has(nt)) { skippedTitle++; continue; }
  const gate = GATE_MAP[String(d.gate)] || GATE_MAP["8"];
  const doc = {
    id,
    title: d.title,
    author: "AMULEK ONE",
    gate,
    sealed: Boolean(d.sealed),
    supreme: false,
    body: d.body, // VERBATIM
  };
  const file = path.join(CITY, `${id}.json`);
  if (fs.existsSync(file)) { skippedId++; continue; }
  fs.writeFileSync(file, JSON.stringify(doc));
  newEntries.push({ id, title: d.title, gate, supreme: false });
  cityIds.add(id);
  cityTitles.add(nt);
  gateCounts[gate] = (gateCounts[gate] || 0) + 1;
  entered++;
}

// Rebuild index.json: existing + new, sorted by gate then natural id.
const all = [...index, ...newEntries].sort((a, b) => {
  if (a.gate !== b.gate) return a.gate.localeCompare(b.gate);
  const [an, as] = natKey(a.id);
  const [bn, bs] = natKey(b.id);
  return an - bn || as.localeCompare(bs);
});
fs.writeFileSync(path.join(CITY, "index.json"), JSON.stringify(all));

console.log(`ENTERED: ${entered} new scrolls (city now ${all.length})`);
console.log(`skipped: ${skippedId} id-occupied, ${skippedTitle} title-already-placed`);
for (const [g, n] of Object.entries(gateCounts).sort()) console.log(`  +${n}  ${g}`);
