---
name: flight-implementation
description: Implement or repair gpt-flight-school gameplay and its development observer within the accepted modular TypeScript plan. Use for the flight-school build, flight, terrain, course, cockpit, combat, lifecycle, or game-testing MCP work.
---

# Flight implementation

1. Read [start here](../../../00_START_HERE.md), [current state](../../../docs/state/now.md), and the next incomplete phase in [the implementation plan](../../../docs/implementation-plan.md). Preserve completed work and unrelated edits.
2. Load the relevant architecture or combat section, not every repository skill. Keep strict TypeScript, Three.js 0.180.0, Vite, and the agreed module responsibilities. Generic design and asset-loading skills do not change this game's scope.
3. Complete a playable vertical slice first. Keep scene resources separate from resettable run data, one animation loop, and one owner for state transitions. Synchronize current transforms before raycasts. Use active wall time for the countdown and bounded deltas for movement.
4. Implement the accepted cockpit and both target types. Use generated primitives and live gauges. Preserve the open aiming gap and fixed cockpit while the outside world banks.
5. Load the installed browser's concise instructions with `npx --no-install agent-browser skills get core`; request `--ref commands` only for command details. Use one explicit `--session flight-school` on every command. The exact setup is in [agent setup](../../../docs/agent-setup.md).
6. Implement the [read-only diagnostics](../../../docs/diagnostics.md) and [three-tool MCP](../../../docs/game-testing-mcp.md) after there is actual controller state to observe. Never let the observer become another simulation or browser owner.
7. Verify the current milestone using the repository's [testing policy](../testing-skill/SKILL.md). Fix observed defects, preserve useful checks, and avoid new testing infrastructure without a concrete uncovered risk.
8. Update current state and the handoff with actual results, evidence paths, remaining defects, and the next action. Record reusable lessons through the existing [memory workflow](../../../docs/memory-workflow.md); do not create session diaries.

Stop when the requested implementation, applicable project gates, functional acceptance, and visual review are complete. Report any unrun checks explicitly. Never claim concept art or a plan is completed gameplay.
