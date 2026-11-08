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

## Quality gates
- Type-check, lint, and the full test suite must pass before committing.
- Add or update tests alongside the code you change.

## Git
- Commit one logical concern per commit with a clear, descriptive message.
- Keep the working tree clean; do not commit secrets, build output, or local noise.

## Security
- Treat secrets as sensitive; never commit keys, tokens, or credentials.
- Validate and sanitize all external input before use.
