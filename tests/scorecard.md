# Local-model benchmark scorecard

Status: **unscored**. The planning PR supplies no implementation results.

Use the same prompt, references, model configuration, tool access, and execution budget for comparisons. Record first-playable time separately from completion of the expanded combat/observer/visual package. Tooling setup and dependency downloads should be reported, not hidden in the game-build time.

| Category | Points | Credit |
| --- | ---: | --- |
| Playable loop | 25 | Boot/start, reachable ordered ten-ring course, clear endings, reliable retry |
| Flight and cockpit | 20 | Correct controls, responsive motion/bank, stable open biplane cockpit, live instruments |
| Combat | 25 | Both target types, correct hits/score, return fire, hull damage, terrain occlusion |
| Visual acceptance | 15 | Reference identity, coherent canyon, readable targets/effects/HUD, actual vision review |
| Architecture and reliability | 15 | Meaningful TypeScript modules, one loop, complete reset/pause, usable observer evidence |
| Total | 100 | |

Do not mark the game complete if it does not boot, the course cannot be finished, a required enemy type/cockpit is missing, or retry corrupts the run. The requested full handoff additionally requires the game-testing MCP to return actual live state. A polished concept or screenshot alone cannot pass functionality.

## Run record

- Model, quantization, context, generation settings: not recorded.
- Tool/OpenCode/browser versions: record from actual implementation run.
- Time to first playable / full acceptance: not recorded.
- Score: not assessed.
- Acceptance outcomes and evidence: [smoke record](smoke.md).
