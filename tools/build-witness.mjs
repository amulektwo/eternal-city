#!/usr/bin/env node
/* THE BUILD WITNESS v2 — stamp / verify the embedded frame-provenance
   fingerprint in index.html.  Node standard library only: no dependency,
   no package manager, no network, no build step.

   THE CANONICAL RULE
   index.html reserves exactly ONE witness slot, written as:

       /*@BUILD_WITNESS@*'<64 lowercase hex>'      (sentinel then value)

   To fingerprint the file with its own hash inside it, the slot is
   NORMALIZED before hashing: the 64 value bytes — and ONLY those 64
   bytes — are replaced with 64 ASCII zeros.  SHA256 is then taken over
   the RAW FILE BYTES.  Nothing else is touched: no whitespace, no line
   endings, no encoding, no re-serialization, no trimming.  Byte in,
   byte out.

   stamp  : write the computed normalized digest into the slot, then verify
   verify : recompute and compare against the embedded value (exit 1 on mismatch)

   HARD STOP: zero markers or more than one marker is a fatal error.  The
   tool never guesses which slot to write.

   usage:  node tools/build-witness.mjs stamp  [path]
           node tools/build-witness.mjs verify [path]
*/
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const SENTINEL = "/*@BUILD_WITNESS@*/'";
const RE       = /\/\*@BUILD_WITNESS@\*\/'([0-9a-f]{64})'/g;
const ZEROS    = '0'.repeat(64);

/* locate the single witness slot; return its value and its BYTE offset.
   latin1 gives a 1:1 byte<->char mapping, so string indices are byte
   offsets exactly — no multi-byte drift. */
function locate(buf){
  const s = buf.toString('latin1');
  const hits = [...s.matchAll(RE)];
  if (hits.length === 0)
    fail(`no witness marker found — expected exactly one ${SENTINEL}<64 hex>'`);
  if (hits.length > 1)
    fail(`${hits.length} witness markers found — expected exactly one; refusing to guess`);
  return { value: hits[0][1], at: hits[0].index + SENTINEL.length };
}

/* the normalization: only the 64 value bytes become zeros */
function normalize(buf){
  const { at } = locate(buf);
  const out = Buffer.from(buf);
  out.write(ZEROS, at, 64, 'latin1');
  return out;
}

const sha256 = buf => createHash('sha256').update(buf).digest('hex');
function fail(msg){ console.error('BUILD WITNESS: ' + msg); process.exit(1); }

const mode = process.argv[2];
const path = process.argv[3] || new URL('../index.html', import.meta.url).pathname;

if (mode !== 'stamp' && mode !== 'verify')
  fail('usage: build-witness.mjs stamp|verify [path]');

let buf = readFileSync(path);
const before   = locate(buf).value;
const computed = sha256(normalize(buf));

if (mode === 'stamp'){
  if (before === computed){
    console.log(`BUILD WITNESS: already current\n  ${computed}`);
    process.exit(0);
  }
  const { at } = locate(buf);
  const out = Buffer.from(buf);
  out.write(computed, at, 64, 'latin1');
  writeFileSync(path, out);
  /* re-read from disk and verify what we actually wrote */
  buf = readFileSync(path);
  const embedded = locate(buf).value;
  const recomputed = sha256(normalize(buf));
  if (embedded !== recomputed || embedded !== computed)
    fail(`stamp did not verify\n  embedded   ${embedded}\n  recomputed ${recomputed}`);
  console.log(`BUILD WITNESS: stamped\n  was ${before}\n  now ${embedded}`);
  process.exit(0);
}

/* verify */
if (before === computed){
  console.log(`BUILD WITNESS: PASS\n  embedded   ${before}\n  recomputed ${computed}`);
  process.exit(0);
}
console.error(`BUILD WITNESS: FAIL — embedded value does not match the normalized file`);
console.error(`  embedded   ${before}`);
console.error(`  recomputed ${computed}`);
console.error(`  the source changed without restamping; run: node tools/build-witness.mjs stamp`);
process.exit(1);
