# Implementation plan and acceptance gates

## Start here

Follow the repository `AGENTS.md`, `RULES.md`, and current handoff before editing. Read [game-design.md](game-design.md), [architecture.md](architecture.md), and [combat.md](combat.md), then inspect all three images in [visual-target.md](visual-target.md). Read the installed testing skill before deciding which automated tests are useful. Use [memory-workflow.md](memory-workflow.md) to recover and record working state without loading an unbounded conversation archive.

This is a planning change. It contains neither a completed game nor passing runtime test evidence. Build the game through the gates below; do not mark a gate complete because the expected files or function names exist.

## Budget and ordering

The original one-hour target remains useful for prioritization. The clarified scope now includes a modeled cockpit, both enemy types with return fire, numerical observation, a custom testing MCP, and real visual review. A one-hour attempt is a stretch, not a promised delivery time. Tooling work and environment setup should be reported separately from time spent implementing the playable MVP.

Finish the core playable loop in phases 0–4, then build the development observer in phase 5, and perform the focused acceptance pass in phase 6. Observe the game as soon as useful parts run; do not postpone opening a browser until the final phase. The phase boundaries are checkpoints, not a requirement for a separate commit or a new abstraction at each step.

## Phase 0 — Runnable TypeScript shell

**Read:** [architecture.md](architecture.md#runtime-and-build), [agent-setup.md](agent-setup.md), existing repository configuration.

**Do:** Establish Node `>=22.12`, npm, Vite, strict TypeScript, and exact `three@0.180.0`. Use the exact compatible dependency versions in [agent-setup.md](agent-setup.md) and lock them. Add the actual development, typecheck, lint, test, and build scripts specified in [agent-setup.md](agent-setup.md), retaining strict ESLint basics and using Node's built-in test runner through `tsx` rather than adding a test framework. Use separate browser/Node type scopes. Keep `index.html` thin and move styles to `styles/main.css`.

Create one controller, renderer, camera, animation loop, and one set of listeners. Render a visible scene and meaningful menu/Start button before adding world complexity. Do not create placeholder APIs whose only callers are tests.

**Gate:** The documented install/start command works, the page renders, the console has no uncaught startup error, resizing works, and the production build succeeds. Record the actual tool versions and commands. Tests that require gameplay are still pending.

## Phase 1 — Seeded world and controllable flight

**Read:** [game-design.md](game-design.md#seeded-world-and-course), [architecture.md](architecture.md#terrain-and-collision-agreement).

**Do:** Implement the shared grid/height query, seeded broad valley, sky/fog/lights, initial pose, constant forward flight, W/S pitch, A/D turn with modest bank, and Shift boost. Implement terrain/out-of-bounds failure and the controller's two-clock model before layering combat onto it.

Use a real menu, pause overlay, and Retry action. On blur/hidden document, pause and clear input; explicit resume rebases time. Reset from seed/spawn records without creating another loop.

**Gate:** The canyon is readable, the aircraft responds in the documented directions, boost changes speed, and clearance agrees with the visible floor. A terrain/bounds failure shows its exact reason. Pause and focus loss stop time/movement, and a Retry returns to the same initial pose/layout. A short browser interaction catches orientation/sign mistakes early.

## Phase 2 — Ordered course and complete run loop

**Read:** [architecture.md](architecture.md#checkpoint-crossing), [game-design.md](game-design.md#state-hud-and-endings).

**Do:** Place ten rings along a safe generated corridor. Implement movement-segment/plane crossing through the opening, with the aircraft margin, in forward order. Add progress, 90 active seconds, final-ring victory, specific failure results, completion time, and Retry. Ground/bounds/time failure wins over a simultaneous last-ring crossing.

**Gate:** A genuine input-driven run can complete all ten rings in order. Passing near, reversing through, or clipping the rim of a ring does not count. Timeout and Retry work. The route is forgiving enough to complete at normal speed within approximately 50–65 seconds once learned, leaving room for optional combat.

A focused mathematical check is appropriate for crossing/ordering and margin edge cases. Do not create browser automation just to test a vector formula.

## Phase 3 — Recognizable cockpit and live HUD

**Read:** [visual-target.md](visual-target.md), all three reference images.

**Do:** Build the camera-attached wood dashboard, padded rim, outer red struts/shoulders, thin side wires, curved clear windscreen, twin guns, two round live gauges, and boost lamp from simple geometry. Add the compact top panels and centered reticle. Keep the central sightline clear and the panel around the lower third of the view.

**Gate:** Compare a real level-flight capture with `reference-images/01-level-flight.png`. The cockpit identity, framing, canyon palette/depth, and live instruments pass the rubric. Bank the aircraft: the world moves behind a stable cockpit and upright HUD. Instruments show real speed and terrain clearance. A successful visual pass requires inspecting the screenshot, not merely saving it.

## Phase 4 — Optional scoring combat and survival

**Read:** [combat.md](combat.md), the controller frame order in [architecture.md](architecture.md#ordered-frame-contract).

**Do, in this order:**

1. Add three visible grounded tanks and three moving blips with deterministic reset records and generous colliders.
2. Implement the camera-center hitscan, range/terrain occlusion, alternating muzzle flash/tracer, two-hit tanks, one-hit blips, and exactly-once kill/score updates.
3. Add fixed-heading red enemy shots, bounded cadence/cap/lifetime, swept collision, hull damage, damage feedback, and hull failure.
4. Integrate failure precedence, pause/focus handling, and complete combat reset with the existing controller.

**Gate:** A person can destroy at least one tank and one blip using the actual controls, see readable feedback, take authentic return-fire damage, and retry with all state restored. Ring ten can still win with enemies alive. Run the focused combat edge-case checks described in [combat.md](combat.md#concrete-acceptance-cases).

This completes the gameplay MVP. Do not add guided missiles, bombs, enemy pursuit, extra maps, score services, imported aircraft assets, or audio before the agreed scope is accepted.

## Phase 5 — Development observer and testing MCP

**Read:** [game-testing-mcp.md](game-testing-mcp.md), [agent-setup.md](agent-setup.md).

**Do:** Expose copied read-only snapshots and bounded events under the development diagnostics object. Publish telemetry at no more than 5 Hz through the development bridge. Implement the small stdio MCP server and its exact health/state/events tools from the contract. Keep Node tooling out of the production bundle. The observer does not control the aircraft; agent-browser supplies real key/mouse actions and vision supplies visual review.

**Gate:** The MCP can distinguish a running fresh instance from a missing, stale, or mismatched one; read real run state and events; and continue correctly across Retry. If the MCP/bridge is absent or fails, the game still plays. A production build exposes no debug object or development telemetry routes. Verify the actual browser session is the one the observer reports.

If local browser/MCP installation is blocked, report that exact blocker and the checks still possible. Do not fabricate an MCP result or call an untested bridge “connected.” Do not silently drop the observer from the full requested handoff.

## Phase 6 — Focused acceptance and handoff

**Read:** [tests/smoke.md](../tests/smoke.md), [visual-target.md](visual-target.md#priority-and-passfail-rubric), the testing skill.

**Do:** Run the applicable repository quality gates. Complete a real course run, tank and blip engagements, hull damage/failure, pause/focus/resume, and repeated Retry. Use numerical observations for counters/clock/reset and real images for canvas appearance. Capture normal flight, tank combat, and banked air combat at the same documented viewport and seed.

Record evidence and unresolved limitations. Update handoff and memory with the exact next action only if work remains. Never mark an expected result as observed, report an unrun command as passing, or use concept art as gameplay media.

**Gate:** The planned gameplay behaviors and visual rubric are satisfied; build/type/lint/relevant tests pass; no unresolved material runtime error remains; the observer contract works; and the README/handoff commands refer to the actual implementation. Stop optional testing/polish at this point.

## Scope control when the prototype runs long

Simplify cloud count, fine cockpit details, wood texture variation, decorative lighting, and destruction particles first. A flash can replace a fragment system. Keep the wood/red cockpit identity, both guns and live gauges, ten-ring loop, both enemy kinds, real shooting/occlusion, return fire/hull, and reliable reset.

Do not trade away required behavior to spend more time on screenshots, an extra skill, a test framework, infrastructure, or a generic reusable game engine. If a dependency or environment blocks progress, isolate it, finish the independent authorized work, and report the concrete remaining gap with its next step.

## Completion report

The implementation agent's final report should state what can be played, the exact local commands, the build/commit tested, the evidence locations, what was actually verified, and any remaining blockers. A concise report supported by the recorded artifacts is enough. The game itself remains the acceptance target.
