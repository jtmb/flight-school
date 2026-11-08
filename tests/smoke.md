# Gameplay and tooling acceptance

**Initial status: NOT RUN.** The planning PR contains no game implementation. Record actual results after building it; never mark a row passed from a specification, concept image, fabricated snapshot, or unexecuted test.

Follow [the proportionate testing policy](../.agents/skills/testing-skill/SKILL.md), [agent setup](../docs/agent-setup.md), [visual target](../docs/visual-target.md), and [MCP contract](../docs/game-testing-mcp.md). Use Node's built-in test runner for focused logic and real agent-browser input for integration.

## Environment and evidence

Record commit, model/quantization/context, OpenCode, agent-browser, Node/npm, OS, browser, viewport, seed, and renderer environment. Keep raw artifacts under the ignored **`artifacts/acceptance/`** directory. Store a compact result summary here with relative evidence paths. Intentionally selected real gameplay media for the final README may be committed separately after checking its content.

Bind the current `instanceId` from `flight_get_status`. Include `runId`, publication sequence, and event cursors with state evidence. Use fresh reads and note cursor gaps. Load actual PNGs into vision; accessibility snapshots only describe DOM controls/HUD.

## Focused logic checks

Create a few behaviour tests as the relevant code arrives. A practical starting point is `course.test.ts`, `combat.test.ts`, and `lifecycle.test.ts`; add a small observer contract test only for the genuine stale-data/instance/gap risks. Reuse existing tests rather than enforcing file or test counts.

| Risk | Independent behaviour expectation |
| --- | --- |
| Swept ring passage | A fast forward segment through the active aperture counts once; outside, backwards, and future-ring passage do not count |
| Combat accounting | Tank HP 2→1→0 awards 200 once; blip 1→0 awards 100 once; subsequent damage awards nothing; total possible score 900 |
| Projectile hit | Relative swept collision catches a shot crossing the moving player; it damages once; lethal damage takes priority over a simultaneous final ring |
| Lifecycle | Retry resets player/course/enemies/cooldowns/input/effects; pause preserves active time and simulation state; no catch-up firing burst |
| Observer, where needed | Wrong instance, stale receipt, schema mismatch, or an event-buffer gap is reported honestly; repeated reads do not mutate the game |

Do not test source strings, trivial wrappers, Three.js internals, the MCP SDK, or a newly invented test framework. Do not mock away the behaviour being checked.

## Acceptance matrix

Use PASS, FAIL, BLOCKED, or NOT RUN, with a short evidence note. One good integrated run can cover several rows; avoid repeating unchanged passing work.

| ID | Behaviour and evidence | Initial result |
| --- | --- | --- |
| A01 | Development boot: scene renders, Start works, title/objective/controls are readable, no uncaught error or failed required asset | NOT RUN |
| A02 | Real W/S change climb/descent with correct signs; A/D change heading and bank; Shift changes speed near 48→72 m/s; release works and the page does not scroll | NOT RUN |
| A03 | Seed 1337 produces the same terrain/course/enemy starts after retry; start faces a safe first checkpoint | NOT RUN |
| A04 | Clear all ten rings in order before 90 active seconds at attainable normal-speed pacing; a boost crossing counts once; success screen and Retry work | NOT RUN |
| A05 | Separate timeout, terrain, bounds, and zero-hull failures show a useful reason and permit retry; stop advancing a finished run | NOT RUN |
| A06 | Open actual level-flight image in vision: red struts/shoulders, wood panel/dark rim, curved clear windscreen, round live gauges, twin guns, unobstructed reticle | NOT RUN |
| A07 | Open ground/air action images in vision: grounded tanks and flying red blips are distinct from rings; tracer/flash starts at the active muzzle; outside banks while cockpit/HUD stay anchored | NOT RUN |
| A08 | Hold Space and left mouse separately: approximately six combined shots/second, alternating muzzles; stopping releases fire; no player bullet damage loop in addition to hitscan | NOT RUN |
| A09 | Live tank takes two hits and awards 200 once; live blip takes one and awards 100 once. Correlate fresh HP/score with shot, hit, and destruction events | NOT RUN |
| A10 | Terrain blocks shooting; >500 m targets take no player damage; cockpit meshes do not intercept the aim ray | NOT RUN |
| A11 | In-range visible enemies emit slow red straight projectiles; out-of-range/occluded enemies stop creating shots; impacts/expiry remove shots; count never exceeds 24 | NOT RUN |
| A12 | A live enemy projectile removes 25 hull once; logic evidence covers four hits to zero and fatal-failure priority | NOT RUN |
| A13 | Pause during fire and live projectiles: two fresh full snapshots preserve tick, time, pose, projectile positions/lifetimes, hull, and score. Resume without queued fire; focus/visibility loss pauses and clears keys | NOT RUN |
| A14 | Retry after play, pause, success, and failure restores 90 seconds, normal speed, 100 hull, zero score/progress, all six enemies, cooldowns, and no effects/projectiles. Several retries do not multiply motion/fire/listeners | NOT RUN |
| A15 | Countdown follows active wall time while movement deltas are bounded; an injected/local debugging frame stall produces no firing backlog. Resize keeps aspect, cockpit, reticle, and HUD useful | NOT RUN |
| A16 | OpenCode advertises the three MCP tools; live status/state/events match the controlled browser instance/run. Closed/stale/wrong/multiple instances never silently pass as current evidence | NOT RUN |
| A17 | Production build/preview boots; ordinary controls work; no debug global, telemetry connection, or `/__flight/` JSON API is exposed | NOT RUN |
| A18 | Applicable typecheck, lint, Node behaviour tests, and build pass; final README commands are verified | NOT RUN |

For visual captures use 1440 × 810 and seed 1337. Save `01-level-flight.png`, `02-ground-combat.png`, and `03-air-combat.png` under `artifacts/acceptance/`, separate from `docs/reference-images/`. Reach them through play; no teleport/debug setters. Pause through UI for a stable comparison when useful. Action effects may require capture while firing; record adjacent state without pretending screenshot and telemetry are exactly simultaneous.

## Results record

- Commit and environment: not recorded; planning only.
- Checks executed: none of A01–A18; game not implemented.
- Actual gameplay evidence: none.
- Known implementation defects/blockers: not assessed.
- Planning validation: [separate record](../docs/planning-validation.md).

## Stop condition

Complete the game, observer, and applicable required checks; repair concrete failures and then deliver. No extra suite, coverage target, benchmark campaign, or test-infrastructure recursion is required. If an external prerequisite blocks a check, name it precisely and keep that row BLOCKED. Never turn a limitation into a claimed pass.
