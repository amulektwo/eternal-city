# THE PERIMETER LEDGER — LOOP 12 Pass D (THE SHIELD ASCENDANT)

> Law preamble: NaN law (Law 39) + battery-gated commits (Law 40) stand.
> This pass hardens the city's OUTER edge — what it loads, from where, and how
> that is verified — and takes a cross-repo dependency + secrets census.
> Date: 2026-07-11.

---

## VERDICT: CSP live and clean, SRI enforced (proven), zero hardcoded secrets in
## either repo. One real flag handed up: the treasury's Next.js version carries a
## HIGH advisory cluster whose fix is a breaking upgrade — a mission of its own.

---

## 1 · CONTENT SECURITY POLICY (city, `index.html` `<meta http-equiv>`)
Delivered as a `<meta>` CSP (GitHub Pages is static and cannot set HTTP headers).
Every origin the city may reach is now named:

| Directive | Value | Why |
|---|---|---|
| `default-src` | `'self'` | deny by default |
| `script-src` | `'self' 'unsafe-inline' 'wasm-unsafe-eval' cdn.jsdelivr.net` | inline module+importmap (static, no nonce); WASM for DRACO/KTX2; three from jsdelivr |
| `style-src` | `'self' 'unsafe-inline' fonts.googleapis.com` | inline `<style>` + Google Fonts CSS |
| `font-src` | `'self' fonts.gstatic.com` | the three font families |
| `img-src` | `'self' data:` | favicon `data:`, local textures |
| `connect-src` | `'self' zionos-temple.vercel.app cdn.jsdelivr.net` | THE SHIELD gate + DRACO/KTX2 decoder fetch |
| `worker-src`/`child-src` | `'self' blob:` | DRACO/KTX2 Blob worker |
| `object-src` | `'none'` | no plugins |
| `base-uri` | `'self'` | no `<base>` hijack |

**Load-bearing grants, not laziness** (documented in the meta comment):
- `'unsafe-inline'` — the entire city is one hand-tuned inline module + inline
  importmap + inline `<style>`. Pages can't mint nonces, and hashing a file that
  changes every pass is a blank-screen footgun for the next builder. The reader
  renders via `textContent` (L4), so it has no HTML-injection vector to guard.
- `'wasm-unsafe-eval'` + `blob:` worker + jsdelivr in `connect-src` — the
  throne/fountain/gate GLB heroes are DRACO/KTX2-compressed; their decoders run
  WASM in a Blob worker fetched from jsdelivr. Without these three grants the
  heroes never load. **Proven:** city boots 60fps under the CSP, heroes present,
  **zero CSP-violation console messages, zero warnings, zero errors.**

**Excluded on purpose:** `frame-ancestors`, `X-Frame-Options`, `X-Content-Type-
Options: nosniff`, HSTS — all require a real HTTP header. GitHub Pages cannot set
them and `<meta>` cannot carry them (`frame-ancestors` in meta only emits a
console warning — which would itself break the zero-console gate). **Flag:**
clickjacking is unmitigated on Pages; the city has no sensitive action to frame.
A Vercel/Cloudflare front over the city could add these headers if the Seer wants.

## 2 · SUBRESOURCE INTEGRITY (city)
- **three@0.160.0** — the importmap now carries an `integrity` entry
  (`sha384-61S/Nu32…`) for the main module. **Enforcement PROVEN adversarially:**
  a deliberately corrupted hash made the city fail to boot with Chrome's *"Failed
  to find a valid digest in the 'integrity' attribute"*; the correct hash boots
  clean. Real SRI, not decorative.
- **Version pinning** is the integrity control where SRI can't reach: the addons
  prefix (`three/addons/`) and the DRACO/basis decoders are many distinct URLs an
  importmap can't individually hash, and jsdelivr serves pinned `@0.160.0` URLs
  immutably. **Google Fonts CSS is intentionally NOT SRI'd** — Google serves
  UA-varying stylesheets, so a fixed hash breaks real browsers (a known SRI
  anti-pattern). Honest limit, documented not bolted over.
- Importmap `integrity` is a newer platform feature: enforced in Chromium-family
  browsers (proven), gracefully ignored elsewhere — where the version-pin +
  immutable CDN still hold. No console warning observed on load.

## 3 · DEPENDENCY CENSUS
**City** (static, no package manifest): `three@0.160.0` (jsdelivr, pinned + SRI) ·
Google Fonts (Cinzel/Cormorant/EB Garamond) · THE SHIELD gate. That is the whole
external surface.

**Treasury** (`zionos-temple`, `npm audit --omit=dev`): **5 vulnerabilities
(1 high, 4 moderate).**
- **HIGH — `next@14.2.25`**: an advisory cluster (SSRF via middleware redirect,
  HTTP request smuggling in rewrites, cache-key confusion + content injection in
  the Image Optimizer, RSC DoS variants, `x-middleware-subrequest-id` leak). Fix
  = `next@16` (**breaking**). **Risk read for the SHIELD:** the city gate
  (`/api/city/[id]`) is a plain metered `GET` reading a JSON file — it uses no
  `next/image`, no middleware, no rewrites, so most of these advisories don't
  touch the gate's surface. The broader treasury app (study/companion routes)
  has more surface. **NOT auto-fixed** — a blind `audit fix --force` to Next 16
  in a security pass would risk bricking the treasury. **Flag: a dedicated
  Next 14→16 upgrade mission is the right home for this.**
- **Moderate — `postcss <8.5.10`** (XSS via unescaped `</style>` in stringify):
  build-time tooling, not a production-serving runtime path. Rides the Next 16 fix.
- **Moderate — `uuid <11.1.1`** via `@react-three/drei` (buffer bounds check):
  drei is used by treasury 3D UI pages, not the gate. `npm audit fix` (non-breaking)
  clears it — safe to run in a maintenance pass.

## 4 · SECRETS SWEEP
- **City** (all tracked files): **clean.** Matches for key/token patterns were all
  false positives — the search tokenizer, GitHub Actions `id-token: write`, and
  THE MARK's "serve-token" docs. No `.env`, no `.pem`/`.key`, no bodies (per 12-A).
- **Treasury** (tracked, excl. `node_modules`): **clean.** No hardcoded live
  secrets. Every credential is read via `process.env.*` (ANTHROPIC_API_KEY,
  ELEVENLABS_*, MONGODB_URI, PINECONE_API_KEY, RESEND_API_KEY, GATE_LOG_SALT) —
  the correct pattern. No `.env` tracked. **Minor flag:** `.gitignore` matches
  `.env*.local` but not a bare `.env` — add `.env` to be safe (nothing is exposed
  today; this is belt-and-suspenders).

## 5 · WHAT CHANGED
- `index.html`: `<meta>` CSP added; importmap gains an enforced `integrity` for
  three. Full 11-pose battery re-run green (below). Live == HEAD md5-proven.
- No treasury code changed this pass (audit is a census; the two flags above are
  handed to the Seer, not silently patched).
