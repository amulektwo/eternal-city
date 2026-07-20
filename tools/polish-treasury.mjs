/**
 * polish-treasury.mjs — S-3 THE BODY PASS (WO-20260720-01).
 *
 * Runs THE BLADE (polish-scroll.mjs) over the FULL scroll BODIES in the
 * private treasury, applying the Seer's sealed rulings:
 *   • sealing lines → COLOPHON (lifted to a clean foot-line, never vanished)
 *   • scripture, temple architecture (═ ◈ ⚡ §), eternal equations, sacred
 *     seals and the poetic voice — KEPT, character-exact
 *   • AI-skin (provenance, UUIDs, chat turns, forge-fields, self-talk,
 *     SPIRAL TRACKING, wikilink plumbing) — CUT
 *   • the Seer's legal name is KEPT in the body (the AMULEK ONE mask is a
 *     PUBLIC-lamp law only; the internal canon holds the real name)
 * The blade is deterministic and idempotent: running twice = running once.
 * The Supreme Twelve are skipped (untouched, apart).
 *
 * SOURCE OF TRUTH: pure revelation to the modern day — the Seer. The treasury
 * is its store; this tool runs where the treasury lives (the Seer's machine),
 * NOT in the cloud container (there is no treasury there).
 *
 * Usage (from the repo root, on the machine holding the treasury):
 *   node tools/polish-treasury.mjs --dry              # report only, write nothing (DEFAULT)
 *   node tools/polish-treasury.mjs --write            # polish in place (writes a one-time .bak per file)
 *   node tools/polish-treasury.mjs --out ../polished  # write polished copies into a new dir
 *   node tools/polish-treasury.mjs --dir /path/to/city   # override the treasury path
 *   node tools/polish-treasury.mjs --limit 20 --dry   # sample the first N (proof runs)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { polishBody } from "./polish-scroll.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const argv = process.argv.slice(2);
const flag = (name) => argv.includes(name);
const val = (name, def) => { const i = argv.indexOf(name); return i >= 0 && argv[i + 1] ? argv[i + 1] : def; };

const DEFAULT_TREASURY = path.join(process.env.HOME || "", "projects/zionos-temple/data/city");
const TREASURY = path.resolve(val("--dir", process.env.TREASURY || DEFAULT_TREASURY));
const OUT = val("--out", null);
const WRITE = flag("--write");
const DRY = !WRITE && !OUT; // dry is the safe default
const LIMIT = parseInt(val("--limit", "0"), 10) || Infinity;

if (!fs.existsSync(TREASURY) || !fs.statSync(TREASURY).isDirectory()) {
  console.error(`✗ Treasury not found: ${TREASURY}`);
  console.error(`  S-3 polishes the FULL BODIES, which live in the treasury on the`);
  console.error(`  Seer's machine — it cannot run where there is no treasury (e.g. the`);
  console.error(`  cloud container). Run this on the machine that holds the bodies, or`);
  console.error(`  point --dir / $TREASURY at the treasury directory.`);
  process.exit(1);
}
if (OUT) fs.mkdirSync(OUT, { recursive: true });

// the Supreme Twelve — skipped (untouched, apart). Read the flag from the
// public metadata cards in this repo when present.
const supreme = new Set();
const META = path.join(ROOT, "data", "scrolls");
if (fs.existsSync(META)) {
  for (const f of fs.readdirSync(META)) {
    if (!f.endsWith(".json") || f === "index.json") continue;
    try { const d = JSON.parse(fs.readFileSync(path.join(META, f), "utf8")); if (d.supreme) supreme.add(String(d.id)); } catch {}
  }
}

const bodyOf = (d) => d.body ?? d.text ?? d.content ?? "";
const setBody = (d, v) => { if ("body" in d || !("text" in d || "content" in d)) d.body = v; else if ("text" in d) d.text = v; else d.content = v; return d; };

// wound probes (for the before/after report — not the cut, just the measure)
const PROBES = {
  "chat turns": /##\s*\[(?:User|Assistant|Human|AI)\]/gi,
  "forge self-talk": /shall I (?:now )?forge|let me (?:now )?forge|sacred forge at work|surpass ChatGPT|transcend ChatGPT/gi,
  "SPIRAL TRACKING": /SPIRAL TRACKING/gi,
  "wikilink plumbing": /\[\[/g,
  "sealing lines": /Sealed under|Date of Sealing|Sealed by/gi,
  "forge fields": /\bScroll ID:|\bInitiated:|Forged by:/gi,
};
const countAll = (s) => Object.fromEntries(Object.entries(PROBES).map(([k, re]) => [k, (String(s).match(re) || []).length]));

const files = fs.readdirSync(TREASURY).filter((f) => f.endsWith(".json") && f !== "index.json");
let processed = 0, changed = 0, skippedSup = 0, empty = 0, colophons = 0;
const before = countAll(""), after = countAll("");
for (const k of Object.keys(PROBES)) { before[k] = 0; after[k] = 0; }
const samples = [];

for (const f of files) {
  if (processed >= LIMIT) break;
  const p = path.join(TREASURY, f);
  let d;
  try { d = JSON.parse(fs.readFileSync(p, "utf8")); } catch { continue; }
  const id = String(d.id ?? path.basename(f, ".json"));
  if (supreme.has(id)) { skippedSup++; continue; }
  const body = bodyOf(d);
  if (!body || !String(body).trim()) { empty++; processed++; continue; }
  processed++;

  const bc = countAll(body);
  const polished = polishBody(String(body), { sealing: "colophon" });
  const ac = countAll(polished);
  for (const k of Object.keys(PROBES)) { before[k] += bc[k]; after[k] += ac[k]; }
  if (/\n⸻\nColophon — /.test(polished)) colophons++;

  if (polished !== String(body)) {
    changed++;
    if (samples.length < 3) samples.push({ id, before: String(body).slice(0, 140), after: polished.slice(0, 140) });
    if (WRITE) {
      const bak = p + ".bak";
      if (!fs.existsSync(bak)) fs.copyFileSync(p, bak); // one-time pristine backup
      fs.writeFileSync(p, JSON.stringify(setBody(d, polished), null, 2));
    } else if (OUT) {
      fs.writeFileSync(path.join(OUT, f), JSON.stringify(setBody(d, polished), null, 2));
    }
  }
}

console.log(`\nS-3 THE BODY PASS · treasury: ${TREASURY}`);
console.log(`mode: ${DRY ? "DRY RUN (nothing written)" : WRITE ? "WRITE IN PLACE (.bak per file)" : "OUT " + OUT}`);
console.log(`files: ${files.length} · processed: ${processed} · changed: ${changed} · empty: ${empty} · Supreme skipped: ${skippedSup} · colophons laid: ${colophons}\n`);
console.log("wound".padEnd(20), "before".padStart(9), "after".padStart(9));
for (const k of Object.keys(PROBES)) console.log(k.padEnd(20), String(before[k]).padStart(9), String(after[k]).padStart(9));
if (samples.length) {
  console.log("\nsample cuts (first 140 chars):");
  for (const s of samples) { console.log(`  [${s.id}]`); console.log(`    before: ${JSON.stringify(s.before)}`); console.log(`    after : ${JSON.stringify(s.after)}`); }
}
if (DRY) console.log("\nDRY RUN — re-run with --write (in place, .bak kept) or --out DIR to apply.");
