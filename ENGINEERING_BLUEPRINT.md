# THE ETERNAL CITY — ENGINE ENGINEERING BLUEPRINT (v1.0, engine-agnostic)
> Hand this to ANY builder — Claude, GPT, Gemini, Grok, a human engineer.
> Read it top to bottom before you touch a single line. The city is real,
> live, and law-bound. You are not starting a project; you are joining a
> disciplined build with a memory and a conscience. Obey the laws; the
> laws win over your own taste and over the reference boards.

═══════════════════════════════════════════════════════════════════════
## 0. IF YOU READ NOTHING ELSE
═══════════════════════════════════════════════════════════════════════
- **What it is:** a single-file, walkable, first-person 3D "New Jerusalem"
  — white marble and living gold under a perpetual golden hour — built on
  Three.js r160, deployed static to GitHub Pages. One `index.html`,
  ~9,600 lines. No build step, no framework, no bundler.
- **The prime directive:** produce the FEELING of the reference boards
  (`/reference/*.webp`) — GLORY, NOT GLOOM — while holding **50+ FPS
  desktop / 25+ FPS mobile**. Beauty that breaks the frame rate fails.
  Speed that stays ugly fails.
- **The memory:** `STATE.md` is the build's brain. READ IT FIRST, UPDATE
  IT LAST, every session. Its `LAWS-LEARNED` are permanent — never delete,
  only add.
- **The method:** you work in ONE ascent LOOP (see §5). You SEE the build
  on real glass, compare to the boards, fix the single biggest gap, VERIFY
  (frame rate + zero errors + no regression), keep only if obviously
  better, then seal.
- **Seat 0 is THE SEER (Jason).** He rules. Anything canon-level, anything
  destructive, anything published beyond a sealed work order → stop and
  ask him.

═══════════════════════════════════════════════════════════════════════
## 1. THE REPO
═══════════════════════════════════════════════════════════════════════
| Fact | Value |
|---|---|
| Local path | `~/projects/eternal-city` |
| GitHub | `amulektwo/eternal-city` (branch `main` is the live truth) |
| Live URL | `https://amulektwo.github.io/eternal-city/` |
| Engine | Three.js **r160**, loaded via inline `<importmap>` from jsDelivr CDN **with SRI hashes** (do not bump the version or break the hash without a battery) |
| Post-processing | `EffectComposer` (bloom + a display-space grade pass) |
| Model loading | GLTF + DRACO (decoder from the same CDN) |
| Build step | **NONE.** It is a static single file. Serve it and open it. |
| Deploy | **THE HERALD** — `.github/workflows/pages.yml`: on push to `main`, static upload, no Jekyll, md5-verifiable. Push = deploy. |

**Root documents (the deeper canon — read as needed):**
- `STATE.md` — the persistent ledger (the one file you must read + update)
- `LOOP_LIBRARY.md` — the catalog of named ascent loops
- `BLUEPRINT_TRUE_VISION.md` — the master vision + work-order menu
- `HANDOFF_BLUEPRINT.md` / `GHOST_PROTOCOL.md` / `GHOST_ATLAS.md` — builder
  onboarding + the multi-builder protocol + the per-mesh census
- `MESHY_RUNBOOK.md` — the GLB hero-model deposit pipeline
- `PERIMETER_LEDGER.md` — the security/CSP/SRI perimeter record
- `reference/README.md` — what each visual board teaches

**Directory map:**
```
index.html            the entire engine (geometry, physics, shaders, UI)
STATE.md              the build's memory — read first, write last
reference/*.webp      the Seer's visual law (the destination)
data/scrolls/         VERBATIM scripture bodies — READ-ONLY (Law 4)
data/index.json       the scroll index (rebuilt, cache-busted by DATA_VERSION)
assets/models/        GLB heroes + manifest.json (zero-code slot system)
assets/textures/      CC0 PBR sets  ·  assets/hdri/  the IBL dome
assets/LICENSES.md    provenance for every CC0 asset (keep it honest)
tools/*.mjs           scroll index + elder-treasury healing tools
.github/workflows/    pages.yml (THE HERALD deploy)
```

═══════════════════════════════════════════════════════════════════════
## 2. THE GLOSSARY
═══════════════════════════════════════════════════════════════════════
| Term | Meaning |
|---|---|
| **The Seer / Seat 0** | Jason Tierney. The only human. Rules, seals, canon. Absolute. |
| **A Loop** | One scoped ascent pass (e.g. "Loop 35 — THE LIBRARY HOUSE"). The unit of work. Named, ledgered, sealed. |
| **The boards** | The reference images in `/reference/`. The destination the build is measured against. |
| **The battery** | The verification suite run before any seal: frame rate at every vantage, zero console errors, no regression, scripture-integrity SHA. |
| **P.\* pools** | Merged material batches (`P.white`, `P.gold`, `P.glow`…). New geometry FOLDS into these — the Zero-Draw-Call Principle. |
| **The Herald** | The GitHub Pages deploy workflow. md5-verifiable, deterministic. |
| **`__CITY`** | The in-page debug/test API on `window` — your hands and eyes for verification (see §4). |
| **Reveal-gating** | Station/vault dressing appears at ~15m and costs nothing when hidden — the city's weight does not grow with its detail. |
| **The reconciler (Law 32)** | The ONE builder who folds a lane branch into `main`, batteries the union, deploys, md5-proves. |
| **The sacred silence** | The city is intentionally SILENT (Scroll 889.14). Do NOT add audio. |

═══════════════════════════════════════════════════════════════════════
## 3. THE LAWS (binding — they beat your taste AND the boards)
═══════════════════════════════════════════════════════════════════════
1. **THE FEELING IS THE SPEC.** Match the boards' glory. But where a board
   conflicts with a written law, **THE LAW WINS** and you record the
   conflict in STATE.md. (Canonical example: the boards show RED
   lantern-fruit; the **white-gold zero-red fruit law** overrides them.)
2. **FRAME RATE IS A HARD GATE.** 50+ desktop / 25+ mobile at every
   vantage. Report real numbers. A beautiful change that drops the frame
   rate is reverted, not shipped.
3. **ZERO-DRAW-CALL PRINCIPLE.** New procedural geometry MUST fold into
   the existing merged `P.*` pools; repeated elements MUST use
   `InstancedMesh`. Target +0 draw-call delta. Triangle caps: **≤700k
   exterior / ≤350k interior.**
4. **SCRIPTURE IS VERBATIM AND READ-ONLY.** `data/scrolls/` is sacred text.
   Never alter a character. The reader presents it; it never edits it.
   Integrity is proven by SHA (the "144-SHA" gate — a keystone scroll's
   hash must stay exact across a build).
5. **REVEAL-GATE THE DETAIL.** Interior/station dressing renders only when
   near (≈15m) and near-free when hidden. Don't add always-on cost.
6. **KEEP ONLY IF OBVIOUSLY BETTER.** If a change isn't clearly an
   improvement against the boards + the previous frame, `git revert` it and
   say so in the ledger. No regressions, ever.
7. **THE LEDGER IS THE RECORD.** If it isn't written in STATE.md with its
   proof (frame rate, draws, screenshots, SHA), it didn't happen.
8. **ZOOM-OUT LAW.** If a gap survived two passes, do NOT patch it a third
   time — diagnose the underlying SYSTEM (material rig, lighting rig, post
   stack, collision) and fix the architecture.
9. **THE SILENCE STANDS.** No audio, ever, unasked (Seer's decree).
10. **SEAT 0 GATES CANON.** New canon, destructive acts, credential/asset
    changes, or anything beyond a sealed work order → stop, ask the Seer.

═══════════════════════════════════════════════════════════════════════
## 4. `__CITY` — THE DEBUG API (your eyes and hands)
═══════════════════════════════════════════════════════════════════════
Exposed on `window.__CITY` once the city is running. Use it to teleport,
measure, and verify — never trust the code, watch it work.
```
// POSITION & LOOK
__CITY.setPos(x,y,z)   __CITY.setYaw(a)   __CITY.lookAt(x,z)
__CITY.pos             __CITY.cam         __CITY.area   __CITY.paused=false

// PERFORMANCE (report these in the battery)
__CITY.fps             __CITY.drawCalls   __CITY.triangles
__CITY.tier            __CITY.setTier(0|1|2)   __CITY.watchdog

// LIGHT / GRADE (freeze the hour for consistent screenshots)
__CITY.setHour(0.5)    __CITY.grade(0..1)   __CITY.hour

// STATIONS / VAULTS / CENSUS
__CITY.vaults          __CITY.stations    __CITY.houses   __CITY.census()

// THE READER (scripture) — regression check
__CITY.reader.open     __CITY.reader.id   __CITY.reader.body   // verbatim string

// COLLISION TRUTH (audit walkability WITHOUT driving keys)
__CITY.wayBlocked(x,z) __CITY.wayRoute(x0,z0,x1,z1)   __CITY.walkThere(id)

// FLIGHT (the aerial vantage)
__CITY.enterAerial()   __CITY.startFlightReturn()   __CITY.flyToGate(i)
__CITY.tours           __CITY.startGrandTour(key)
```
**Landmine:** the city gates behind a **click-ENTER pointer-lock** intro.
Synthetic `KeyW` presses often do NOT drive `stepPlayer` in an embedded/
headless pane. **Audit colliders with `wayBlocked`/`wayRoute`** (the same
map the walker obeys) rather than fighting synthetic movement.

═══════════════════════════════════════════════════════════════════════
## 5. THE ASCENT LOOP (how ALL work is done)
═══════════════════════════════════════════════════════════════════════
```
1. READ    STATE.md (inherit every LAW-LEARNED) + reference/README.md.
2. SERVE   python3 -m http.server 3230 --directory ~/projects/eternal-city
           open http://127.0.0.1:3230/index.html  → click ENTER.
3. SEE     Screenshot the key vantages: Gate Plaza, Street of Gold,
           Fountain Court, Tree of Life Plaza, Great Sanctuary, Throne
           Hall, Waterfall Terrace. (setHour(0.5) for a stable read.)
4. COMPARE Against /reference/. Name the 3 biggest FEELING gaps
           (materials? light? ornament? atmosphere? life?) IN WRITING
           before touching code.
5. FIX     Fix ONE gap. Treat current build as index 100; land 120+.
           Fold geometry into P.* pools. Obey every law in §3.
6. VERIFY  Re-screenshot the SAME vantages. Zero console errors. Frame
           rate 50+/25+ everywhere (report numbers). Reader + navigation +
           tour regression intact. Colliders audited (wayBlocked/wayRoute).
7. KEEP-IF-BETTER  Obvious improvement → keep. Else `git revert` and log why.
8. ENCODE  If you fixed a recurring class of problem, write it into
           STATE.md → LAWS-LEARNED (permanent).
9. UPDATE  STATE.md: current state, this loop's entry, frame rate, carried
           flags, weaknesses re-ranked.
10. SEAL   git add -A && git commit -m "LOOP NN — <name>" && git push
           (push = THE HERALD deploys). Verify live md5.
```

═══════════════════════════════════════════════════════════════════════
## 6. THE PHYSICS & MATERIAL SYSTEM (what you must not break)
═══════════════════════════════════════════════════════════════════════
- **Ground height** is resolved by `groundAt(x,z)` evaluating an array of
  `platforms.push((x,z)=>height | -Infinity)` closures. `-Infinity` = the
  player falls into the cloud void. Every walkable ramp/step/bridge
  registers a platform closure.
- **Colliders**: `addCircle(x,z,r)` for solids; `resolveCollisions(pos,vel)`
  enforces them. World edge: `RAIL_R = 127.4` clamp (`CITY_R = 130`), which
  **stands down over the 12 gate-highway corridors** (`k·π/6`) so pilgrims
  can walk out to the overlooks (`r → ~180`).
- **Tiers + watchdog**: three quality tiers with a live FPS watchdog that
  degrades to hold the floor on weak hardware. Never assume desktop.
- **New corridors must be re-audited against ALL standing clamps** — a
  bridge built through an older rail clamp will silently be unwalkable.

═══════════════════════════════════════════════════════════════════════
## 7. THE MULTI-BUILDER PROTOCOL (Law 32 — critical)
═══════════════════════════════════════════════════════════════════════
Several AI builders work this city in parallel on lane branches
(e.g. `claude/<feature>`, `<feature>-wip`, scroll-standardization lanes,
the Ghost builds). **To avoid clobbering another builder:**
1. Work on a **lane branch**, never straight on `main` for anything large.
2. **BEFORE reconciling: `git fetch origin` and check if `main` moved.**
   Another builder may have advanced it. Fast-forward / rebase onto the
   latest `main`.
3. Confirm your own work is an ANCESTOR of `origin/main` before adding on
   top: `git merge-base --is-ancestor <your-commit> origin/main`.
4. Your lane must touch only its own surface (a geometry loop touches
   `index.html` + `STATE.md`; a scripture lane touches `data/` — they must
   not collide).
5. **ONE reconciler** folds a lane to `main`, batteries the UNION, lets
   THE HERALD deploy, and md5-proves the live result.
6. If `main` is already ahead of your branch and contains your work — it's
   already reconciled. **Do not force or reset.** Verify and report.

═══════════════════════════════════════════════════════════════════════
## 8. ESCALATE TO THE SEER (do not self-decide)
═══════════════════════════════════════════════════════════════════════
- New canon (a new structure's meaning, a doctrine, a name).
- Anything that would alter `data/scrolls/` content.
- Reopening a sealed law or a sealed design direction.
- Bumping the Three.js version / changing the SRI or CSP perimeter.
- Deleting data, force-pushing, or any irreversible act.
- Adding audio (forbidden by decree — never without his word).
Reversible build choices downstream of a sealed loop: decide yourself,
record in STATE.md, and move.

═══════════════════════════════════════════════════════════════════════
## 9. HOW TO KNOW YOU DIDN'T BREAK IT (the ritual)
═══════════════════════════════════════════════════════════════════════
1. Serve + open + ENTER → the city renders (draws ~150-300, tris in the
   hundreds of thousands — NOT ~500; ~500 means it hasn't started).
2. Zero console errors on load AND during movement.
3. Frame rate 50+/25+ at every vantage (`__CITY.fps`), reported.
4. Reader deep-link opens verbatim scripture (`?scroll=<id>` →
   `__CITY.reader.body` non-empty).
5. Navigation + shelf pagers + the grand tour + flight enter/return all
   still work.
6. Colliders audited via `wayBlocked`/`wayRoute`; new solids block, mouths
   pass, routes go around.
7. STATE.md updated with proof. Commit + push. Confirm the live md5 moved.

*Where the reference and the law disagree, the law wins — and you write
the conflict down. That sentence is the whole discipline.*
