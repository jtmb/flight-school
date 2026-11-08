# AGENTS.md

Context for AI coding agents working in this repository.
See **RULES.md** for the authoritative, detailed conventions — load it before
making changes (it is also auto-loaded via `opencode.json`).

## Project
`flight-school` — a TypeScript / Node.js project.

## Setup
- Install dependencies: `npm install`
- Run tests: `npm test`
- Type-check / lint: `tsc --noEmit` and `npm run lint`
- Build: `npm run build`

## Code style
- TypeScript strict mode.
- Follow the conventions in `RULES.md` (naming, structure, error handling).

## Testing
- Put tests under `tests/`; keep them focused and deterministic.
- Add or update tests for any code you change.
- Fix type, lint, and test failures before finishing.

## Skills
- Agent skills live in `.agents/skills/`; see `.agents/skills/SKILL-INDEX.md`
  (and `.agents/skills/llms.txt`) for the current index of all skills.
- Use `agent-memory` for durable user preferences, facts, workflows, and decisions,
  and `self-learning` when the user asks to learn from sessions or improve skills;
  see `RULES.md` for the detailed usage rules.

## Rules & docs
- Authoritative rules: `RULES.md` (also loaded via `opencode.json` `instructions`).
- Detailed documentation: `docs/`.
- When you need clarification from the user, use the question tool instead of guessing.
