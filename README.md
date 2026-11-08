# gpt-flight-school

A small first-person flight and combat game: fly a vintage biplane through a generated canyon, clear ten amber rings, and engage ground tanks and airborne blips.

**Status: implementation-ready plan. The game is not implemented yet.**

## For the coding agent

Start at **[00_START_HERE.md](00_START_HERE.md)**, then execute **[ONE_SHOT_PROMPT.md](ONE_SHOT_PROMPT.md)**. The [handoff](HANDOFF.md) and [current state](docs/state/now.md) identify the first incomplete phase.

The project uses strict TypeScript, Three.js, modular files, and a small Vite build. Agent-browser controls the game; a local game-testing MCP observes live state. Memory stays in Markdown. Repository conventions and existing skills are retained.

## Design references

The [three acceptance concepts](docs/visual-target.md) cover level flight, ground combat, and banked air combat. They define the look of the cockpit, canyon, targets, and HUD. These images are concepts, **not footage of an implemented game**.

## Plan

- [Game design](docs/game-design.md), [architecture](docs/architecture.md), and [combat](docs/combat.md)
- [Implementation phases](docs/implementation-plan.md)
- [Agent tools and skills](docs/agent-setup.md)
- [Game-state contract](docs/diagnostics.md) and [testing MCP](docs/game-testing-mcp.md)
- [Memory workflow](docs/memory-workflow.md)
- [Acceptance checks](tests/smoke.md) and [benchmark scorecard](tests/scorecard.md)

Launch commands will become runnable after Phase 0 creates the package scripts. The intended development command is `npm run dev`, with a static production build from `npm run build`. Keep setup claims aligned with the actual implementation.
