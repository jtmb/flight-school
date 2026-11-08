# Implementation prompt

Build **gpt-flight-school** in this repository. Execute the complete plan; do not return another plan instead of implementing it.

Start at [00_START_HERE.md](00_START_HERE.md), read the current handoff and state, and follow [docs/implementation-plan.md](docs/implementation-plan.md) in order. Preserve existing repository conventions and unrelated work. Use the local vision model, one agent-browser session, the repository's Markdown memory workflow, and the small game-testing MCP specified here. Do not configure Context7 or Playwright MCP.

## Deliver the game

Use strict TypeScript, vanilla CSS/DOM, a small Vite build, and Three.js pinned to **0.180.0**. Keep application modules under `src/`, CSS under `styles/`, tooling under `tools/`, and meaningful tests under `tests/`. Follow the file responsibilities in [architecture](docs/architecture.md). Do not put the game into one HTML file, add a UI framework, import a physics engine, or download external art/models.

Create the seeded low-poly canyon and ten-ring route from seed **1337**. The player has **90 active seconds** to clear the rings in order. Normal speed is about **48 m/s**, boost **72 m/s**. W pitches down; S pitches up; A/D turn and visually bank; Shift boosts; Escape pauses/resumes; R restarts. Losing focus pauses and clears held input.

Reproduce the open biplane cockpit in [the visual contract](docs/visual-target.md): red airframe and outer struts, wood panel with live round gauges, dark padded rim, curved transparent windscreen, twin visible guns, and a clear central view. Treat the three supplied PNGs as design references. Build live geometry and capture actual output for acceptance; do not present the concept art as gameplay.

Create **three grounded tanks** and **three moving airborne blips**. Blips are crimson faceted drones with simple fins. Space or left mouse fires a combined **six shots per second**, alternating muzzles. Resolve one camera-centred hitscan ray per shot up to **500 m**, respecting terrain occlusion; the tracer starts at the selected gun muzzle and is cosmetic. Tanks need two hits and award 200 points. Blips need one and award 100. Each destruction scores once.

Enemies within **300 m** and with clear line of sight fire straight, visible red projectiles at the player's position at launch. Tank cadence is 3 seconds, blip cadence 2.5 seconds, speed 100 m/s, lifetime five simulation seconds, cap 24 live projectiles. Player hull is 100; each projectile hit deals 25. There is no homing, ammunition economy, complex AI, or requirement to kill enemies to win. Apply lethal failure before a simultaneous ring-course win.

Use one animation loop, real active elapsed time for countdown, clamped movement deltas, and no catch-up firing bursts. Keep immutable world resources separate from resettable run state. Retry restores all player/course/combat/input/effect state without recreating listeners, renderer, world, or loop.

## Deliver verification access

Implement the copied snapshot and bounded event APIs in [docs/diagnostics.md](docs/diagnostics.md), gated to development and `?debug=1`. Add the local Vite observer bridge and three-tool stdio MCP from [docs/game-testing-mcp.md](docs/game-testing-mcp.md). State observations must come from the running game's actual controller. The MCP must not launch a second browser or expose setters, arbitrary evaluation, teleport, kill, or win commands.

Use agent-browser for real input and screenshots, then the MCP for state/counter evidence. A captured PNG must actually be opened by the model to claim visual review. Keep browser sessions, page IDs, run IDs, state timestamps, and event cursors consistent. Never count stale or wrong-run state as a pass.

## Work and finish

Load only relevant skills and source-linked memory notes. Follow the [testing policy](.agents/skills/testing-skill/SKILL.md): a few behavioural tests for concrete risks and real browser acceptance are sufficient; do not invent coverage goals or a framework for testing the test framework.

Create the package scripts specified by the plan, lock dependencies, and complete applicable type-check, lint, focused test, and build gates. Record actual results in [tests/smoke.md](tests/smoke.md) and [current state](docs/state/now.md). Save real level-flight, ground-combat, and air-combat evidence separately from the concept images. Update the README with verified setup instructions and real gameplay media when capture is available.

Continue through all phases unless blocked by a concrete external prerequisite. Before any session handoff, record completed work, evidence, remaining defects, and the next action. At delivery provide what works, the launch commands, controls, actual verification, and remaining limitations. Do not leave required gameplay as TODOs or claim an MCP is connected before observing its tools and a successful live read.

Begin with Phase 0 now.
