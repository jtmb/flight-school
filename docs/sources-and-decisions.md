# Sources and decisions

Reviewed 8 November 2026. These primary sources support specific tool/configuration choices. They do not certify the proposed game, guarantee model performance, or prove one universally optimal memory layout.

## Source register

| Source | Supports |
| --- | --- |
| [Existing repository baseline](https://github.com/jtmb/flight-school/tree/9c9c98e6fc2c9465001cea873125a377514a5f64) | Strict TS/Node, lowercase docs/tests, skills, rules, and no application yet |
| [agent-browser v0.41.2 release](https://github.com/vercel-labs/agent-browser/releases/tag/v0.41.2) | Selected reproducible release; targeted skill references and session guidance |
| [agent-browser introduction](https://agent-browser.dev/) | Native CLI/daemon, Chrome/CDP, compact output and ref-based interaction |
| [Installation](https://agent-browser.dev/installation) | npm binary installation and browser setup |
| [Commands](https://agent-browser.dev/commands) and [sessions](https://agent-browser.dev/sessions) | Screenshot, eval, held-key, diagnostics, and named-session capabilities |
| [OpenCode V2 MCP configuration](https://opencode.ai/docs/mcp-servers/) | `mcp.servers`, `disabled`, command/cwd/environment, direct tool exposure, protocol negotiation |
| [OpenCode V2 skills](https://opencode.ai/docs/skills/) | `.agents/skills` discovery, explicit source registration, IDs and on-demand bodies |
| [OpenCode API](https://opencode.ai/docs/api) and [v2.2.6 skill route](https://github.com/anomalyco/opencode/blob/v2.2.6/packages/protocol/src/groups/skill.ts) | Read-only runtime registration/body verification |
| [OpenCode instructions](https://opencode.ai/docs/instructions/) | Scope of AGENTS and configured instruction documents |
| [Three.js installation](https://threejs.org/manual/en/installation.html) | npm and Vite development with static build output |
| [Vite plugin API](https://vite.dev/guide/api-plugin.html) | Dev middleware and namespaced custom events over the existing development connection |
| [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) | Stable v2 split server package, stdio transport, schema validation |
| [Google Open Knowledge Format](https://github.com/GoogleCloudPlatform/open-knowledge-format) | Portable Markdown/YAML, versioning, provenance, links, progressive disclosure; a format, not an optimal-layout experiment |
| [Google Research ReasoningBank](https://research.google/blog/reasoningbank-enabling-agents-to-learn-from-experience/) | Relevant retrieval and reusable lessons from success/failure, not a prescribed Markdown directory tree |

Package availability and selected peer ranges were checked through the npm registry during planning. Three.js 0.180.0 is the previously agreed runtime pin, not a latest-version recommendation. TypeScript 5.9.3 is deliberately paired with a compatible ESLint stack; newer compiler releases are unnecessary for this scope. Commit the exact implementation lockfile rather than resolving fresh latest versions on each run.

## Decisions derived from the evidence

1. Agent-browser is a reasonable fit for a local vision model because it can expose concise browser text and actual images while retaining a browser across commands. Total token savings versus Playwright MCP are workload-dependent; no quantitative guarantee is made here.
2. Keep one browser owner. A separate MCP reads compact simulation data from Vite rather than launching or controlling another browser. This is our project design, not an upstream game-testing product.
3. Reuse Vite's dev connection for telemetry and a small middleware for reads. The production game remains a static browser application and requires no backend.
4. Preserve the existing memory convention. Google sources offer relevant ideas, but the exact paper intended in the conversation was not identified; do not attribute this folder layout to an unverified paper.
5. Keep instructions small and load specs/skills/memory on demand. This serves the local model without changing its provider, permissions, or model settings.

## Scope changes from earlier drafts

Superseded: one HTML file, no build tooling, CDN import map, generic navy cockpit, eight bullseye targets, Playwright/Context7 setup examples, uppercase documentation directories.

Current: modular strict TypeScript/Vite; npm Three.js 0.180.0; vintage red/wood biplane cockpit; three tanks and three moving blips; agent-browser; three-tool game observer MCP; Markdown memory; existing lowercase repository conventions. These choices follow the owner's final request and inspected repository, as recorded in [the integration decision](decisions/repository-integration.md).
