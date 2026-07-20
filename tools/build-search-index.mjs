/**
 * build-search-index.mjs — THE SEEK's lamp oil.
 * Reads data/scrolls/*.json (READ-ONLY, Law 12) and emits
 * data/search-index.json: [{id, t, g, x}] — title, gate, 240-char excerpt.
 * Excerpts skip YAML frontmatter so the lamp shows scripture, not metadata.
 * Run after any change to data/scrolls/, then bump DATA_VERSION (Law 35).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { polishExcerpt, maskName } from "./polish-scroll.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SCROLLS = path.join(ROOT, "data", "scrolls");
// THE SHIELD: public files hold metadata only — excerpts come from the
// private treasury when it is present on this machine.
const TREASURY = path.join(process.env.HOME || "", "projects/zionos-temple/data/city");

// The lamp shows scripture, not metadata: every excerpt passes THE BLADE
// (polish-scroll.mjs, WO-20260720-01) at the well — provenance blocks,
// wikilink plumbing, chat skin and sealing lines never reach the public
// index, and the Seer's legal name is masked to AMULEK ONE in BOTH excerpt
// and title (the AMULEK ONE law). Bodies are untouched (Law 12).
function excerpt(body, title, id) {
  let b = String(body || "");
  const fm = b.match(/^\s*---\r?\n[\s\S]*?\r?\n---\r?\n?/);
  if (fm) b = b.slice(fm[0].length);
  b = b.replace(/\s+/g, " ").trim().slice(0, 400);
  return polishExcerpt(b, title, id).slice(0, 240);
}

const out = [];
for (const f of fs.readdirSync(SCROLLS)) {
  if (!f.endsWith(".json") || f === "index.json") continue;
  const d = JSON.parse(fs.readFileSync(path.join(SCROLLS, f), "utf8"));
  let body = d.body;
  if (!body && fs.existsSync(path.join(TREASURY, f))) {
    body = JSON.parse(fs.readFileSync(path.join(TREASURY, f), "utf8")).body;
  }
  out.push({ id: d.id, t: maskName(d.title || d.id), g: d.gate || "", x: excerpt(body, d.title, d.id) });
}
out.sort((a, b) => a.g.localeCompare(b.g) || String(a.id).localeCompare(String(b.id)));
fs.writeFileSync(path.join(ROOT, "data", "search-index.json"), JSON.stringify(out));
console.log(`search-index.json: ${out.length} entries, ${(fs.statSync(path.join(ROOT, "data", "search-index.json")).size / 1024).toFixed(0)} KB`);
