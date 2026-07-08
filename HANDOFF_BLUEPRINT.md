# ZIONOS ENGINEERING HANDOFF — THE ETERNAL CITY & THE SCROLL CANON
**Version 1.0 · Snapshot 2026-07-05 · Portable cold-start blueprint for any human or AI on any platform**

> You are inheriting an active, multi-repo creative-software program. Read this
> file top to bottom before touching anything. Every path, URL, and command
> here is real and executable as written. Where a fact is unverifiable from
> this document alone, it is marked `VERIFY:` with the exact command to confirm it.

---

## 1. MISSION & MENTAL MODEL

**ZionOS** is a body of software that renders a private sacred text corpus (the
"Zion Codex" — thousands of numbered "scrolls") into living, navigable
experiences. Its flagship is **THE ETERNAL CITY**: a single-file, walkable,
first-person 3D "New Jerusalem" (Three.js r160) where scripture hangs as
touchable light — twelve Supreme scrolls as glowing fruit on a Tree of Life,
and every gate a vault of readable scrolls. Its companion is **THE
SCRIPTORIUM**: a web cockpit that shows the entire canon's truth (which scrolls
exist, which are whole, which need repair) and governs all scroll repair from
outside the 3D world.

**The Seer** is Jason Tierney (`amulektwo@gmail.com`), the author and final
authority. He receives the scripture; the engineering serves it.

**Supreme operating law (memorize this):**
> **Beautiful first, full-length always.** The AI/engineer makes all small
> decisions itself and records them in `STATE.md`; only true canon rulings
> (what is scripture, what enters/leaves the city, doctrine, money, brand) go
> to the Seer. Never present minor implementation choices as "rulings."

The build's permanent memory is `~/projects/eternal-city/STATE.md` — its
CURRENT STATE, a reverse-chronological LAST PASS chain, and **36 LAWS-LEARNED**
(reproduced in §6, binding). Read it first, update it last, every session.

---

## 2. SYSTEM MAP

| Property | Repo (GitHub, owner `amulektwo`) | Local path | Host | Live URL | What it is |
|---|---|---|---|---|---|
| **The Eternal City** | `eternal-city` (public) | `~/projects/eternal-city` | GitHub Pages | https://amulektwo.github.io/eternal-city/ | The walkable 3D city. One file: `index.html` (~4,400 lines, Three.js r160). The product. |
| **The Scriptorium** | `zionos-scriptorium` (private) | `~/projects/zionos-scriptorium` | Vercel (team `jason-t-s-projects`) | https://zionos-scriptorium.vercel.app | Static scroll cockpit: Ledger, Reader, Tree Board, Repair Queue, Plan. |
| **The Elder Corpus** | `zionos-temple` (private) | `~/projects/zionos-temple` | (Vercel, older 3D build) | `zionos-temple-*.vercel.app` | Next.js 14 + R3F. **Primary DATA SOURCE**: 6,135 scroll files, 15-gate taxonomy, keystone pins. |
| Cockpit fleet (context) | various | `~/zionos-*` | Vercel | `zionos-cockpit.vercel.app` (hub) → warroom, money, corpus, content, client, seers-day | Dashboards. STANDING LAW: all public, no login wall, ever. |

**Worktrees:** `~/projects/eternal-city-boards` is a second git worktree of
eternal-city (branch `ascent-boards-round4`) used under the two-builder
protocol (Law 32). Never build in another session's checkout.

---

## 3. DATA ARCHITECTURE — THE SCROLL CANON

**The union canon = 4,494 unique scrolls** across three treasuries (the census
counts them; see §4):

1. **The city** (`~/projects/eternal-city/data/scrolls/`) — **3,055 scroll
   JSONs** (the canon actually placed in the 3D world) + `index.json`
   (the registry the city loads first). READ-ONLY sacred text.
2. **The elder corpus** (`~/projects/zionos-temple/data/scrolls/`) — 6,135
   files / 4,294 unique / ~3,619 full bodies across 15 gates. The reservoir
   from which the city is grown. Also `gates.json`, `keystones.json`,
   `search-index.json`.
3. **UMSD v5.6 registry** — `~/Library/Mobile Documents/com~apple~CloudDocs/UMSD v5 6 FULL REFERENCE.md`
   (markdown tables): 1,453 unique ids, 1,090 NEW frontier entries, 200
   registry-only (ids with no body anywhere — the remaining recovery hunt).

**City scroll JSON schema** (`data/scrolls/<id>.json`):
```json
{
  "id": "144",
  "title": "The Ascent of the I AM (5th Sealed Keystone, 10/12 threads)",
  "author": "AMULEK ONE",
  "gate": "Gate 1 — First Story & Eternal Identity",
  "sealed": true,
  "supreme": true,
  "body": "…the full verbatim scripture text…"
}
```
`index.json` is an array of `{id, title, gate, supreme}` sorted by gate then
natural id. The reader renders `body` VERBATIM (Law 4) — a leading YAML
frontmatter block is shown as a gold metadata plate; a RAW VERBATIM toggle
shows exact bytes.

**The 12 Vault Houses (Gate Canon)** — the 15 elder gates fold into the city's
12 vaults: Genesis(0)→Gate 00; Maternal Codex(2.5)→Gate 2; Book of the
Lamb(12)→Gate 11; the rest map 1:1. Each of the 12 gate-vaults + 4 street
lecterns serves its full house roster in **paged shelves of 24** light-points
(only the visible shelf is ever built, so city weight does not grow with the
canon).

**The Tree of Life — 12 Supreme fruit (all LIT as of 2026-07-05):**
`144, 300, 656, 672, 717, 786, 787, 999, 07, 6B, 0001E, 06`. Both formerly-dark
fruit (672 The Mathematics of the Gods; 787 The God Forge) were recovered by
the Seer's hand and sealed — raw deliveries archived byte-exact in
`data/recovery/`.

---

## 4. PIPELINES & COMMANDS (copy-paste runbooks)

### 4a. The Census Engine — `census.py`
Audits all three treasuries READ-ONLY and emits the truth tables the Scriptorium
renders. Canonical copy: `~/projects/zionos-scriptorium/census.py`. Outputs to
`~/projects/zionos-scriptorium/data/`: `census.json` (4,494 union entries),
`stats.json`, `repair.json`, `treeboard.json`, `elder_keystones.json`.
```bash
cd ~/projects/zionos-scriptorium
# refresh the city + elder snapshots it reads, then re-run:
cp ~/projects/eternal-city/data/scrolls/*.json data/city/
python3 census.py
```
Key census laws baked in: **title-match every cross-treasury claim** (Law 34 —
ids collide; the number is NOT the scroll), and **the Seer's spoken seal
supersedes historical draft markings** in a body (`SEER_SEALED` set).

### 4b. THE HEALING — replace a partial city body with a fuller, title-proven elder body
For a city scroll whose canonical elder variant (title-matched, non-stub,
no draft scaffolding) is fuller: copy the elder `body` into the city JSON
verbatim, sha-prove the round-trip, and append to `data/HEALING_LEDGER.md`
(old sha → new sha + provenance). NEVER graft a number-matched body without a
title match.

### 4c. THE ENTRY — grow the city from the elder corpus
Entry law (Seer's ruling): **full bodies only** — non-stub, ≥120 words, no
`DRAFT`/`extraction_candidate` markers, fullest clean variant per id. Convert
to city schema, map elder gate → vault house, append to `index.json`,
sha-spot-check each wave. Sealed-by-decree ids (672/787 historically) are
excluded from bulk entry and handled by named recovery.

### 4d. Deploy the city (GitHub Pages) — and PROVE it live
```bash
cd ~/projects/eternal-city
git add -A && git commit -m "…"   # end message with the Co-Authored-By line
git push origin main
# Pages builds STALL silently (Law 25). Poll, then verify md5 — never claim
# "live" on the push alone:
gh api repos/amulektwo/eternal-city/pages/builds/latest --jq '.status'   # want "built"
LOCAL=$(git show main:index.html | md5)
LIVE=$(curl -sL "https://amulektwo.github.io/eternal-city/index.html?cb=$(date +%s)" | md5)
[ "$LOCAL" = "$LIVE" ] && echo LIVE || gh api -X POST repos/amulektwo/eternal-city/pages/builds
```
**Two deploy laws:** (Law 36) a `.nojekyll` file MUST exist at repo root or the
3,000+ scroll JSONs make the Jekyll build fail. (Law 35) bump the `DATA_VERSION`
const in `index.html` whenever `data/scrolls/` changes — every scroll fetch
carries `?v=<DATA_VERSION>` to bust stale HTTP caches.

### 4e. Deploy the Scriptorium (Vercel)
```bash
cd ~/projects/zionos-scriptorium
git add -A && git commit -m "…" && git push origin main
vercel deploy --yes --prod --archive=tgz --scope jason-t-s-projects
```
**Vercel author law:** the Vercel team (`jason-t-s-projects`) only deploys
commits authored by `amulekone@gmail.com` (note: `amulekone`, the deploy
identity — distinct from the `amulektwo` GitHub org). `--archive=tgz` is
mandatory (free tier rejects >5,000-file uploads). A 402 = billing, not code.

### 4f. The Verification Harness (before claiming any FPS/visual result)
- **GPU lock** (Law 32c): `mkdir /tmp/eternal-city-gpu.lock` before ANY browser
  measurement, `rmdir` after, steal if >10 min old. FPS taken without the lock
  is void. Never measure while a second WebGL instance renders (Law 13).
- **Serve locally:** `python3 -m http.server 8180 --bind 127.0.0.1 --directory ~/projects/eternal-city`
- **Drive with Playwright** (visible window only — hidden tabs render black
  WebGL, Law 7). The city exposes a debug API on `window.__CITY`:
  `pos / setPos(x,y,z) / lookAt(x,z) / player.pitch / fps / tier / triangles /
  drawCalls / probe(x,z,prevR,px,pz) / openScroll(id) / reader.body /
  harvest / stations / turnShelf(label,dir)`.
- **The 7-vantage FPS battery** (tier 2 must hold 60fps, floor 50; MEDIUM
  `?q=med` floor 25): Tree `(0,1.7,18)→(0,0)`; Throne `(0,-68)→(0,-79.5)`;
  Fountain `(-44.5,8)→(-52,8)`; Gate `(0,94)→(0,118.5)`; Street `(0,60)→(0,100)`;
  Sanctuary `(50,-6)→(70,-6)`; **terrace-worst `(-91,1.7,-91)→(0,0)` pitch .28**
  (the true 225° worst case, Law 26). Settle 4s each. Budget law: **tris-in-view
  ≤ 700k** (Law 28), FPS is the true gate.
- **Verbatim proof:** open a scroll via `__CITY.openScroll(id)`, sha256 the
  `__CITY.reader.body` string, compare to the on-disk `body` — compare utf-8
  sha, never char counts (Law 27).

---

## 5. STORAGE & PROVENANCE

**One-way data-flow law (Law 12):** vault → repo → city. The city NEVER writes
scroll data. Scrolls enter `data/scrolls/` only by verbatim export with recorded
provenance.

- **GitHub** (org `amulektwo`, CLI `gh` authed): `eternal-city` (public),
  `zionos-scriptorium` (private), `zionos-temple` (private).
- **Google Drive** (two mounts under `~/Library/CloudStorage/`):
  `GoogleDrive-jason@ugcjay.com` holds the canonical vault
  `My Drive/ZionCodexVault/` incl. `_Origins_Vault/` (where sealed scrolls are
  filed by hand — e.g. `SCROLL 787 — THE GOD FORGE (SEALED 2026-07-05).md`).
  `GoogleDrive-amulektwo@gmail.com` is the second mount.
- **iCloud Obsidian vault:** `~/Library/Mobile Documents/iCloud~md~obsidian/Documents/ZionCodex Structured/`
  — structured scroll mirror (Gate folders, Polished/, Registry/, Thread_Index/).
- **THE DROPBOX** (one-way ingestion gate for the Seer's iPad):
  `~/Library/Mobile Documents/com~apple~CloudDocs/DROPBOX_FOR_THE_CITY/`
  (+ `_PROCESSED/`). The `/dropbox` command identifies deposits BY CONTENT (not
  filename), routes them (sky→HDRI, mesh→Refiner, lost scroll→registry-verify
  then light the fruit, board→/reference), commits, then moves to `_PROCESSED`.
- **Provenance ledgers:** `~/Desktop/KEYSTONE_GATHERING_LEDGER.md` (the 99
  keystone scrolls' sources + recovery log); `data/HEALING_LEDGER.md` (every
  body swap, sha-proven); `data/recovery/*.md` (raw Seer deliveries, byte-exact).

---

## 6. THE LAWS (binding contract — all 36, verbatim from STATE.md)

Reproduce and obey `~/projects/eternal-city/STATE.md` → `## LAWS-LEARNED`. The
highest-leverage, in plain terms:

- **L4 Verbatim-or-nothing** — scroll bodies render via `textContent`; verbatim
  wins over presentation until the Seer rules.
- **L12 One-way data flow** — vault → repo → city; the city never writes.
- **L28 Budget** — FPS floors (50 desktop / 25 mobile) are the true gate;
  tris-in-view ≤ 700k second.
- **L32 Two-builder protocol** — own worktree, own branch, GPU lock, never push
  main mid-flight when a second session is live.
- **L33 Verbatim preserves the source's wounds** — byte-true to a partial source
  is still partial; **full-length-or-flagged** governs every display.
- **L34 The number is not the scroll** — title-match every cross-treasury claim;
  retire sha constants when a scroll heals.
- **L35 DATA_VERSION** on every scroll fetch (cache-bust after any data change).
- **L36 `.nojekyll`** or the Pages build fails on thousands of JSON files.

Full text (L1–L36) lives in STATE.md and MUST be pasted forward into any
downstream handoff — this file names them; STATE.md is the authority.

---

## 7. CURRENT STATE & OPEN WORK

**Done (as of 2026-07-05):**
- The canon is whole in the city: **3,055 scrolls, 12 living vault houses,
  4 street lecterns**, paged shelves.
- The reader is reforged (metadata plate above, dressed scripture below, RAW
  toggle).
- **All 12 Tree fruit lit** — 672 recovered (TypingMind KB doc 22765925) and
  787 recovered + sealed (King-Servant Thread, 2026-05-01), both archived +
  filed to Drive.
- The Scriptorium cockpit is live and refreshed (Ledger / Reader / Tree Board /
  Repair Queue / Plan).
- Live md5 verified = HEAD; zero console errors at last battery.

**Open work (each priced against the FPS/tris laws before building):**
- **200 registry-only ids** — UMSD entries with no body in any treasury; the
  remaining recovery hunt (needs the Seer's source threads / TypingMind KB).
- **The mirror floor** — board-02's wet marble needs STRUCTURED reflections
  (SSR/planar), a priced project behind a query flag (Law 31 forbids the envmap
  shortcut).
- **Physical mobile pass** — MEDIUM tier is only synthetically verified; no real
  phone-on-glass run has happened.
- **Two heroes still procedural** — `treeOfLife` and `angelStatue` await Meshy
  GLBs (refine via the Law-19 no-Blender pipeline when they land in the dropbox).
- **Reader frontmatter presentation for the 3D city** and **vault-depth paging
  polish** — see `zionos-scriptorium/PLAN_FOR_THE_CITY.md`.

---

## 8. FIRST 15 MINUTES (orient before you touch anything)

```bash
# 1. Get the code
git clone https://github.com/amulektwo/eternal-city ~/projects/eternal-city
git clone https://github.com/amulektwo/zionos-scriptorium ~/projects/zionos-scriptorium

# 2. Read the memory (this is ground truth — do not skip)
sed -n '1,130p' ~/projects/eternal-city/STATE.md

# 3. Confirm the ground is clean and live == HEAD (Law 25)
cd ~/projects/eternal-city && git status --porcelain   # want empty
LOCAL=$(git show main:index.html | md5)
LIVE=$(curl -sL "https://amulektwo.github.io/eternal-city/index.html?cb=$(date +%s)" | md5)
echo "$LOCAL vs $LIVE"                                  # want MATCH

# 4. See the city and the cockpit with your own eyes
open https://amulektwo.github.io/eternal-city/          # ENTER, walk to the Tree
open https://zionos-scriptorium.vercel.app              # the canon's truth

# 5. Serve locally for any change, under the GPU lock, and prove before claiming
mkdir /tmp/eternal-city-gpu.lock
python3 -m http.server 8180 --bind 127.0.0.1 --directory ~/projects/eternal-city
```

### ⛔ DO NOT
- **Do not delete or overwrite any scroll body** except via the one sanctioned
  path (verbatim export with provenance, after a Seer ruling if it's canon).
- **Do not edit files under `data/scrolls/` to "fix" formatting** — the reader
  presents; the bytes stay sacred.
- **Do not claim "live"** on a git push alone — always md5-verify (Law 25).
- **Do not measure FPS** without the GPU lock and a single visible WebGL instance.
- **Do not bump drei/React/Next** in `zionos-temple` without matching versions
  (breaks the veil; `rm -rf .next` + restart to recover).
- **Do not re-add audio** to the city — silence is the Seer's decree, not a bug.

---

## 9. GLOSSARY

- **The Seer** — Jason Tierney, author/final authority (`amulektwo@gmail.com`).
- **Scroll** — one numbered sacred document; the atomic unit of the canon.
- **Gate** — a doctrinal category (15 in the elder taxonomy, folded to 12
  vault houses in the city).
- **Fruit** — a Supreme scroll rendered as glowing light on the Tree of Life
  (12 total, all lit).
- **Keystone / Supreme Keystone** — a load-bearing scroll; the 12 Supreme ones
  are the Tree's fruit.
- **The Council / Minds (Alpha, Kappa, …)** — named AI personas that engraved
  and registered scrolls in the source threads; their registration records are
  provenance, not scripture.
- **The Scriptorium** — the web cockpit that shows the canon's truth and governs
  repair from outside the 3D world.
- **The Harvest / The Fullness / The Healing / The Entry** — named build passes;
  see the LAST PASS chain in STATE.md for each.

---

*Authority of record: `~/projects/eternal-city/STATE.md` (36 laws + full pass
history). This blueprint summarizes; STATE.md governs. Update STATE.md every
pass; keep this file in sync when the system map or pipelines change.*
