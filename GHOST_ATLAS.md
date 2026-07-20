# THE GHOST ATLAS — the census of the standing city
> **WO-20260720c · the eyes of the outside architect.** THE GHOST PROTOCOL
> (GHOST_PROTOCOL.md) gives an architect the city's LAWS; this atlas gives
> it the city's CENSUS — what already stands, where, and what is genuinely
> empty. Born from the GHOST-BUILD-03 refusal (2026-07-20): the architect
> designed a throne onto the Tree of Life's own ground because it could not
> see. **No build order may target ground this atlas marks OCCUPIED without
> first sending an INFORMATION REQUEST and receiving the Builder's answer.**
> Maintained by the Builder; updated whenever a build lands. Companion to
> STATE.md (the ledger of HOW it was built — this is the map of WHAT stands).

## HOW TO USE THIS ATLAS (architect's contract)
1. Before drawing, find your target zone below. **OCCUPIED = ask first.**
   **EMPTY/OPEN = fair ground** (still subject to every law in the protocol).
2. Coordinates: right-handed, +Y up, **+Z = gate 0 (REUBEN) = the arrival
   axis**. Gates lie at azimuth k·π/6, k=0..11 (angle measured from +Z,
   `angOf(x,z)=atan2(x,z)`). Radii in meters from origin.
3. Number your orders **GHOST-BUILD-nn** (your own series). V-x, C-x, S-x,
   F-x, L-x, P-x are the Seer's blueprint lanes — never reuse them.
4. The live instruments: `__CITY.census()` (per-mesh tris at the current
   pose), `__CITY.colliders` (counts), `__CITY.houses` (figure slots),
   `__CITY.probe(x,z,...)` (collision truth), `__CITY.tours`. Ask the
   Builder to run any of them for you.

## THE RADIAL MAP (ground level, walkable disc r<130 + roads beyond)

### r 0–25 · THE TREE OF LIFE PLAZA — **OCCUPIED · SACRED · IMMOVABLE**
- **THE TREE OF LIFE** at origin (§12): the city's heart by the Seer's
  sealed canon (Rev 22). Procedural great tree (trunk lathe + ten carrying
  boughs + crown canopy w/ breathing shader), **twelve fruit of light = one
  InstancedMesh** bearing the Supreme scrolls (all 12 lit, incl. 144/672/787)
  — tap a fruit, the verbatim reader opens. God-column, golden foot pool
  (THE WELLING shader), dais rings, witnesses' ground, royal-blue mosaic,
  mirror floor (tier 2). Zero-red law binds HERE (Law 3: pixel-scanned).
- Figure houses waiting: `treeOfLife`×1 (procedural stands, yields to GLB).
- **NOTHING may displace, crowd, or re-center this plaza. The center of the
  city is the Tree, never a throne.**

### r 25–70 · THE LIVING MIDDLE — **OCCUPIED (dense)**
- **THE STREET OF GOLD** (§10): the +Z avenue from gate 0 to the Tree —
  burnished gold pavement band, arcaded colonnades WITH gold capital
  collars + segmental arches (already built, merged, zero draws), garlands,
  lecterns, banners, walkers' processional paths (Law 15: never build on
  the circuits — fountain rings r≈11.2/12.4 local, street lines x≈±2.2–2.6).
- **THE FOUNTAIN COURT** (§11) centre (−52, 8): tiered marble fountain
  (hero GLB), spray, hour-linked RAINBOW bow, six lathe urns, four plinths
  (empty `fountainAngel` houses ×4), witness ring, gardens' ring r15.4 local.
- **THE GREAT SANCTUARY** (§13) x[42,86] z[−21,9]: walled hall (walls h18,
  its own colliders + floor platform y.4), glory columns, pavement pools,
  lectern column, eight-point-star nave inlay, altar platform + walkable
  ramp (its own closure), consecration column. `sanctuaryHost`×4 empty.
- **THE RIVER OF LIFE** (LOOP 10): spring under the throne dais →(2.12,z)
  channel down the throne approach → west run along z≈−34 → THE WEST
  AVENUE canal (z≈2.5, x−40..−112.5) → under-wall grate. Crossing stones,
  TWO BRIDGES (x=−77, −110.5 — each with stepped platform closures),
  weirs. Water is UNCROSSABLE except at bridges/stones (colliders enforce).
- **THE HEAVENLY MARKET** (V-1, near street): six stalls of GIFTS (scroll
  parchments, orbs of light, phials) — **no commerce, no human wares**
  (Seer's ruling). `marketKeeper`×6 empty.
- **THE COURT OF THE RAINBOW** (V-2, fountain court dressing).
- **TWELVE LIBRARIES OF LIGHT** (V-4 passes 1–2, the other Builder's lane):
  domed library houses (coffered oculus dome, floating lamp, gold spines,
  desks) with their OWN arc colliders r2.35 local — sixteen vault/library
  stations total serve 3,846 scrolls in shelves.

### r 70–110 · THE DISTRICTS & GATE PLAZAS — **OCCUPIED**
- **THE DISTRICTS** (§9): seeded gothic blocks between the avenues —
  facades w/ lancet glow windows (MAT.glowArch), buttresses, pinnacle
  forest (~160, one InstancedMesh), campanile needles, spires. Deterministic
  placement (rng-stream law: never disturb the global draw order).
- **TWELVE GATE PLAZAS** (§16) at r≈100 on each spoke: gold rings +
  medallions, pilgrim clusters, vault reveal grounds (each gate's scroll
  vault helix appears at ~15m), plaza circuits (keep 13.2m clear of centres).
- **THE THRONE HALL** (§14) centre (0,−72) r17 — **THE THRONE ALREADY
  EXISTS**: twin gothic thrones (Seer's Meshy GLB), 3-step dais (0,−79.5)
  w/ walkable closure, sea-of-glass annulus, emerald bow, seven lamps, 24
  elder seats, blind arcade, clerestory, dome, own wall-ring collider
  (opening |a|<24° south), interior-culling hysteresis, `nicheFigure`×12
  empty houses. INTERIOR budget law ≤350k binds inside.
- **C-2 VAULTS ILLUMINED** (§14.5) + THE HARVEST (§18.5): 16 stations,
  384 shelf points, every scroll opens verbatim (Law 4 — textContent only,
  144 sha `bc797d33ac634674` is the battery gate).

### r 110–130 · THE WALL RING & FOUNDATIONS — **OCCUPIED**
- **THE OUTER WALL** (§8) centreline r118.5 (WALL_R): 12 monumental gate
  portals (GLB, far-LOD), tribe nameplates, wall band collider w/ GATE_PASS
  ±0.016 rad openings, **THE RAMPARTS** — walkable wall-top (platform y8.5)
  w/ analytic rails + gate end-stops, stair tower at (−13..−24, 112.4).
- **TWELVE FOUNDATION COURSES** (LOOP 9 + L-1): the jewel bands y.35–7.34
  on the island's outer face, Rev 21:19–20 order.
- **THE WATERFALL TERRACE** (§15) sector 225°±18°: floor platform y.25
  r117–138.5, gold filigree railing r137.3, braziers, bench; **RIM FALLS**
  pour from the island face. The wall OPENS here (no gate) — by design.
- **THE INVISIBLE RIM RAIL** r127.4 (RAIL_R): clamps ground walkers from
  the void — **stands down over the causeway corridor AND the eleven
  highway corridors** (see next band). Any new outward walk must add its
  own exemption the same way.

### r 130–180 · THE OUTWARD ROADS — **OCCUPIED (new, sparse — expandable)**
- **THE ARRIVAL CAUSEWAY** (gate 0, |x|≤6, z 127–160): processional bridge
  — lace crest parapets, five plinth pairs (`causewayHost`×10 empty), lamps
  of the way, portal veil + THE APPROACH arrival moment. Its exemption
  corridor (|px|≤6.25, pz 100–160.5) is LOAD-BEARING — never re-clamp.
- **ELEVEN CELESTIAL HIGHWAYS** (GHOST-BUILD "V-5"/WO-20260720b, gates
  1–11): 8-wide marble decks r129.5–180 along each spoke, low parapets +
  gilt caps + glow borders, far-end overlook caps. Deck edges + far ends
  clamp in resolveCollisions; one platform closure floors all corridors.
  **CARRIED (open reruns):** terraced steps; underside piers; gates 7/8
  decks could start past the terrace railing; causeway-grade dressing.

### r 180+ · THE SEA OF CLOUDS & THE NATIONS — **MOSTLY OPEN**
- Standing: the cloud-sea shader discs (sun-graded), rolling wisps, RIM
  FALLS mist, **far-city impostor cards** (THE JEWELED HORIZON, L-2 —
  sister cities on the horizon, aerial-tuned), THE PROCEDURAL HEAVEN dome,
  distant spires, motes. All visual fabric — **no walkable ground past
  r180**.
- **OPEN GROUND for future orders:** landing platforms at highway overlooks;
  outer islets; anything BELOW the rim (the underside from the sea).
  The far cities themselves are a declared Seer ambition ("we may go over
  there and build those ones too").

## THE VERTICAL MAP
- y0: the disc (walkable r<130 via groundAt; platform closures elsewhere).
- y.25 terrace · y.4 sanctuary floor · y1.4 altar · y1.8 throne-hall dais
  top · y2.85/5.65 stair-tower landings · y8.5 THE RAMPARTS walk.
- The sky: sun mean az 232° el 16° (MEAN_SUN — everything aimed at the sun
  aims here); THE LIVING HOUR breathes dawn↔noon + vespers (?hour=).

## THE MOVING & INVISIBLE SYSTEMS (break these and the city dies)
- **Physics:** colCircles 272 · colBoxes 34 · colSegs 2 · ~10 platform
  closures · wall band + rampart rails + rim rail + hall ring — all in
  `resolveCollisions`/`groundAt` (GHOST-02/03 packets hold the raw code).
- **Draw discipline:** 8 baked P.* merges + InstancedMesh for repeats;
  aerial full-view ≈383k tris / ≈340 draws (2026-07-20). Budgets: ≤700k
  exterior / ≤350k interior, FPS floors 50/25 are the TRUE gate (Law 28).
- **THE HARVEST:** 3,846 scrolls; reader is verbatim-or-nothing; 144 sha
  `bc797d33ac634674` gates every commit. Data flows ONE WAY (Law 12).
- **THE SEER'S WINGS:** aerial/hover/orbit + SIX tours (scout · pilgrim ·
  river · ramparts · gates · stones) — all CatmullRom splines in
  GRAND_TOURS; `__CITY.runScoutTour()`, `scoutVantage(1|2|3)`.
- **Hero slots (P-C):** 10 slots, **53 empty houses awaiting the Seer's
  Meshy GLBs** — treeOfLife×1 (procedural stands) · throne×2 (GLB) ·
  fountain×1 (GLB) · gateArch×12 (GLB) · angelStatue×16 · fountainAngel×4
  · causewayHost×10 · marketKeeper×6 · nicheFigure×12 · sanctuaryHost×4.
  Figures arrive ONLY by GLB deposit (MESHY_RUNBOOK.md) — never primitives.

## GENUINELY OPEN GAPS (fair ground, priced lanes)
1. Highway reruns: terraced steps, piers, gate-7/8 re-seat (carried).
2. Overlook landings / outer islets past r180 (new domain).
3. P-A THE OPEN DOORS: district-building interiors (priced, unbuilt).
4. The underside read (the island from the sea below).
5. The far sister cities (Seer ambition, awaits his order).
6. Anything the Seer's walkthrough circles name next (RERUN RULE).

## STANDING PROHIBITIONS (from the protocol, the ones builds trip most)
No figures/vegetation/audio by primitive (THE UPROOTING stands) · zero-red
on the Tree · canon (names, numbering, scripture, money) is the Seer's
alone · never two builders in one checkout (Law 32) · verbatim reader ·
one-way data · InstancedMesh-or-merge for anything repeated.

*Atlas first sealed 2026-07-20 by the Builder, on the Seer's order, after
the GHOST-BUILD-03 refusal. Update on every landed build.*
