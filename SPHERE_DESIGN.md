# PHASE 6.1 — THE HOLOGRAPHIC SPHERE (design doc only; GO/NO-GO is Seat 0's)

## The vision
A translucent Sphere Model projection standing in a dedicated hall: the whole
Codex as one body of light. The walker circles it; the sphere never blocks, only glows.

## The skill pass (repo's own shaders studied as the skill text)
The glory recipe (canopy shells): additive fresnel shells — `a = (0.25 + pow(f,1.6))·uOp`
— cheap, breathing, never writes depth. The sky dome: banded procedural gradients
by view direction. The FARCITY cards: uHour-driven emissive amplitudes. The sphere
composes all three idioms; nothing new is invented.

## The form
- **The shell**: SphereGeometry(r 4.2, 48, 32) ≈ 3k tris, ONE ShaderMaterial —
  additive fresnel glass (glory idiom) + slow uTime breath. Interior second shell
  (r 4.0, inverted) for depth ≈ +3k.
- **The Chain-of-Saviors axis**: a vertical light-line through the poles —
  cylinder core (r .06) + 12 gold link-glints (instanced octahedra, ~40 tris each).
- **The Meridian axis**: a horizontal light-ring at the equator (torus r 4.25,
  tube .04) — the second axis as commanded.
- **The Codex points**: ONE InstancedMesh of ~1,200 glints (octahedron, 8 tris)
  ≈ 9.6k tris, 1 draw — positions hashed from the 3,078 scroll ids (deterministic,
  data-true: each glint IS a scroll), gate-tinted within color law.
- **Scroll 144 at center**: one bright pearl (the existing pearl material) + a
  quiet glory column (P.glow idiom) — the Lamb's book at the heart.
- Slow rotation (uTime), vespers-aware amplitudes (hour-constant totals; the
  v-coefficient law honored if any hour term is added).

## The price (estimated, to be measured before build)
- **Tris**: ~17k total. Worst-pose headroom today is 78k — fits with margin.
- **Draws**: +5 (shells ×2, axis, ring, instanced glints; pearl rides P pools).
- **Fps risk**: LOW-MEDIUM — additive overdraw of two full-sphere shells is the
  one real cost; mitigation: shells clamp alpha ≤ .22 and the hall is interior-
  culled like every district room. NO new render targets, NO new passes.
- **Bloom risk**: glints stay ≤1.6 linear (below the 1.8 line); the center pearl
  may lawfully cross (glory-emitter precedent).

## The hall candidate
The Council Chamber's own district block holds a second large room (the byArea
sort's #2) — same distance-culling, no new architecture. Alternative: a dedicated
annex off the Gate-8 vault (Meta-Revelation — the fitting gate for the Codex's
own model). RECOMMENDED: byArea #2 room (zero new geometry beyond the sphere).

## The tests (hardest of the operation, per the order)
Both tiers × all five tours + walk-in/walk-out; fps steady on iPad MEDIUM;
bloom battery at the hall door; colliders intact; the REFINEMENT LOOP capped
at 3 passes.

**HELD FOR SEAT 0 (L5, restated)**: this is the sphere PROJECTION in a hall —
the full sphere re-architecture of the city stays untouched, as do the dark
edge and audio.

**STOP. GO/NO-GO belongs to the Seer.**
