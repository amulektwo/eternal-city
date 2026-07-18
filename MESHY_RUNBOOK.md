# THE MESHY RUNBOOK — the Seer's sculpting guide (P-C, WO-20260714-04)
> Everything the city needs from the Seer's Meshy weekend, and exactly how
> each piece comes home. The houses are BUILT and WAITING — every figure
> below lands with a GLB file + one manifest line, zero code.
> Doctrine: statues are the ARTISTRY OF HEAVENLY ARTISTS — never worshipped,
> never an object of veneration (the Seer's ruling, 2026-07-14). No Moroni,
> no named persons. Public author identity: AMULEK ONE.

## HOW TO MAKE EACH FIGURE (Meshy)
- Generate in Meshy as a SINGLE standing figure (or object), neutral pose
  unless noted. Style words that match the city: *white marble and gold,
  classical drapery, serene, reverent, luminous, gothic-baroque temple art*.
- Export/download as **GLB**. Do not worry about polycount, textures or
  origin — the builder's no-Blender pipeline (Law 19: weld → simplify to
  budget → prune → base-center origin → PBR dress → Draco) handles all of it.
- Deposit into **DROPBOX_FOR_THE_CITY** (iCloud root) or the Drive dropbox —
  one file per figure, any filename (content is identified, never filenames).
  Say the word and ingestion runs.

## THE SHOPPING LIST (in order of glory)

| # | Figure | Slot | Count placed | Pose / notes |
|---|--------|------|------------|--------------|
| 1 | **Angel, praying** (hands at breast, wings folded high) | `angelStatue` | 16 anchors citywide | THE flagship — portals, tree plaza, gate flanks, dais guardians |
| 2 | **Angel, welcoming** (one hand extended in blessing) | `causewayHost` | 10 along the arrival causeway | Board 5 — the Bridge of Angels procession |
| 3 | **Angel, wreath-bearer** (holding a laurel/garland) | `fountainAngel` | 4 at the fountain base | Board 2 — faces outward from the fountain |
| 4 | **Angel-artisan, giving** (offering an object with both hands) | `marketKeeper` | 6, one per stall | THE HEAVENLY MARKET — the givers of gifts |
| 5 | **Elder / robed figure, contemplative** | `nicheFigure` | 12 in the throne-hall niches | Elevated niches; reads at 2–4 m |
| 6 | **Worshipper, standing reverent** | `sanctuaryHost` | 4 in the sanctuary aisles | Quiet presence between the columns |
| 7 | **THE TREE OF LIFE** (a great many-boughed tree, no fruit needed — the twelve fruit are the city's own lights) | `treeOfLife` | 1, the city's heart | The single most important deposit of all |

One SCULPT can serve many slots (e.g. the praying angel can stand in
`angelStatue` AND `nicheFigure`) — each slot line in the manifest may point
at the same file with a different scale.

## TARGETS (the pipeline enforces these — the Seer need not)
- Refined budget per figure: **≤ 20k tris** (the pipeline decimates to this).
- Standing figures land at human scale ≈ **2.6–3.2 m** tall in-city (statues
  may run larger on plinths: causeway 3.5–4 m). Scale is a manifest number —
  tuned at ingestion with the Seer's one-word confirm.
- Facing: figures are authored facing −Z or any consistent axis; the anchors
  carry rotation. The pipeline bakes orientation (throne lesson, Law 20).

## HOW A DEPOSIT COMES HOME (the whole ceremony)
1. Seer deposits `angel_praying.glb` in the dropbox.
2. Builder runs the dropbox ingestion: identify → refine (L19) → stage.
3. One manifest line, e.g.
   `{ "slot": "causewayHost", "file": "assets/models/angelWelcome.glb", "scale": 1.4, "castShadow": false }`
4. Battery → deploy → md5-prove. The host stands on the causeway.
5. `__CITY.houses` lists every slot, its status (GLB/PROCEDURAL/EMPTY) and
   its anchor count — the live checklist.

## STANDING EMPTY HOUSES (today, after P-C)
`fountainAngel`×4 · `causewayHost`×10 · `marketKeeper`×6 · `nicheFigure`×12 ·
`sanctuaryHost`×4 · `angelStatue`×16 (procedural purged, waits true) ·
`treeOfLife`×1 (procedural stands, yields on arrival) — **53 places prepared.**
