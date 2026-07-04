# STATE.md — THE ETERNAL CITY · PERSISTENT LEDGER

> The build's memory. Every ascent pass reads this first and updates it last.
> LAWS-LEARNED are permanent: never delete, only add.

---

## CURRENT STATE

A single-file (`index.html`, ~3,000 lines) walkable first-person 3D golden city on Three.js r160, live at https://amulektwo.github.io/eternal-city/ — white marble and living gold under a perpetual golden hour. The light and stone are real: kiara_1_dawn HDRI drives the IBL (2k desktop / 1k mobile), Marble021 and Metal034 PBR sets clothe every wall and rim (CC0, recorded in `assets/LICENSES.md`). Five hero landmarks (Tree of Life, thrones, fountain, twelve gate arches, angel statues) are procedural but stand in a zero-code GLB drop-in slot system (`assets/models/manifest.json`). Three quality tiers with a live fps watchdog carry the city from desktop to phone. And as of The Harvest, the city bears its scripture: 95 keystone scrolls sit verbatim in `data/scrolls/` (read-only), ten whole Supreme scrolls hang lit as white-gold fruit on the Tree (one InstancedMesh, one draw call), two hang dark and sealed awaiting their bodies, and each of the twelve gates reveals a vault of its gate's scrolls as points of light — every one opening in a parchment reader that never alters a character of canon.

## LAST PASS

**Ascent pass (pilot of /ascend)** — 2026-07-04. Gaps named against the boards: (1) atmosphere/light depth, (2) life/greenery, (3) eye-level ornament density. Fixed: six god-shafts descending on the Tree (TR-registered), warm sun-radiance term in the sky, THE GARDENS (10 marble-and-gold planters with gold-green foliage + pearl blossoms at the Fountain Court ring r15.4 and the Street, TR-registered instancing), gold garland swags along the street colonnade, six new angel statues (Tree plaza diagonals + gate plaza flanks, all through the heroAngel group so GLB anchors follow), vault plaque de-aliasing (96×1536 canvas, anisotropy 8). Hardened the watchdog (12s arming + stall-frame rejection) after a self-inflicted GPU-contention drop taught Laws 13–14. KEPT: all 7 vantages 60fps tier 2, zero errors, all regressions green. The /ascend command itself installed at `.claude/commands/ascend.md`.

Previous: **The Harvest** — commit `8be2016` ("The Harvest — the keystones dwell in the Tree and the gates"), 2026-07-04.
- Tree fruit rebuilt as ONE InstancedMesh (12 instances; per-instance emissive via instanceColor + onBeforeCompile). White-gold only — zero red.
- 10 lit supreme fruit bound to scrolls: 144, 300, 656, 717, 786, 999, 07, 6B, 0001E, 06. Sealed placeholders (no click target): 672, 787.
- 12 gate-vaults built from `data/scrolls/index.json` (Gate 00→12 taxonomy order): plinth + plaque + helix of selectable light-points, reveal at ~15m. 11 populated, the 12th awaits.
- Parchment reader ported from the old city: Cinzel/Cormorant/EB Garamond, unfurl + seal-break + re-furl, camera glide, `prefers-reduced-motion` static path, Esc guarded against the pause system, body rendered VERBATIM via `textContent`. Deep link: `?scroll=<id>`.
- Verified: 3 fruit full-body character-exact (144: 3,073 chars · 786: 18,171 · 07: 16,731); sealed fruit inert under direct projected clicks; 2 vaults serve the correct gates (731@G00, 0001@G1); all 12 gates pass / walls block; touch parity holds; all 5 GLB slots log; zero console errors; FPS floors held.
- Preceded by **The Data Layer** — `674012f`: the 95 FOUND keystone bodies exported byte-exact from their best sources (provenance: `~/Desktop/KEYSTONE_GATHERING_LEDGER.md`).

## KNOWN WEAKNESSES (ranked, worst first)

1. **Two dark Supreme fruit** — 672 "The Mathematics of the Gods" and 787 "The God Forge" have no verbatim bodies anywhere on disk (787 missing entirely; 672 only a registration record). Recovery requires the Seer's source threads. Until then the Tree is 10/12.
2. **Heroes are still procedural** — all 5 GLB slots empty. The angel statues are the weakest at close range (abstract primitives); the boards demand sculptural angels.
3. **The sky is painted, not volumetric** — a shader dome + sprite clouds; the HDRI lights the city but is not the visible sky. The reference boards' cloudscapes (city floating IN cloud, god-rays through cumulus) are beyond the current dome.
4. **SSAO is benched** (`?ssao=1`, experimental) — three r160 SSAOPass renders a black frame against this scene even in Beauty mode. HIGH tier ships without AO; contact shadowing is carried by the sun + bloom only.
5. **Mobile is synthetically verified only** — MEDIUM tier, joystick, taps all proven via TouchEvent dispatch; no physical-device pass has ever run. The 25fps floor is enforced by the watchdog but unmeasured on real glass.
6. **Vault points are anonymous until opened** — no hover/gaze title, no per-point label; the 12th vault stands empty ("THE VAULT AWAITS ITS SCROLLS").
7. **The reader shows raw frontmatter** — the verbatim law means YAML headers and colophons render as-is above the scripture. Doctrinally safe, liturgically plain. Any presentation layer needs a Seer ruling that it does not violate verbatim-or-nothing.
8. **Street-level ornament density** trails the boards — improved this pass (garlands, 6 more angels, gardens) but the boards still show more statuary and filigree per square meter.
9. ~~Plaque text sprites alias~~ — addressed this pass (96×1536 canvas, anisotropy 8); re-judge at next pass.
10. **The city is silent** — by the Seer's decree (Scroll 889.14: the Sacred Silence). Listed for completeness, not as a defect. Do NOT re-add audio unasked.

## LAWS-LEARNED (permanent — never delete, only add)

1. **Quarry color-law over candidate names** — asset candidates lie; the color law decides. All three named marble candidates were grey/dark; the true white stone (Marble021) was found by searching the law, not the list.
2. **Transfiguration before Heroes, or the heroes stand in dead light** — materials-first ordering. Landmarks built before real light still transfigured only because they shared the master materials; never rely on that twice.
3. **White-gold, zero red on the fruit** (Runbook B) — the Tree's fruit are white-gold emissive only. The reference boards themselves show red lantern-fruit; the law OVERRIDES the boards on this one point. Verifiers check zero red on the Tree.
4. **Verbatim-or-nothing reader** — scroll bodies render through `textContent`, never through markdown/HTML interpretation. If presentation and verbatim conflict, verbatim wins until the Seer rules.
5. **SSAO benched: black-frame law** — three r160 SSAOPass produces a black frame against this scene/pipeline (proven: even OUTPUT.Beauty is black). Never re-enable by default without fixing the pass itself.
6. **1k HDRI feeds the mobile tier** — 2k is desktop-only; the tier system, not the asset, decides.
7. **Hidden tabs freeze rAF and render black WebGL** — never trust FPS or visuals from an occluded tab; verification needs a visible window (deep-links + `?hud=fps` + screenshots).
8. **Background-tab timers throttle to ≥1s** — synthetic tap tests must dispatch down/up synchronously or the 400ms tap window fails falsely.
9. **The return-glide restores yaw/pitch when it ends** — any test (or feature) that re-aims the camera must wait out or account for a closing reader's glide.
10. **One InstancedMesh can carry per-instance emissive** — instanceColor + one-line onBeforeCompile (`totalEmissiveRadiance *= vColor`). One draw call for all twelve fruit.
11. **The probe must be pure** — collision test surfaces take their previous-position from arguments, never from the live avatar (`__CITY.probe(x,z,prevR,prevX,prevZ)`).
12. **Data flows one way: vault → repo → city.** The city NEVER writes scroll data. Scrolls enter `data/scrolls/` only by verbatim export with provenance (the Gathering ledger), and the reader only reads.
13. **Never measure the city while a second instance renders on the same GPU** — the test harness contends with its subject and reads as low fps (a self-inflicted `wd@16s 47fps` drop was traced to a second live tab). Kill every other instance before an FPS verdict.
14. **The watchdog arms at t=12s and ignores stall frames (dt > 0.25s)** — shader-compile/decode jank at startup and single frozen frames are STALLS, not frame rates; only sustained slowness may cost a tier (drops are permanent by design).
15. **Every scene addition must be checked against the citizens' processional paths** (fountain circuits r≈11.2/12.4, street lines x≈±2.2-2.6) — the first garden ring was planted directly on the walkers' circuit and had to move to r15.4.

## FPS RECORD (latest — Ascent Pass 1 goal-gate, 2026-07-04)

**Desktop** (Seer's MacBook, 1280×828 screen, dpr 2, tier 2 HIGH, visible window, `?hud=fps`):

| Area | FPS |
|---|---|
| Tree of Life Plaza | 60 |
| Throne Hall | 60 |
| Fountain Court | 60 |
| Gate Plaza (REUBEN) | 60 |
| Street of Gold | 57 |
| Great Sanctuary | 61 |
| Waterfall Terrace | 60 |

Floor 50 — held everywhere. Watchdog: no organic drops this pass.

**Mobile tier** (MEDIUM, `?q=med` — the mobile default: 1k HDRI, 1024 shadows, half-res bloom, particles halved, pixelRatio ≤1.5): **60 fps** at the Tree Plaza AND the Street of Gold (the heaviest areas) on the test machine — floor 25 cleared 2.4×. Physical-phone-on-glass measurement still outstanding (Known Weakness #5).

**Bezalel goal-gate (Ascent Pass 1): 193/200, no category under 18** — scorecard printed in the session of 2026-07-04; fresh 7-vantage screenshots compared against `/reference/` the same session. Full walkthrough (7 areas · 12 gates+walls · fruit scroll · vault scroll · tier cycle · missing-scroll fallback): 8/8, zero console errors.
