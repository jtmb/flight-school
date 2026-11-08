# OpenCode V2 agent setup

This guide defines the implementation environment. The planning PR does not install tools into the owner's machine or implement the game. Use the repository's existing OpenCode provider/model configuration; do not change its provider, permissions, or global defaults.

## Chosen tools

| Need | Selected tool | Boundary |
| --- | --- | --- |
| Code, shell, Git | OpenCode's existing facilities | No extra filesystem/Git MCP is required |
| Browser controls and images | `agent-browser@0.41.2` CLI, Chrome engine | One session and game tab; no Playwright MCP |
| Simulation evidence | Local `flight-school` MCP | Three read-only tools over the Vite observer endpoints |
| Durable memory | Existing Markdown `agent-memory` workflow | No database or memory service |
| Visual review | The local model's vision and actual PNGs | Open captured images; do not infer geometry from DOM snapshots |
| Documentation | Links in this package and targeted official documentation when needed | No Context7 |

Agent-browser is selected for its compact command output, focused accessibility snapshots, and version-matched skill references. Its current native CLI/daemon controls Chrome through CDP. These are useful properties for a local model; this plan does **not** promise a particular percentage of token or speed improvement against every Playwright configuration. Vision images still consume context. See [sources](sources-and-decisions.md).

## Phase 0 dependencies

Use Node **22.12 or later** and npm. Vite 8.3.6's published Node range includes `>=22.12.0`. Use package type `module`, strict TypeScript, and a committed npm lockfile. Development tooling must not be imported into the production browser bundle.

| Package | Pin / decision |
| --- | --- |
| `three` | `0.180.0`, the only game runtime dependency |
| `@types/three` | `0.180.0`, matching the runtime |
| `typescript` | `5.9.3`; intentional stable compiler choice, not a latest-version claim |
| `vite` | `8.3.6` |
| `tsx` | `4.23.15`, for Node tooling and focused TypeScript tests |
| `agent-browser` | `0.41.2` |
| `@modelcontextprotocol/server` | `2.4.0`, the v2 server SDK |
| `zod` | `4.6.7`, schema validation for the v2 SDK and dev telemetry |
| ESLint | `eslint@9.39.1`, `@eslint/js@9.39.1`, `typescript-eslint@8.46.4`; basic recommended rules |
| Node types | Exact compatible Node 22 type version resolved and recorded in Phase 0 |

Use `--save-exact` when adding these packages. The TypeScript compiler is intentionally below 6 because the selected typescript-eslint version declares a `<6.0.0` peer range. The newest TypeScript version is not needed to build this game. If a pinned package is genuinely unavailable or incompatible, record the command/error and make the smallest compatible tooling correction; preserve Three.js and gameplay unless a concrete defect requires a separately explained change.

Install the normal game/build dependencies in Phase 0. MCP-specific dependencies may be installed in Phase 5 to keep the first playable slice focused. Do not spend the game exercise building agent-browser from Rust source.

After the package exists, install the browser binary and inspect its commands:

```bash
npm install --save-dev --save-exact agent-browser@0.41.2
npx --no-install agent-browser install
npx --no-install agent-browser --version
npx --no-install agent-browser skills get core
```

On Linux/WSL with missing browser libraries, the upstream `install --with-deps` command handles OS prerequisites; use it only if needed and permitted in that environment. Keep the dev server, CLI, and MCP in the same environment. Do not split the server across Windows and WSL unless required by the actual setup.

## Package scripts to create

| Script | Required command/behaviour |
| --- | --- |
| `dev` | `vite --host 127.0.0.1 --port 5173 --strictPort` |
| `typecheck` | `tsc --noEmit -p tsconfig.app.json && tsc --noEmit -p tsconfig.tools.json` for separate strict browser and Node scopes |
| `lint` | `eslint src tools tests vite.config.ts` after those files exist; use minimal TS-aware flat config |
| `test` | `node --import tsx --test tests/*.test.ts` for a few meaningful behaviour tests |
| `build` | `npm run typecheck && vite build` |
| `preview` | `vite preview --host 127.0.0.1 --port 4173 --strictPort` |
| `mcp:game` | `tsx tools/game-test-mcp/server.ts`, introduced in Phase 5 |

Use `tsconfig.app.json` for `src/` and `tsconfig.tools.json` for `tools/`, `tests/`, and `vite.config.ts`; keep shared observation contracts importable without Node dependencies. Do not configure lint against absent directories during early phases; expand the targets as their files are introduced. Do not manufacture empty test suites or use `--passWithNoTests` to imply behavioural coverage. Document not-yet-applicable commands honestly, then require all final gates when the components exist. No dedicated test framework is required; use Node's built-in test runner with `tsx`.

## Browser operation

Start `npm run dev` in a managed background terminal, then use the same explicit session on every command:

```bash
npx --no-install agent-browser --session flight-school open 'http://127.0.0.1:5173/?debug=1&testSession=flight-school'
npx --no-install agent-browser --session flight-school set viewport 1440 810
npx --no-install agent-browser --session flight-school snapshot -i
```

Select the current Start button reference from that snapshot and click it using the documented CLI command. References can change after navigation; do not reuse stale ones. Load exact syntax when needed with:

```bash
npx --no-install agent-browser skills get core --ref commands
```

Sustained controls use `keydown` and `keyup`, for example `keydown w`, `keyup w`, `keydown Shift`, and `keyup Shift`; Escape is `press Escape`. Use a small bounded hold helper if repetition warrants it. It must track successfully pressed keys, release them in `finally`, and clean up after cancellation. A failed command must not skip key release. No synthetic game-state changes are permitted for acceptance.

Capture actual output to the ignored `artifacts/acceptance/` directory:

```bash
npx --no-install agent-browser --session flight-school screenshot artifacts/acceptance/01-level-flight.png
npx --no-install agent-browser --session flight-school console
npx --no-install agent-browser --session flight-school errors
```

Create that directory before writing. Open the PNG through the harness's image reader so the vision model sees it. Use fresh screenshots for visual decisions and compact DOM snapshots for controls. Keep one game tab; do not open a second browser for MCP reads. Close the session at the end of verification.

Use Chrome, not a DOM-only rendering substitute, for Three.js acceptance. Verify that the canvas is rendered and the WebGL context is live. If headless rendering produces a blank canvas, inspect errors and use the documented headed mode in a desktop-capable environment; do not award visual credit for a successful file write containing a blank image. Record software versus GPU rendering before interpreting performance numbers. This game uses WebGLRenderer; WebGPU-specific flags are not needed.

## OpenCode configuration and skills

Keep `.agents/skills/` and its existing registration. The root config auto-loads only `RULES.md` and `docs/agent-context.md`. Read all other docs and memory selectively. Project skills are:

- `flight-implementation`: the current phase and module/lifecycle rules.
- `flight-visual-acceptance`: vision comparison of the three real captures.
- `flight-smoke-check`: real input plus bounded state/event evidence.

Reuse `agent-memory` (display name `task-memory`), `testing-skill`, and the relevant Three.js guidance. The Three.js runtime pin and the accepted visuals take precedence over optional features in generic skills. The existing `opencode-playwright-setup` skill is retained but is not part of this workflow. Use the existing `game-readme`/`gameplay-gif` skills only after actual gameplay is available, and keep agent-browser as the normal browser owner.

The root config contains a disabled `mcp.servers.flight-school` entry. Do not enable it until Phase 5 creates `mcp:game`. Then remove its `disabled` field, run `opencode mcp list`, and call all three tools against the live tab. See [the complete MCP activation contract](game-testing-mcp.md).

For setup verification without model inference, OpenCode V2's `skill.list` API returns registered metadata and loaded bodies. Initial startup may precede discovery; check the same live server again before concluding a skill is missing. The planning PR's actual verification is recorded in [planning validation](planning-validation.md).

## Benchmark record

Before timing implementation, record model/version/quantization, context settings, OpenCode and agent-browser versions, Node/npm, browser, operating environment, and whether screenshots reach vision correctly. Keep those settings fixed between model comparisons. Separate first-playable time from the full expanded acceptance time; tool installation and custom observer work should be recorded rather than hidden inside a promised one-hour result.
