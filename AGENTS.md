# AGENTS.md

Context for AI coding agents working in this repository.
See **RULES.md** for the authoritative, detailed conventions — load it before
making changes (it is also auto-loaded via `opencode.json`).

## Project
`flight-school` — **gpt-flight-school**, a modular TypeScript / Three.js game.
Begin at **00_START_HERE.md** and resume from **HANDOFF.md** and
**docs/state/now.md**. The game and testing MCP are planned, not implemented yet.

## Setup
- Phase 0 creates the package manifest and scripts. Before that, npm commands
  are planned commands, not runnable setup.
- Once the lockfile exists: `npm ci`.
- Develop: `npm run dev`; type-check: `npm run typecheck`; lint: `npm run lint`.
- Tests: `npm test`; production: `npm run build` then `npm run preview`.
- Browser and MCP setup: `docs/agent-setup.md`; telemetry: `docs/game-testing-mcp.md`.

## Code style
- TypeScript strict mode.
- Follow the conventions in `RULES.md` (naming, structure, error handling).

## Testing
- Put tests under `tests/`; keep them focused and deterministic.
- Apply `.agents/skills/testing-skill/SKILL.md`: add or update checks for concrete
  behaviour risks and use actual browser/state evidence for the game.
- Fix type, lint, and test failures before finishing.

## Skills
- Agent skills live in `.agents/skills/`; see `.agents/skills/SKILL-INDEX.md`
  (and `.agents/skills/llms.txt`) for the current index of all skills.
- Use `agent-memory` for durable user preferences, facts, workflows, and decisions,
  and `self-learning` when the user asks to learn from sessions or improve skills;
  see `RULES.md` for the detailed usage rules.
- Use `flight-implementation`, `flight-visual-acceptance`, and `flight-smoke-check`
  for this game's build and acceptance. Agent-browser owns one named browser
  session. The vision model reviews actual PNGs; the read-only game MCP reports
  state/events. No Context7 or Playwright MCP is selected for this project.

## Rules & docs
- Authoritative rules: `RULES.md` (also loaded via `opencode.json` `instructions`).
- Detailed documentation: `docs/`.
- Only `RULES.md` and the small `docs/agent-context.md` are auto-loaded. Read other
  documents and memory notes on demand, following the start document.
- When you need clarification from the user, use the question tool instead of guessing.
