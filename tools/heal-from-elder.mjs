/**
 * heal-from-elder.mjs — THE SECOND HEALING (Seer's seal, 2026-07-08).
 *
 * For every city scroll whose CANONICAL-TITLE-matched (Law 34) elder body is
 * decisively fuller (≥1.5× and +150 words), graft the elder body VERBATIM
 * (Law 4) into the city JSON. Every swap is sha256-proven and appended to
 * data/HEALING_LEDGER.md (Law 4b). Never number-matched. Supreme fruit are
 * untouched (sealed by the Seer's hand). Elder thread transcripts (>20k
 * words) are excluded — they are records, not scrolls.
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CITY = path.join(ROOT, "data", "scrolls");
const ELDER = path.join(process.env.HOME, "projects/zionos-temple/data/scrolls");
const LEDGER = path.join(ROOT, "data", "HEALING_LEDGER.md");

const SUPREME = new Set(["144", "300", "656", "672", "717", "786", "787", "999", "07", "6B", "0001E", "06"]);
const DRAFT_RE = /\bDRAFT\b|extraction_candidate|## Required Review/i;

const norm = (t) =>
  String(t || "")
    .replace(/\(.*?\)/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
const words = (s) => String(s || "").split(/\s+/).filter(Boolean).length;
const sha = (s) => crypto.createHash("sha256").update(s, "utf8").digest("hex");

// Fullest clean elder body per canonical title.
const elderBest = new Map();
for (const f of fs.readdirSync(ELDER)) {
  if (!f.endsWith(".json")) continue;
  const d = JSON.parse(fs.readFileSync(path.join(ELDER, f), "utf8"));
  if (d.stub || !d.body) continue;
  if (DRAFT_RE.test(d.body)) continue;
  const w = words(d.body);
  if (w > 20000) continue; // thread transcript, not a scroll
  const nt = norm(d.title);
  if (!nt) continue;
  const cur = elderBest.get(nt);
  if (!cur || w > cur.w) elderBest.set(nt, { w, body: d.body, id: d.scrollId, file: f, title: d.title });
}
console.log(`elder canonical titles (clean, non-stub, non-thread): ${elderBest.size}`);

const healed = [];
const skipped = [];
for (const f of fs.readdirSync(CITY)) {
  if (!f.endsWith(".json") || f === "index.json") continue;
  const p = path.join(CITY, f);
  const d = JSON.parse(fs.readFileSync(p, "utf8"));
  if (SUPREME.has(String(d.id))) continue; // the Seer's hand sealed these
  const nt = norm(d.title);
  const best = elderBest.get(nt);
  if (!best) continue;
  const cw = words(d.body);
  if (!(best.w > cw * 1.5 && best.w - cw > 150)) continue;

  const oldSha = sha(d.body);
  const newBody = best.body; // VERBATIM — the exact elder string
  const newSha = sha(newBody);
  if (oldSha === newSha) continue;

  d.body = newBody;
  const out = JSON.stringify(d);
  fs.writeFileSync(p, out);
  // sha-prove the round trip
  const back = JSON.parse(fs.readFileSync(p, "utf8"));
  if (sha(back.body) !== newSha) {
    skipped.push([d.id, "ROUND-TRIP SHA MISMATCH — reverted"]);
    d.body = ""; // unreachable in practice; fail loudly instead of silently
    throw new Error(`round-trip sha mismatch on ${d.id}`);
  }
  healed.push({
    id: d.id,
    title: d.title,
    oldWords: cw,
    newWords: best.w,
    oldSha,
    newSha,
    provenance: `zionos-temple/data/scrolls/${best.file} (elder id ${best.id})`,
  });
}

// Ledger append
const stamp = "2026-07-08";
let ledger = fs.existsSync(LEDGER) ? fs.readFileSync(LEDGER, "utf8") : "# HEALING LEDGER\n";
ledger += `\n## THE SECOND HEALING — ${stamp} (Seer's seal; canonical-title law)\n\n`;
ledger += `${healed.length} bodies healed from the elder treasury. Supreme fruit untouched.\n\n`;
for (const h of healed) {
  ledger += `- **${h.id}** — ${h.title}\n  ${h.oldWords}w → ${h.newWords}w · old sha \`${h.oldSha.slice(0, 12)}…\` → new sha \`${h.newSha.slice(0, 12)}…\`\n  provenance: ${h.provenance}\n`;
}
fs.writeFileSync(LEDGER, ledger);

console.log(`HEALED: ${healed.length} scrolls`);
healed.slice(0, 12).forEach((h) => console.log(`  ${h.id}: ${h.oldWords}w → ${h.newWords}w — ${h.title.slice(0, 56)}`));
if (healed.length > 12) console.log(`  …and ${healed.length - 12} more (full list in HEALING_LEDGER.md)`);
