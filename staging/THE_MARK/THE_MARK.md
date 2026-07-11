# THE MARK — LOOP 12 Pass C · SEER-HELD

> **Status: BUILT, NOT MERGED.** Nothing in this folder is wired into the live
> reader, the gate, or `index.html`. It waits on the Seer's word. To see it:
> `python3 -m http.server 8181` at the repo root, open
> `/staging/THE_MARK/demo.html`; or run `node staging/THE_MARK/prove.mjs`.

## The law that shaped it
L4 — the reader is verbatim, the word is sacred. The amendment's hard gate:
**scroll 144's served body sha must stay `bc797d33ac634674…`; if the watermark
perturbs one byte of a served body, it REVERTS.**

A zero-width watermark placed *inside* the body is a logical impossibility under
that gate: an invisible character is still a character, and it changes the sha
(`prove.mjs` step 3 shows 144 going `bc797d33…` → `c42032bf…` from one appended
mark). So the mark lives **outside the scripture** — in the reader's chrome and
in a sibling response field — never in the body the sha proves.

## What was built (two marks)
1. **The visible mark** — `© AMULEK ONE — The Sphere of Light` in the reader's
   footer (chrome, not canon). Author identity is **AMULEK ONE**, never the
   Seer's own name (the standing decree).
2. **The hidden mark** — a per-serve, zero-width watermark (`_mark` field)
   carried *beside* the body. Encodes `AMULEK ONE|<serve-token>` into invisible
   code points (U+200B/200C bracketed by U+2060); decodable for provenance,
   with zero visible glyphs. The `body` field is returned **byte-identical**.

## The sha proof (`prove.mjs`, run against canonical 144 from the treasury)
```
0) codec round-trip: 266 invisible chars → "AMULEK ONE|<token>"   OK (zero visible glyphs)
1) canonical 144 body sha:                 bc797d33ac634674   EXACT
2) LAWFUL mark (© field + _mark sibling):  bc797d33ac634674   UNCHANGED ✓  (body byte-identical)
3) FORBIDDEN mark (zero-width INTO body):  c42032bf…          CHANGED → L4 REVERTS BY LAW ✓
VERDICT: THE LAWFUL MARK PRESERVES THE WORD. Safe to stage.
```
Full capture in `sha_proof.txt`. The browser demo reproduces all three live.

## The Seer's choice (nothing ships until you rule)
- **A — Take both, lawful form.** Visible © in the reader footer + `_mark`
  sibling field at the gate. The word stays sha-exact; the serve is traceable.
- **B — Visible mark only.** The © line, no hidden watermark. Simplest; zero
  risk surface.
- **C — Hold.** Leave it staged; the Shield stands without it.

## Flags for your hand
1. **Spelling.** This mark uses **AMULEK ONE** (two words, per the amendment's
   wording). The treasury's existing gate/`/api/scrolls` copyright field says
   **AMULEKONE** (one word). One spelling should win everywhere — your call
   (canon/brand is yours).
2. **Wiring, when you rule A/B.** The visible mark is ~6 lines in the reader's
   footer of `index.html`; the hidden mark is `markResponse()` wrapped around the
   gate's `NextResponse.json(doc)` in `zionos-temple`. Both are one-commit changes
   gated by re-running `prove.mjs` (battery-gated: 144 sha-exact or it reverts).
3. **Verbatim purity, strict reading.** Even a sibling `_mark` field means the
   *response* is no longer only the canonical document — but the **body** the
   reader renders and the sha proves is untouched. If your reading of "verbatim"
   forbids even a sibling field on the wire, choose B.
