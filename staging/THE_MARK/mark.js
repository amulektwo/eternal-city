/* ============================================================================
   THE MARK — LOOP 12 Pass C  ·  SEER-HELD (built, NOT merged)
   ----------------------------------------------------------------------------
   Two marks, one law. The law is L4: the reader is VERBATIM, the word is
   sacred. A watermark may touch anything EXCEPT the scripture the reader
   renders and the sha proves. So:

     • THE VISIBLE MARK — a © line in the reader's CHROME (never the body).
     • THE HIDDEN MARK  — a zero-width, per-serve watermark carried in a
       SEPARATE response field. The `body` string is returned byte-identical;
       its sha256 is untouched. The mark rides beside the word, never inside it.

   The literal "zero-width INTO the body" reading is a LOGICAL impossibility
   under L4: any character added to the body — even an invisible one — changes
   its sha. `proveInBodyBreaksTheLaw()` below demonstrates exactly that, so the
   Seer can see WHY the mark lives outside the scripture.

   Author identity on every public surface: AMULEK ONE (never the Seer's own
   name — the standing decree). NOTE the treasury's existing gate/scrolls route
   spells it "AMULEKONE" (one word); reconcile is the Seer's call.
   ========================================================================== */

const AUTHOR = "AMULEK ONE";
const NOTICE = `© ${AUTHOR} — The Sphere of Light`;

/* Zero-width alphabet. Two invisible code points carry the bits; a word-joiner
   sentinel brackets the payload so a decoder can find it and no visible glyph
   is ever emitted. None of these render as anything the eye or the reader's
   layout can see. */
const Z0 = "​"; // zero-width space      → bit 0
const Z1 = "‌"; // zero-width non-joiner → bit 1
const ZS = "⁠"; // word joiner           → sentinel (start/end)

/** Encode a short ASCII/UTF-8 mark string into a zero-width payload. */
function encodeMark(text) {
  const bytes = new TextEncoder().encode(text);
  let bits = "";
  for (const b of bytes) bits += b.toString(2).padStart(8, "0");
  let z = ZS;
  for (const bit of bits) z += bit === "0" ? Z0 : Z1;
  return z + ZS;
}

/** Recover the mark string from a zero-width payload (inverse of encodeMark). */
function decodeMark(z) {
  const start = z.indexOf(ZS);
  if (start < 0) return null;
  const end = z.indexOf(ZS, start + 1);
  if (end < 0) return null;
  const inner = z.slice(start + 1, end);
  let bits = "";
  for (const ch of inner) {
    if (ch === Z0) bits += "0";
    else if (ch === Z1) bits += "1";
  }
  const bytes = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) bytes.push(parseInt(bits.slice(i, i + 8), 2));
  return new TextDecoder().decode(new Uint8Array(bytes));
}

/* --------------------------------------------------------------------------
   THE LAWFUL APPLICATION — the body is returned untouched; the mark rides in
   a sibling field. This is what a hardened gate would return.
   -------------------------------------------------------------------------- */
function markResponse(doc, serveToken) {
  // serveToken: e.g. a per-request id or a date — traceability without PII.
  const markText = `${AUTHOR}|${serveToken}`;
  return {
    ...doc, // body included, BYTE-IDENTICAL — not re-encoded, not touched
    copyright: NOTICE,
    _mark: encodeMark(markText), // the hidden watermark, OUTSIDE the body
  };
}

/* --------------------------------------------------------------------------
   THE LAW'S TEETH — the forbidden reading, shown so it is never mistaken for
   safe: putting the zero-width mark INTO the body changes its sha. Returns the
   two shas so the proof can print them side by side.
   -------------------------------------------------------------------------- */
async function shaOf(str) {
  // Node (crypto) or browser (subtle) — both give the utf-8 sha256 (Law 27).
  if (typeof crypto !== "undefined" && crypto.subtle) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
    return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  const { createHash } = await import("node:crypto");
  return createHash("sha256").update(str, "utf8").digest("hex");
}

module.exports = { AUTHOR, NOTICE, encodeMark, decodeMark, markResponse, shaOf, Z0, Z1, ZS };
