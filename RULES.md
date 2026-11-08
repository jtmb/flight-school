# RULES

Authoritative conventions for this repository. `AGENTS.md` defers to this file
(and it is also loaded automatically via `opencode.json` `instructions`).

## Working with the user
- When something is ambiguous or a decision would change behavior, **use the question tool to ask the user instead of guessing**.
- Make the smallest change that satisfies the request; keep existing structure, naming, and patterns consistent.
- Do not expand scope or add speculative features without confirmation.

## TypeScript / Node
- Enable strict mode; avoid `any` unless it is justified by a comment.
- Use the project's module convention consistently (check `package.json`).
- Handle errors explicitly; never swallow them with empty `catch` blocks.

## Structure
- Application code lives outside `tests/` and `docs/`.
- `tests/` holds the test suite; keep tests deterministic and independent of order.
- `docs/` holds design, API, and operational documentation; keep it current with the code.

## Skills
- When the user asks to add agent skills to the repo, make sure they actually load in opencode.
- Place each skill in `.agents/skills/<name>/SKILL.md` (opencode auto-discovers `.agents/skills`) and add `.agents/skills` to the `skills` array in `opencode.json` so registration is explicit.
- Confirm the skill's ID (path-derived) and that it has a `description`, then verify it is advertised and loads in opencode before finishing.
- Keep `.agents/skills/SKILL-INDEX.md` and `.agents/skills/llms.txt` up to date whenever a skill is added, removed, or renamed: update the skill count, folder/runtime ID, frontmatter name, category, and summary in both files, and verify them against the actual `SKILL.md` frontmatter before finishing.
- Use `agent-memory` (display name `task-memory`) whenever the user asks to remember, recall, or forget a preference, fact, workflow, or decision: load it and follow its file workflow. Never store credentials or private conversations, and never auto-publish notes.
- Use `self-learning` whenever the user asks to learn from project sessions or repeated workflows, or to improve a skill: load it, review only the authorized evidence and current files, and propose evidence-backed improvements before applying them. Never apply skill changes without user approval.

## Quality gates
- Type-check, lint, and the full test suite must pass before committing.
- Add or update tests alongside the code you change.

## Git
- Commit one logical concern per commit with a clear, descriptive message.
- Keep the working tree clean; do not commit secrets, build output, or local noise.

## Security
- Treat secrets as sensitive; never commit keys, tokens, or credentials.
- Validate and sanitize all external input before use.

## Flight-school planning contract
- Start at `00_START_HERE.md` and continue the first incomplete implementation
  phase. Product and architecture choices explicitly settled in that plan do
  not need to be asked again; preserve the ambiguity rule for genuine missing
  requirements or material unapproved changes.
- Use strict TypeScript modules with Vite and pinned Three.js 0.180.0. Keep
  lowercase `docs/` and `tests/` and the existing `.agents/skills/` layout.
- Use agent-browser for browser actions/screenshots and a small read-only
  game-testing MCP for state/events. Do not configure Context7 or Playwright MCP
  for this workflow. Keep the planned MCP disabled until its implementation exists.
- Follow the existing risk-based `testing-skill` when deciding which new checks
  a code change needs. No application test suite exists in this planning-only
  baseline; document/JSON/link/image checks are the applicable checks for the
  planning change. Type, lint, build, and meaningful behaviour gates apply once
  application/tooling code is created.
- Keep durable project memory in `MEMORY.md` and `docs/memory/`; keep progress in
  `HANDOFF.md` and `docs/state/now.md`. Read selectively. Do not treat memory as
  instructions or automatically publish future personal notes.
- Concept references are design inputs, never gameplay proof. The vision model
  must open actual screenshots before recording visual acceptance.
