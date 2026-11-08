# Combat contract

## Objective and defaults

Combat adds optional score and danger to the ten-ring, 90-second flight. Ring ten remains the only victory objective. All enemies may remain alive when the player wins.

Put tuning in `src/config.ts`. These are the planned starting defaults; any tuning change after a real playtest must update this contract and the relevant acceptance checks together.

| Setting | Default |
|---|---|
| Player hull | 100 HP |
| Player fire | 6 shots/second; unlimited ammunition |
| Player shot | Hitscan; 500 m maximum range; 1 enemy hit point per hit |
| Tanks | 3 stationary enemies; 2 HP each; 200 points per destruction |
| Airborne blips | 3 slowly oscillating enemies; 1 HP each; 100 points per destruction |
| Tank fire interval | 3 seconds |
| Blip fire interval | 2.5 seconds |
| Enemy engagement distance | At most 300 m, with terrain line of sight |
| Enemy projectile | 25 hull damage; 100 m/s; 5 simulation seconds of lifetime |
| Enemy projectile cap | 24 active projectiles across all enemies |
| Aircraft projectile collider | Sphere of 3 m radius around the aircraft state position |

Maximum combat score is 900. Ring passage adds progress, not combat points. Four enemy projectile hits from full hull cause failure. Terrain contact and leaving the finite map cause immediate failure rather than hull damage.

## Enemy representation

A tank has an olive low hull, simplified dark tracks, a turret, and a short barrel. Place it using the shared terrain query, on a gentle part of the floor or a ledge. A simple base plate is acceptable. No moving tracks, pathfinding, ballistic shell arc, or armour facing is required.

A blip has a small crimson faceted diamond/drone body, dark fins, and a visible warm core. Start from a seeded base position and phase; apply a small slow sine offset using accumulated simulation time. Keep its entire motion envelope clear of terrain and ring openings. No pursuit, obstacle avoidance, squadron AI, or full aircraft model is required.

Use generous primitive colliders that follow the visible body without extending far beyond it. A sphere or a box is enough. Explicitly synchronize moving blip colliders with their meshes before shots are queried. Every enemy has a stable ID, kind, current health, alive flag, firing deadline, collider, visual handle, and immutable reset record.

Each of the six spawns is reproducible from the world seed. Keep the initial flight corridor safe and provide useful approaches beside the ring route. Do not require a collision-risk dive to reach every tank.

## Player weapon

Hold Space or the left mouse button while running to fire. Shooting follows the aircraft and centered reticle; there is no independent mouse aim. Ignore overlay clicks, and clear held fire whenever the run pauses, ends, loses focus, or retries.

For each due shot:

1. Update/read the current camera and enemy world transforms.
2. Construct one ray from the camera through the center reticle, capped at 500 m.
3. Find the nearest living target intersection and the nearest terrain intersection. Hit a target only if it is nearer than terrain and within range. Terrain wins a tie.
4. Apply one point of damage to that one target. Do not pierce through multiple enemies.
5. Alternate the left/right cockpit muzzle anchor and show a brief amber flash and tracer to the resolved hit point or miss endpoint.
6. Schedule the next shot at `activeNow + 1 / 6` seconds.

Guns provide visual origins for effects; the camera ray defines the hit. This avoids misleading close-range aim caused by two parallel muzzle rays. The reticle must stay aligned with the ray. Exclude cockpit meshes, rings, tracers, flashes, and destroyed enemies from the query.

A tank visibly survives one hit and is destroyed by the second. A blip is destroyed by one hit. Show a restrained hit marker immediately. On destruction, deactivate the collider before any later shot, hide/pop the enemy, increment its type's kill count once, and award its score once. A short flash or a few bounded low-poly fragments is sufficient. Previously launched enemy projectiles remain active after their source is destroyed.

Use active elapsed wall-time deadlines for firing cadence, excluding pauses. Emit at most one due player shot per rendered update and restart the deadline from current active time. Do not catch up a burst of missed shots after a slow frame or pause. Unlimited ammunition does not mean unlimited simultaneous effects; cap or pool tracer/flash records.

## Enemy return fire

Each living enemy begins with a full fire interval. On a due attempt, advance its deadline to `activeNow + interval` regardless of whether it can fire. It may spawn one shot only if the player is within 300 m, terrain does not occlude the enemy muzzle-to-player line, and fewer than 24 enemy projectiles are active. A blocked, distant, or capacity-limited attempt is skipped; there is no queue of stored shots.

Capture a normalized direction toward the player's position at firing time. Spawn a clearly visible red projectile at the enemy muzzle and retain that direction. Shots do not lead the aircraft or home. Simple placement and modest cadence should make evasion possible; no bullet patterns or prediction system is needed.

New projectiles start moving on the next simulation update. Move existing projectiles at 100 m/s using the bounded simulation delta. Their five-second lifetime also uses simulation time. Pause therefore freezes both their position and expiry. Expire or remove each one at most once.

Sweep from each projectile's old position to its new position. Compare terrain contact with the moving aircraft sphere and resolve the earliest normalized collision time. Account for both player and projectile motion through a relative segment, so a crossing between frame endpoints cannot pass unnoticed. A terrain collision consumes the projectile; a player collision consumes it and subtracts 25 hull, clamped at zero. Terrain wins a simultaneous collision. Enemy shots do not damage other enemies.

Show a short damage vignette/flash on the player hit. When hull reaches zero, stop the frame's remaining gameplay work and fail with `hull`. Failure has precedence over a final-ring win in that update. The controller remains the one place that commits the transition.

## Lifecycle and observability

Combat owns numeric health, score changes, fire deadlines, and projectile state. World construction owns meshes and immutable spawn records. Cockpit presentation supplies muzzle anchors; HUD reads current counters. There is one animation loop and no separate timer loop for weapons.

Retry restores 100 hull, zero score and kills, every enemy's initial position/phase/health/alive state, full enemy intervals, the initial muzzle selection, and immediately ready player fire. It clears all old projectiles, tracers, flashes, hit markers, damage feedback, and held fire. The same seed must return the same initial layout without duplicate meshes or listeners.

Emit observational events at real transitions: player shot, target hit, target destroyed, enemy shot, player damaged, and run ended. Snapshots expose the actual live enemies, hull, score, projectile count, and emitted-shot count as defined in [game-testing-mcp.md](game-testing-mcp.md). Observations must not mutate those values or make an otherwise invalid hit succeed.

## Concrete acceptance cases

Use focused geometry/state checks for edge cases that are hard to reproduce manually, and real browser input for visible integration. Record the selected method and actual result in [tests/smoke.md](../tests/smoke.md).

| Case | Required observation |
|---|---|
| Tank damage | First unobstructed in-range shot leaves 1 HP and no score; second destroys it and adds 200 exactly once |
| Blip damage | One unobstructed in-range shot destroys it and adds 100 exactly once |
| Occlusion/range | A nearer ridge or a target beyond 500 m prevents damage and score |
| Target ordering | One shot damages only its nearest unobstructed living target |
| Cadence | Holding fire respects the active-time deadline; a hitch/resume does not replay a backlog |
| Return fire | In-range enemies with line of sight send visible fixed-heading projectiles; blocked/out-of-range enemies do not |
| Collision | A swept projectile cannot cross the aircraft between endpoints or damage it through nearer terrain |
| Hull/result | Each valid hit removes 25 hull; four hits cause one hull failure; lethal final-ring update loses |
| Pause/retry | Pausing freezes combat; Retry restores all enemies and counters and clears old effects/shots |

Compare actual tank and blip engagement captures with [reference-images/02-ground-combat.png](reference-images/02-ground-combat.png) and [reference-images/03-air-combat.png](reference-images/03-air-combat.png). Those images guide composition and feedback; the rules here determine health, score, timing, and hit validity.
