---
name: flight-visual-acceptance
description: Review and refine gpt-flight-school's live Three.js cockpit, canyon, targets, combat effects, and HUD against the three approved concept references. Use after a visible milestone or before visual acceptance; requires opening actual gameplay screenshots with vision.
---

# Flight visual acceptance

1. Read [the visual contract](../../../docs/visual-target.md) and open its three reference PNGs. Keep one shared cockpit for all scenes. The concepts show an art target, not verified gameplay.
2. Use agent-browser's single `flight-school` session and the fixed 1440 × 810 viewport. Read [agent setup](../../../docs/agent-setup.md) for exact commands. Use normal input to reach a level view, a tank attack, and a banked blip attack.
3. Save unannotated PNGs under the ignored `artifacts/acceptance/` directory. Open each actual image through the harness's image reader; a successful screenshot command alone is not a visual review. If the image cannot be opened, leave visual acceptance unreviewed and report the concrete limitation.
4. Check the high-value features first: wood panel and dark rim; red shoulders and outer struts; curved clear windscreen; two round live gauges; twin visible guns below an unobstructed reticle; readable warm canyon, amber rings, olive grounded tanks, and red airborne blips.
5. Check combat composition: the active gun's flash/tracer originates at its muzzle, the target is distinct from a ring, effects are restrained, and HUD counters remain readable. Banking tilts the outside world while the cockpit and HUD remain anchored.
6. Compare silhouette, proportions, colour, visibility, and consistent layout. Do not demand pixel-identical terrain, copied wood texture, or reference-image numbers. Gauge values and counters must reflect the live simulation.
7. Use MCP state/event observations to corroborate the action, not to infer visual quality. Screenshots and telemetry taken while moving are adjacent observations; pause through real input for a stable view when useful, and record any transient effects that expired.
8. Fix the largest concrete mismatch, recapture affected views, and stop once the written contract is met. Store a concise review result with paths and remaining issues in [the smoke record](../../../tests/smoke.md).

Do not redesign the game into a generic website, install another browser controller, add external assets, or publish the concept PNGs as gameplay media.
