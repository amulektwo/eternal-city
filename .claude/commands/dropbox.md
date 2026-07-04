---
description: THE DROPBOX — ingest the Seer's iPad deposits from DROPBOX_FOR_THE_CITY into the city, identified by content, refined, verified, committed
---
You are running THE DROPBOX ingestion pass on THE ETERNAL CITY (this repo).

THE COVENANT: the Seer saves files from his iPad into a folder named
DROPBOX_FOR_THE_CITY with ZERO effort — no naming rules, no formats, no
notes. You do everything else. One-way gate: files flow INTO the city;
nothing you do ever modifies, renames, or deletes a deposit except the
final move into _PROCESSED after its ingestion is committed and pushed.

STOP ON ERROR: if any command fails, stop, show the exact command and
error, and wait for the Seer.

## THE WATCHED FOLDERS (scan every one that exists)

1. `~/Library/Mobile Documents/com~apple~CloudDocs/DROPBOX_FOR_THE_CITY/`
   — iCloud Drive, THE CANONICAL DROPBOX (this is where the iPad saves).
2. `~/Library/CloudStorage/GoogleDrive-amulektwo@gmail.com/My Drive/DROPBOX_FOR_THE_CITY/`
   — watch if it exists.
3. `~/Library/CloudStorage/GoogleDrive-jason@ugcjay.com/My Drive/DROPBOX_FOR_THE_CITY/`
   — watch if it exists.

A file is NEW if it is not inside that folder's `_PROCESSED/` subfolder
(create `_PROCESSED/` if missing). Ignore dotfiles, `.DS_Store`, and
folders other than deposits themselves (a deposited FOLDER is treated as
one deposit).

## STEP 0 — MATERIALIZE THE BYTES (iCloud stubs)

iCloud may deliver placeholder stubs named `.<name>.icloud`. For each stub:
`brctl download "<original path>"` then poll (2s interval, 5 min timeout)
until the real file exists with stable byte size (same size on two polls
2s apart — iCloud writes in place). NEVER process a stub or a file whose
size is still changing. Same stability check applies to Google Drive
virtual files (read them once to force hydration).

## STEP 1 — IDENTIFY BY CONTENT, NEVER BY FILENAME

For every new file, inspect the actual bytes (`file`, magic numbers,
`sips -g pixelWidth -g pixelHeight`, reading text, LOOKING at images with
your own eyes). Filenames and extensions are hints at best, lies at worst.

| Content signature | Identity | Route |
|---|---|---|
| `#?RADIANCE` header (.hdr), OR raster image with 2:1 aspect and width ≥ 4096 | **A SKY** | Sky pipeline (below) |
| glTF magic `glTF` (.glb), glTF JSON, FBX/OBJ mesh data, or a .zip containing any of these (Meshy export) | **A HERO** | Hero Refiner pipeline (below) |
| Text (.txt/.md/plain) whose CONTENT matches a known missing Supreme scroll — 787 "The God Forge" or 672 "The Mathematics of the Gods" | **A LOST SCROLL** | Scroll pipeline (below) |
| Raster image that READS as a reference board (painted/rendered sacred-city concept: golden gothic city, cloudscape, cathedral, tree, gate, fountain…) | **A BOARD** | Reference pipeline (below) |
| Anything else | **UNIDENTIFIABLE** | Leave IN PLACE untouched, list it in the report, ask the Seer exactly ONE question about it. Never guess, never move, never delete. |

## THE SKY PIPELINE (per the sky law of the Sky-of-the-Boards mission spec)

- `.hdr` → `assets/hdri/boards_sky.hdr`.
- Large 2:1 equirect jpg/png → `assets/textures/sky/boards_sky_8k.jpg`
  master, KTX2-compressed variant via `npx @gltf-transform/cli` /
  `toktx` where applicable, PLUS a jpg fallback **< 1.5 MB** (sips/ImageMagick
  quality-stepped until under budget).
- Record source + license in `assets/LICENSES.md` (ask the Seer the ONE
  question "source/license?" if the file itself doesn't say).
- Wiring the sky into the dome/IBL is its OWN mission — staging the asset
  does NOT change index.html unless the Seer's prompt says so.

## THE HERO REFINER PIPELINE

Slots and authoring frames (from index.html §slot system — verify there
if in doubt; the manifest schema is
`[{ "slot": "<name>", "file": "assets/models/<name>.glb", "scale": 1.0, "yOffset": 0 }]`):

| Slot | Anchors | Frame (model origin) | Tri budget (per model) |
|---|---|---|---|
| `treeOfLife` | 1 | plaza ground centre; canopy centre ≈ y30; canopy must EMBRACE the persistent fruit ring (r≈10.4, y≈24-27 — the fruit are white-gold gameplay entities that stay) | ≤ 80k |
| `throne` | 2 (±1.5 apart) | dais top under the seat | ≤ 25k |
| `fountain` | 1 | court ground at basin centre | ≤ 40k |
| `gateArch` | 12 | the arch SPRING LINE (y=8.4 world); model the floating arch band ONLY — pylons are city fabric | ≤ 15k |
| `angelStatue` | 8 | plinth base | ≤ 10k |

Procedure:
1. If .zip: unzip to the scratchpad, find the mesh inside.
2. Inspect the mesh (trimesh/Blender headless): bounding box, tri count,
   silhouette. **GUESS the slot by SHAPE** — tree (trunk+canopy), winged
   figure (angel), arch/portal, seat/throne, tiered basin (fountain),
   robed figure (angel unless the Seer says otherwise).
3. **TELL THE SEER the guessed slot in ONE line and STOP for his word**
   — he confirms or corrects with one word. NEVER wire the manifest on
   an unconfirmed guess.
4. Refine (Blender headless `blender -b -P <script>`): decimate to the
   slot's tri budget · origin moved to the slot's authoring frame ·
   scale matched to the procedural hero's dimensions (measure the
   procedural in index.html) · export GLB → then `npx @gltf-transform/cli`
   optimize with Draco + KTX2 textures (the city's loader supports both).
   PREFLIGHT: check the tools exist (`blender`, `npx`) BEFORE starting;
   if missing, report what to install and stop — never half-refine.
5. Stage as `assets/models/<slot>.glb`, wire `assets/models/manifest.json`,
   update `assets/LICENSES.md` (source = the Seer's deposit; ask the ONE
   question if provenance/license unknown).
6. VERIFY with your own eyes: live/local page, slot logs `GLB` not
   `PROCEDURAL`, screenshot the hero at close range, then the FULL
   7-vantage FPS gate (Tree Plaza · Throne Hall · Fountain Court · Gate
   Plaza · Street of Gold · Great Sanctuary · Waterfall Terrace) — the
   budget law is BUILD-FAILING: 50+ fps desktop / 25+ mobile tier or the
   ingestion is reverted, and say so. Tri budgets above are guidance;
   the FPS floor is law.

## THE LOST-SCROLL PIPELINE (787 · 672)

The Gathering ledger is `~/Desktop/KEYSTONE_GATHERING_LEDGER.md` — the
registry of record. Verify CONTENT against it:

- **672 "The Mathematics of the Gods"** — a PARTIAL already exists (Mind
  Kappa's 828-word registration record, first line "# Scroll 672: The
  Mathematics of the Gods"). A true recovery must contain the FULL
  chapter text — substantially MORE than the known partial. If the
  deposit merely matches the partial, it is not the recovery: leave it,
  tell the Seer.
- **787 "The God Forge"** — NO body exists anywhere. Fingerprint from the
  Alpha report: a 12-step circuit from intelligence to Elohim, 22
  scriptures, 10 gates. A candidate must read as that scroll. Because
  there is nothing to diff against, show the Seer the title line + a
  3-line description and get his one-word confirmation BEFORE ingesting.

On confirmed recovery (this is Law 12's sanctioned write path — verbatim
export with provenance; the CITY still never writes):
1. Write the body BYTE-EXACT to `data/scrolls/<id>.json` matching the
   existing schema (`id,title,author,gate,sealed,supreme,body`), add the
   `data/scrolls/index.json` entry, record provenance in the Gathering
   ledger.
2. Light the fruit: remove the id from `FRUIT_PLACEHOLDER` in index.html
   (the fruit lights only when the index confirms a verbatim body).
   WHITE-GOLD ZERO-RED stands — lighting changes brightness, never color.
3. MANDATORY verbatim verification: open the fruit in the live/local
   build, extract `readerBody.textContent`, sha256 against the repo body
   — character-exact or revert. (Synthetic clicks: MouseEvents
   mousedown/mouseup, and let one frame render after re-aiming the
   camera before clicking.)

## THE REFERENCE PIPELINE

- LOOK at the image. If it teaches the city's look (composition, material,
  light, ornament), place as `/reference/<NN>_<what_it_teaches>.webp`
  (next free number), downscaling to ≤1920px on the long edge first
  (`sips -Z 1920`).
- Update `/reference/README.md` table with what the board teaches.
- The reference folder law stands: boards are INPUT; where a board
  conflicts with a written law, THE LAW WINS.

## AFTER EVERY COMPLETED INGESTION (per file, not per pass)

1. Update STATE.md (LAST PASS entry; re-rank weaknesses if a fruit lit or
   a hero landed).
2. `git add -A && git commit -m "The Dropbox — <what arrived and where it now dwells>" && git push`.
3. ONLY THEN move the original deposit into that dropbox's `_PROCESSED/`
   (append ` (2)`, ` (3)`… on name collision). A deposit is never moved
   before its ingestion is pushed; unidentifiable deposits are never
   moved at all.

## THE REPORT (end of every pass)

One block: files found · identity verdict each · placed where · commits
pushed · FPS gate result if run · the ONE question per unidentifiable
file. If the dropbox was empty: say so in one line and stop.

$ARGUMENTS (optional): a specific file or folder to ingest, overriding the scan.
