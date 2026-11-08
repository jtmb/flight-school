# gpt-flight-school — game design

## The game to build

Build a small desktop browser game in Three.js: the player sits in a recognizable open biplane cockpit, flies a seeded low-poly canyon through ten rings, and can shoot three tanks and three airborne targets while avoiding their return fire. Finish the tenth ring before 90 active seconds expire. Combat adds score and risk; enemy destruction is not a condition for winning.

This document defines the planned product. The repository's rules remain authoritative. Use [architecture.md](architecture.md) for module ownership, [combat.md](combat.md) for shooting rules, [visual-target.md](visual-target.md) for the appearance contract, and [implementation-plan.md](implementation-plan.md) for the build order.

## Scope

The complete MVP includes one deterministic map, one course, one aircraft view, one weapon, two simple enemy types, and a complete start/pause/win/fail/retry loop. It uses a modular TypeScript application, external CSS, and a thin HTML shell. It does not need accounts, a server for gameplay, imported models, multiplayer, audio, touch controls, a flight simulator, or a mission editor.

The original one-hour target describes a focused prototype attempt, not a completion guarantee. The cockpit, combat, visual review, diagnostics, and custom MCP make the clarified request larger. First finish the playable game, then its development observer and verification. Do not replace missing gameplay with screenshots or hard-coded counters to meet a time estimate.

## Controls and feel

| Input | Result while running |
|---|---|
| W / S | Lower / raise the nose |
| A / D | Turn left / right; apply a small matching visual bank |
| Shift held | Boost toward 72 m/s; release returns toward 48 m/s |
| Space or left mouse button held | Fire the forward weapon, at its configured cadence |
| Escape | Pause; Escape or the Resume button resumes explicitly |
| R | Start or restart a fresh run from any game mode; ignore repeated keydown events |
| Start / Retry buttons | Begin a new run using the current seed |

Forward motion is continuous. World Y is up, the camera looks along its local negative Z axis, and one world unit represents one metre. Keep heading, pitch, and speed as explicit state. Clamp pitch to approximately ±35 degrees. A turn banks the view by approximately ±15 degrees, easing back to level when released. Bank is a presentation of turning; it must not introduce a second steering calculation.

Use frame-rate-independent smoothing. Input should respond promptly enough to line up the next ring and correct an aim. There is no mouse look, pointer-lock requirement, throttle simulation, stall, fuel, or separate gun aiming. The center reticle always shows the forward shot direction.

The modeled cockpit is attached to the camera. The landscape and horizon turn and bank while the panel, windscreen, struts, and guns stay fixed relative to the pilot. DOM HUD text stays upright.

## Seeded world and course

Default to seed `1337`. A `seed` URL parameter may select another valid 32-bit integer; use the documented default for missing or invalid values. Show the active seed in the HUD. The same seed must produce the same terrain, ring transforms, enemy spawn records, and initial view after Retry. Full frame-for-frame replays across machines are outside scope.

Create a broad, continuous canyon using seeded coherent noise or a few seeded layered sine functions. Valley walls should form readable slopes rather than disconnected random spikes. Use one stable heightfield for rendering, spawn placement, ground clearance, and collision. Its public `heightAt(x, z)` query must match the actual rendered grid triangles; it must not consume a random number on every call.

Use these as starting dimensions, all centralized in `src/config.ts`:

| Feature | Starting target |
|---|---|
| Map | About 4,000 m long and 2,400 m wide |
| Terrain mesh | 96–128 segments along each dimension; flat shading |
| Course | 10 rings over roughly 2,400–2,800 m |
| Ring opening | Clear radius around 18–25 m |
| Ring spacing | Around 200–280 m; a clean route should take about 50–65 seconds at normal speed |
| Spawn | 150–200 m before ring one, at least 60 m above terrain |
| Aircraft ground margin | 3 m of vertical clearance above terrain |

A usable starting placement is a map spanning `x = -1200..1200` and `z = 200..-3800`, with the initial course heading toward negative Z. The valley center can drift gently with Z. Rings and spawn follow that center with modest height changes. Exact bounds and generated coefficients belong in configuration; do not scatter alternate values through modules.

Keep each ring's entire opening clear of slopes, and leave a broad corridor between consecutive rings. Validate a generated ring's opening against terrain, rather than checking only its center. If a candidate is unsafe, raise or reposition it deterministically; do not regenerate endlessly. Seed `1337` is the fixed visual acceptance case.

Only the next ring counts. It is bright amber; upcoming rings are dimmer. Passed rings can dim further or hide. Passing near a torus is not enough: detect the aircraft movement segment crossing the active ring's plane through its opening in the intended travel direction. The exact crossing contract is in [architecture.md](architecture.md#checkpoint-crossing).

## Enemy layout

Place three stationary tanks near roughly 25%, 50%, and 75% of course progress, on gentle ledges or the valley floor beside the route. Each has a visible hull, tracks, turret, and barrel. Use a small supporting plate if necessary to avoid floating corners. Turret tracking is a small optional flourish; moving tanks are outside scope.

Place three small, crimson, faceted airborne targets near alternating later sections of the course. “Blips” means simple drone-like diamond bodies with short dark fins, not airships or HUD-only indicators. Give each an immutable seeded base position and phase, then a small slow oscillation. They do not chase or navigate.

All six targets must be visible 3D objects with useful approaches from the ring corridor. Keep their placement and motion clear of ring openings and terrain. Leave the first several seconds safe. Avoid simultaneous engagement by all enemies at spawn. Exact health, damage, range, cadence, and scoring live in [combat.md](combat.md).

## State, HUD, and endings

Use five modes: `menu`, `running`, `paused`, `won`, and `failed`.

| Mode | Required behavior |
|---|---|
| Menu | Show the cockpit/world, title, controls, objective, and a real Start button. Simulation and timer are stopped. |
| Running | Update flight, course, enemies, shots, timer, and the live HUD. |
| Paused | Freeze active time, movement, enemies, projectiles, and effects; show Resume and Retry. |
| Won | Freeze the completed run; show completion time, score, both kill counts, remaining hull, and Retry. |
| Failed | Freeze the run; show a specific reason and the same result fields, plus Retry. |

The upper HUD shows `RINGS n / 10`, `TANKS n / 3`, `BLIPS n / 3`, time remaining, hull with a short bar, score, title, and seed. Round cockpit instruments display live speed in m/s and ground clearance in metres, with moving needles and readable values. A boost lamp lights while boost is held during running.

Ground contact within the 3 m margin, crossing the finite map's X/Z bounds, running out of time, or hull reaching zero fails. The reasons must be distinguishable: `terrain`, `bounds`, `timeout`, and `hull`. There is no extra aircraft-to-tank or aircraft-to-blip collision system.

The tenth valid ring wins only if time remains and the aircraft survives that update. Failure takes precedence over victory in the same update; a lethal hit while crossing ring ten is a loss. Destroying all six enemies does not finish the course.

## Interaction and reset contract

DOM overlay controls must be keyboard accessible and genuinely clickable. A click on Start, Resume, or Retry must not also fire a gun. After those actions, move focus to the focusable game surface so a previously focused button cannot swallow flight/fire keys. Space must not scroll the document while controlling the game. Ignore flight/fire shortcuts when interacting with menu controls; handle active-game lifecycle keys deliberately. Install event listeners once, and ignore repeated Escape and R keydown events. R invokes the same reset/start path as Retry, including from a running or paused run.

Pause automatically when the window loses focus or the document becomes hidden. Clear held keys and mouse state on pause, focus loss, an ending, and Retry. Regaining focus must leave the game paused until explicit resume.

Retry returns to the same initial pose and seed, 48 m/s, 90 seconds, 100 hull, ring one, zero kills and score, all enemies alive at their original health and phase, and full enemy firing intervals. Clear projectiles, tracers, flashes, damage/hit feedback, and fire input. Reuse the renderer, scene resources, loop, and listeners.

## Acceptance evidence

The game must be playable by a person through real browser input. [tests/smoke.md](../tests/smoke.md) records the small set of behavior checks. Captures of normal flight, a tank engagement, and a banked airborne engagement are compared against [visual-target.md](visual-target.md). The [development observer](game-testing-mcp.md) supplies numerical evidence for state and events; it does not substitute for rendering or provide a separate way to “play” the game.

Aim for a smooth desktop result with bounded effects and capped pixel ratio. Report the measured browser, viewport, and hardware context when recording performance; a 60 FPS target is not a cross-device guarantee.
