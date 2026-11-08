# Start here — gpt-flight-school

This is the implementation handoff for the **existing `jtmb/flight-school` repository**. The planning change supplies specifications, project skills, configuration, and three concept references. It does not claim that the game or its testing MCP has already been built.

## Resume in this order

1. Read [AGENTS.md](AGENTS.md), [RULES.md](RULES.md), [HANDOFF.md](HANDOFF.md), and [current state](docs/state/now.md). Inspect Git status and preserve unrelated work.
2. Read [ONE_SHOT_PROMPT.md](ONE_SHOT_PROMPT.md), then the [implementation phases](docs/implementation-plan.md). Continue the first incomplete phase; do not restart completed work.
3. For gameplay, read [game design](docs/game-design.md), [architecture](docs/architecture.md), and [combat](docs/combat.md). For presentation, open all three images linked by the [visual contract](docs/visual-target.md).
4. Set up [agent-browser and OpenCode](docs/agent-setup.md). Follow the existing [memory skill](.agents/skills/agent-memory/SKILL.md) and [memory workflow](docs/memory-workflow.md). The local model has vision: inspect real screenshots, not only accessibility text.
5. Build the game and the small [game-testing MCP](docs/game-testing-mcp.md), using the [diagnostics contract](docs/diagnostics.md). Drive actions through real browser controls; read state through the observer.
6. Run the focused [acceptance checks](tests/smoke.md), fix observed defects, and update the state/handoff with actual evidence. Follow the repository's [testing policy](.agents/skills/testing-skill/SKILL.md).

## Settled choices

| Concern | Decision |
| --- | --- |
| Product | `gpt-flight-school`: seeded canyon flight, ten rings, 90 seconds, vintage biplane cockpit, three tanks, three flying blips, player guns and return fire |
| Application | Strict TypeScript, vanilla DOM/CSS, Three.js **0.180.0**, Vite, separate modules; static production output |
| Browser | **agent-browser**, one named session and one game tab, local Chrome/Chromium |
| Observation | Read-only game snapshots and bounded events; a local stdio MCP exposes three tools |
| Memory | Root `MEMORY.md` index plus small `docs/memory/` notes; task progress in `HANDOFF.md` and `docs/state/now.md` |
| Existing conventions | Keep lowercase `docs/` and `tests/`, `.agents/skills/`, `RULES.md`, explicit skill registration, and proportionate checks |
| Excluded tooling | No Context7, memory server/database, or Playwright MCP for this project workflow |

The plan supersedes the old single-HTML/no-build draft and the generic navy cockpit. Existing reusable skills remain available, but their optional frameworks, asset loaders, browser setup, or UI styles do not expand this game's contract.

## Working rules for the implementing agent

- Finish the playable loop before decoration. Add the observer only after it has real game state to expose.
- Make routine, reversible implementation choices within this plan. Ask only if a genuine missing requirement or authorization prevents useful progress.
- Keep one implementation branch. Commit coherent milestones after applicable checks. Before compaction, update the current state with the next concrete action.
- The original one-hour target is a first playable milestone, not a promise for the expanded combat, visual acceptance, and MCP work. Record elapsed time honestly; do not drop required features or claim unrun checks to fit that target.
- All dependency installation and gameplay implementation occur in Phase 0 onward. Commands in the plan describe the intended scripts; they are not available until those scripts exist.

## Completion

Deliver a working game, the functional observer MCP, the three actual gameplay comparison captures, applicable passing type/lint/test/build checks, and concise launch/control instructions. A spec, concept image, or invented test result does not satisfy completion. A missing optional screen-recording utility does not block the core game.
