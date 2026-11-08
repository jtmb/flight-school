# Repository integration decision

Date: 8 November 2026. Inspected base commit: `9c9c98e6fc2c9465001cea873125a377514a5f64` on `jtmb/flight-school/main`.

## Existing conventions retained

The repository initially contains `AGENTS.md`, `RULES.md`, `HANDOFF.md`, `opencode.json`, lowercase `docs/` and `tests/`, and 24 skills under `.agents/skills/`. It specifies strict TypeScript/Node, explicit errors, focused deterministic tests, logical Git commits, and no secrets/build artifacts. There is no application, package manifest, lockfile, TypeScript config, or running test suite at the inspected base.

The old handoff marked repository scaffolding complete; that was not a completed game. The new handoff starts implementation at Phase 0. Existing reusable skills are preserved, with three project-specific workflows added to guide implementation, visual review, and smoke checks.

## Owner's final direction

- Complete the plan in this existing repository and publish it through a PR and merge.
- Use a proper modular file structure, the biplane cockpit, tanks, airborne blips, and basic combat.
- Use agent-browser in place of Playwright MCP; the local model has vision.
- Use Markdown memory, with no Context7 or memory service.
- Give the agent direct game-state observations through a small custom testing MCP.
- Make the next handoff short: pull the merged repository, open the start document, and implement the dictated plan.

These project decisions are intentionally suitable for this public repository; no conversation transcript or unrelated private memory is included.

## Adaptations

| Earlier package | Repository decision | Reason |
| --- | --- | --- |
| Single HTML, later native JavaScript modules | Strict TypeScript modules + Vite | Respects the established TS/Node conventions while preserving static output |
| Uppercase `DOCS/`, `TESTS/`, `AGENT_SETUP/` | Lowercase `docs/`, `tests/`, setup documents under `docs/` | Avoid duplicate conventions and ambiguous paths |
| CDN import map | npm `three@0.180.0`, locked dependencies | Reproducible build; no runtime CDN dependency |
| Playwright CLI/MCP options and Context7 | agent-browser + three read-only game MCP tools | Owner's final tooling selection |
| Load `docs/**/*.md` as instructions | Load `RULES.md` and a small `docs/agent-context.md` | Prevent every spec and memory note entering every turn |
| Generic new skill directory | Existing `.agents/skills/` registration and indexes | Preserve discovered runtime IDs and installed workflows |
| Broad manual test wishlist | Focused logic checks + real browser cases + state evidence | Existing risk-based testing policy |

The new plan does not weaken repository permissions or bypass merge protections. Publishing and merging this bounded planning change is expressly authorized by the owner. Game implementation is the next agent's task, not part of this planning PR.

## Tool/skill boundaries

Keep the existing Playwright setup, asset-loading, and general visual-design skills as reusable resources. Do not invoke them to replace the selected agent-browser workflow, add downloaded models, introduce a UI framework, or redesign the accepted cockpit. New workflow skills point to canonical docs rather than duplicating their specifications.
