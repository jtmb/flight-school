# Read-only game diagnostics contract

Status: **specified, not implemented**. Implement this contract after the game's controller and combat state exist. The observer is required for the final agent handoff but must not become a second simulation.

## Files and ownership

| Planned file | Responsibility |
| --- | --- |
| `src/dev/contracts.ts` | Shared plain TypeScript types for snapshots, events, and transport envelopes; no Three.js or Node imports |
| `src/dev/diagnostics.ts` | Assemble copied state from controller-owned values and maintain a bounded diagnostic event buffer |
| `src/dev/telemetry.ts` | Publish snapshots from the existing render loop through Vite's dev connection |
| `tools/dev-bridge.ts` | Vite plugin: validate telemetry, cache it in memory, serve the three read endpoints |
| `tools/game-test-mcp/server.ts` | Three stdio tools, bounded fetches, no game state or browser ownership |

Install the browser adapter only when `import.meta.env.DEV` and `?debug=1` are both true. Expose an immutable object with two functions:

```ts
window.__flightDebug.snapshot();
const { instanceId } = window.__flightDebug.snapshot();
window.__flightDebug.events({ instanceId, after: 0, limit: 20 });
```

Both return newly assembled serializable data. No live Three.js objects, mutable simulation references, setters, command queue, arbitrary evaluation, teleport, force-hit, or instant-win API. Reading must not advance the game or consume events. The game controller owns setup/disposal and passes read callbacks; retries replace run data behind the same adapter.

## Snapshot, version 1

The following defines fields, not sample execution evidence. Use one `FlightSnapshot` type throughout the browser, bridge, and MCP.

| Field | Type and meaning |
| --- | --- |
| `schemaVersion` | Literal `1` |
| `testSession` | String from the debug query, default `flight-school`; a correlation label, not authentication |
| `instanceId` | Random page-instance ID created once per full page load |
| `runId` | Monotonic integer within that instance; zero at menu, increment on each new run/retry |
| `simTick` | Integer count of running simulation updates in this run; frozen while paused/finished |
| `mode` | `menu`, `running`, `paused`, `won`, or `failed` |
| `failureReason` | `null`, `terrain`, `timeout`, `bounds`, or `hull` |
| `seed` | Integer; default 1337 |
| `elapsedSeconds`, `remainingSeconds` | Finite active wall time, excluding pauses; not the sum of clamped movement deltas |
| `visibility` | `visible` or `hidden`, from the page |
| `player` | Plain position `{x,y,z}`, yaw/pitch/bank radians, speed, clearance, hull, boost flag |
| `course` | `passed`, `total: 10`, and `activeRingId` or `null` |
| `combat` | `score`, `tanksDestroyed`, `blipsDestroyed`, `playerShotsFired`, `lastMuzzle` (`left`, `right`, or `null`), `enemyProjectileCount` |
| `enemies` | Exactly six records: stable ID, `tank`/`blip`, alive, hitPoints, and plain position |
| `projectiles` | At most 24 records: ID, plain position, and remaining simulation lifetime; used only by full-state reads |
| `renderer` | Ready flag, WebGL context-lost flag, viewport width/height, pixel ratio; renderer name only if available |

All counters and entity health come from authoritative game state. Diagnostic shot counts may be added at the actual shot-emission point, never inferred from an animation. Positions must reflect the same updated frame used for aiming. No FPS claim is required from a single snapshot.

## Events, version 1

Keep a ring buffer of the last **256** diagnostic events. IDs increase monotonically for the entire page instance, including across retries. Every event includes `id`, `instanceId`, `runId`, `simTick`, `activeTimeSeconds`, `type`, and a small typed `data` object.

Emit events at existing rule transitions, not by observing the HUD:

| Type | Minimal data |
| --- | --- |
| `run_started`, `run_restarted` | Seed; whether a retry |
| `paused`, `resumed` | Cause (`escape`, `focus`, `visibility`, `button`) |
| `player_shot` | Muzzle, resolved hit kind and entity ID if present |
| `enemy_hit` | Enemy ID, previous/new HP |
| `enemy_destroyed` | Enemy ID/type, points awarded, new score |
| `enemy_shot` | Shooter ID, projectile ID |
| `player_damaged` | Projectile ID, previous/new hull |
| `ring_passed` | Ring ID and new cleared count |
| `run_finished` | `won`/`failed`, reason, final score/time |

`events({instanceId,after,limit})` validates the expected page instance, then returns events with IDs greater than `after`, up to `limit` (default 20, maximum 50), plus `oldestAvailableId`, `latestId`, `nextCursor`, and `cursorGap`. `nextCursor` is the last returned ID, or the supplied cursor when no event is returned. If `after < oldestAvailableId - 1`, return `cursorGap: true`; never suggest the event stream is complete. Reject a cursor from a different instance. Reading again with the same cursor is repeatable.

On retry, gameplay counters reset but diagnostic event IDs continue and `runId` changes. This makes it possible to compare two attempts without confusing an old kill with a new one. A full reload creates a new instance and starts a new event sequence.

## Publication

From the existing render loop, publish at most **five times per second** of wall time, including menu/paused/finished renders. Do not add another animation loop, simulation timer, or persistence database. A visibility/focus transition may publish one immediate final observation before browser throttling.

Send a typed envelope with `schemaVersion`, `testSession`, `instanceId`, incrementing `publicationSequence`, the current snapshot, and up to 32 recent events using `import.meta.hot.send('flight:telemetry', envelope)`. The Vite plugin listens to that one namespaced event. It deduplicates event IDs and retains at most 256 events per instance. Retain only a contiguous event tail: if reconnect/publication loss leaves a gap between cached events and the newly received tail, discard the disconnected older segment and advance `oldestAvailableId`. Thus an old cursor reports a gap even when missing IDs were formerly inside the combined cache. Example: receiving 70–101 after caching 1–30 replaces the retained range with 70–101; a cursor of 30 reports a gap, while 69 does not. Sequence numbers order publication; `simTick` describes simulation progression. They are deliberately different during pause.

Use Vite's already-present development WebSocket; no extra application server or telemetry POST endpoint is required. If the observer connection is unavailable, the game continues normally. Log one concise diagnostic warning, not one per frame. Dispose the adapter on HMR teardown and remove the exposed object to prevent duplicates.

## Evidence rules

- A fresh heartbeat with unchanged `simTick` while paused is correct. A stale heartbeat is not evidence of a successful pause test.
- State is not a picture. Review actual PNGs for cockpit geometry, target visibility, muzzle placement, and HUD composition.
- A screenshot and a separately requested snapshot during motion are adjacent observations, not an atomic same-frame capture. For matching views, release keys and pause through real input before capturing both, or record their timing difference.
- `source = live_game` labels origin; it does not by itself prove a feature. Pair input, observed state change, event evidence, and image review for the relevant acceptance claim.
- Production builds and preview must not expose these methods, endpoints, or telemetry. Build with the dev branch eliminated and check the production page through ordinary browser input.
