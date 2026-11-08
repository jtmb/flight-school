# HANDOFF — flight-school repo init

Status: **COMPLETE** (verified 2026-11-08). No remaining work.

## Goal
Scaffold the `flight-school` repo (TypeScript/Node) per the user's request:
git init, AGENTS.md, RULES.md, `tests/`, `docs/`, and a repo-level `opencode.json`,
preceded by web research on agent-friendly repo design. Then install agent skills
and wire them into opencode.

## Completed & verified
- `git init -b main` — 4 commits, tree clean.
  - `a40e4d0` scaffold (AGENTS.md, RULES.md, tests/, docs/, opencode.json, .gitignore)
  - `dfdf57d` three.js skills (3)
  - `69a71a8` Taste Skill framework (12 skills)
  - `d7a66c7` skill-install rule in RULES.md + `skills:[.agents/skills]` in opencode.json
- `AGENTS.md` — TS/Node context, defers to RULES.md.
- `RULES.md` — authoritative rules incl. "use the question tool; no unconfirmed scope expansion"
  and the `## Skills` rule (place skills in `.agents/skills/<name>/SKILL.md`, register the
  dir in opencode.json, verify description + load).
- `tests/README.md`, `docs/README.md` — folder guidance.
- `opencode.json` — `$schema`, `instructions:["RULES.md","docs/**/*.md"]`, `skills:[".agents/skills"]`.
- `.agents/skills/` — 15 skills (3 threejs + 12 taste). Each SKILL.md has `name`+`description`;
  all are advertised/loaded in opencode (confirmed via available skills this session).

## Design decisions (research-backed)
- RULES.md loaded via opencode.json `instructions` (opencode does NOT auto-follow `@ref` in AGENTS.md).
- Lowercase `tests/`/`docs/` (user chose over uppercase). Model field omitted (uses global default).

## Open items / notes (not blocking)
- No `package.json`/`tsconfig.json` yet — AGENTS.md's `npm test`/`tsc`/`lint` scripts are
  placeholders until real code + a test runner (e.g. Vitest) are added.
- `.agents/skills` is auto-discovered by opencode, so the explicit `skills` array is belt-and-suspenders.

## Next action (if resumed)
None required. Optional: scaffold `package.json` + `tsconfig.json` + test runner when real code begins.
