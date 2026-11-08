# Handoff — gpt-flight-school implementation

**Current state: planning ready; application implementation has not started.**

Read [00_START_HERE.md](00_START_HERE.md), then execute [ONE_SHOT_PROMPT.md](ONE_SHOT_PROMPT.md). The next action is **Phase 0** in [the implementation plan](docs/implementation-plan.md): inspect the checkout, create the strict TypeScript/Vite package setup, install the pinned browser tool, and record the environment.

## Preserved baseline

The original repository scaffolding was complete at `9c9c98e6fc2c9465001cea873125a377514a5f64`: strict TS/Node conventions, lowercase docs/tests, OpenCode configuration, and 24 existing skills. It contained no game source or package manifest. See [the integration decision](docs/decisions/repository-integration.md) for the adaptation from the earlier ZIP.

## This planning handoff

- Complete flight, cockpit, combat, architecture, implementation, and acceptance specifications.
- Three approved concept images under `docs/reference-images/`.
- Agent-browser selected; Context7 and Playwright MCP excluded from this workflow.
- Small read-only game-testing MCP contract; its config is deliberately disabled until built.
- Markdown memory index and two project decision notes using the existing memory skill.
- Three project skills added alongside the preserved skill collection.
- Narrow automatic instruction loading; detailed specifications and memory are loaded on demand.

## Resume record

Use [docs/state/now.md](docs/state/now.md) as the single detailed progress record. Update it at meaningful milestones and before compaction. It must name the current phase/commit, completed checks and evidence, blockers, and the next concrete action.

No gameplay, browser combat, or live game-MCP result is claimed by this planning change. Follow [planning validation](docs/planning-validation.md) for checks actually performed on the handoff itself.
