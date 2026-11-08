# Documentation map

Start at [00_START_HERE.md](../00_START_HERE.md). Load the relevant document when needed rather than injecting this whole directory into agent context.

| Document | Purpose |
| --- | --- |
| [Game design](game-design.md) | Product scope, controls, states, and victory/failure |
| [Architecture](architecture.md) | TypeScript files, ownership, module contracts, and frame order |
| [Combat](combat.md) | Player hitscan, tanks/blips, return fire, damage, and score |
| [Visual target](visual-target.md) | Three concept references and inspectable appearance criteria |
| [Implementation plan](implementation-plan.md) | Ordered phases, deliverables, gates, and handoff points |
| [Agent setup](agent-setup.md) | OpenCode V2, agent-browser, skills, commands, and tool pins |
| [Diagnostics](diagnostics.md) | Copied game-state and event schemas |
| [Game-testing MCP](game-testing-mcp.md) | Dev bridge, endpoints, three read tools, and activation |
| [Memory workflow](memory-workflow.md) | Small topic notes and selective retrieval |
| [Current state](state/now.md) | Implementation progress and next action |
| [Integration decision](decisions/repository-integration.md) | Existing conventions and superseded ZIP decisions |
| [Sources and decisions](sources-and-decisions.md) | Primary research and explicit evidence limits |
| [Planning validation](planning-validation.md) | Checks of this handoff; not gameplay test results |

Acceptance records live under [tests/](../tests/README.md). Browser artifacts stay separate from concept PNGs. Durable memory is indexed by [MEMORY.md](../MEMORY.md).
