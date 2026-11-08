# SKILL-INDEX

Index of the agent skills in `.agents/skills/`. Each skill is a directory containing a
`SKILL.md` with `name:` and `description:` frontmatter. This index is a human/agent
convenience and is kept in sync with the actual `SKILL.md` frontmatter.

## Registration (opencode)

All skills are loaded by OpenCode through the repo `opencode.json`:

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "skills": [".agents/skills"]
}
```

OpenCode auto-discovers `.agents/skills`, so every directory with a valid `SKILL.md`
below it is advertised as a skill. Config changes reload without a restart
(`/reload` to force).

## Runtime IDs and frontmatter names

There are **27 skills**. In this OpenCode runtime, the callable ID is path-derived
(the folder name), while `name:` supplies the display name. They can differ.
Use the first column when calling the skill; the second records its frontmatter.

| Folder / runtime ID | Frontmatter name | Category |
| --- | --- | --- |
| `taste-skill` | `design-taste-frontend` | Design / UI |
| `gpt-tasteskill` | `gpt-taste` | Design / UI |
| `redesign-skill` | `redesign-existing-projects` | Design / UI |
| `soft-skill` | `high-end-visual-design` | Design / UI |
| `minimalist-skill` | `minimalist-ui` | Design / UI |
| `brutalist-skill` | `industrial-brutalist-ui` | Design / UI |
| `stitch-skill` | `stitch-design-taste` | Design / UI |
| `image-to-code-skill` | `image-to-code` | Design / UI |
| `imagegen-frontend-web` | `imagegen-frontend-web` | Image generation |
| `imagegen-frontend-mobile` | `imagegen-frontend-mobile` | Image generation |
| `brandkit` | `brandkit` | Image generation |
| `threejs-scene-setup` | `threejs-scene-setup` | 3D / three.js |
| `threejs-gltf-loading` | `threejs-gltf-loading` | 3D / three.js |
| `threejs-materials-lighting` | `threejs-materials-lighting` | 3D / three.js |
| `output-skill` | `full-output-enforcement` | Quality / process |
| `testing-skill` | `testing-skill` | Quality / process |
| `artifact-delivery` | `artifact-delivery` | Quality / process |
| `agent-memory` | `task-memory` | Memory / learning |
| `self-learning` | `self-learning` | Memory / learning |
| `github-operations` | `github-operations` | Integrations |
| `opencode-playwright-setup` | `opencode-playwright-setup` | Integrations |
| `websearch` | `websearch` | Integrations |
| `game-readme` | `game-readme` | Games / README |
| `gameplay-gif` | `gameplay-gif` | Games / README |
| `flight-implementation` | `flight-implementation` | Flight-school |
| `flight-visual-acceptance` | `flight-visual-acceptance` | Flight-school |
| `flight-smoke-check` | `flight-smoke-check` | Flight-school |

## Categories

### Design / UI (implementation)
- **`design-taste-frontend`** (`taste-skill`) — default all-rounder: metric-based rules,
  strict component architecture, CSS hardware acceleration, balanced design.
- **`gpt-taste`** (`gpt-tasteskill`) — Awwwards-level design + GSAP motion; layout
  variance, AIDA structure, wide editorial typography, gapless bento grids.
- **`redesign-existing-projects`** (`redesign-skill`) — audits and upgrades existing
  sites/apps to premium quality without breaking functionality.
- **`high-end-visual-design`** (`soft-skill`) — expensive, soft-UI look: fonts, spacing,
  shadows, card structures, animations.
- **`minimalist-ui`** (`minimalist-skill`) — clean editorial interfaces, warm monochrome,
  flat bento grids, muted pastels, no gradients/heavy shadows.
- **`industrial-brutalist-ui`** (`brutalist-skill`) — Swiss print + military terminal
  aesthetics; rigid grids, extreme type-scale contrast, utilitarian color.
- **`stitch-design-taste`** (`stitch-skill`) — Google Stitch-compatible semantic design
  rules; strict typography, calibrated color, asymmetric layouts, micro-motion.
- **`image-to-code`** (`image-to-code-skill`) — image-first: generate/analyze design
  images, then implement matching code; prefers large, section-specific references.

### Image generation (references only — do not write code)
- **`imagegen-frontend-web`** — premium, conversion-aware website design reference images;
  one separate image per section.
- **`imagegen-frontend-mobile`** — premium, app-native mobile screen concepts and flows.
- **`brandkit`** (`brandkit`) — premium brand-kit boards: logo systems, identity decks,
  color palettes, typography, mockups.

### 3D / three.js
- **`threejs-scene-setup`** — stand up a scene: maps, renderer/camera/render loop,
  responsive resize, OrbitControls, WebGPURenderer opt-in.
- **`threejs-gltf-loading`** — load glTF/GLB models and play skinned animations
  (GLTFLoader, AnimationMixer, DRACO/KTX2).
- **`threejs-materials-lighting`** — choose materials, add lights/shadows, env-map IBL.

### Quality / process
- **`full-output-enforcement`** (`output-skill`) — no truncation, no placeholder comments;
  exhaustive, unabridged code output.
- **`testing-skill`** — risk-based testing: reuse coverage, verify real behavior
  proportionately, stop when requirements and applicable checks are satisfied.
- **`artifact-delivery`** — deliver previews over a local loopback HTTPS webserver with a
  self-signed cert and verified links; never public hosts/CDNs or raw filesystem paths.

### Memory / learning (standalone file workflows)
- **`agent-memory`** (display name `task-memory`) — deliberately save, recall, and
  forget source-linked Markdown notes through ordinary file operations; no memory
  service required. Repository scope is default; never auto-publish notes.
- **`self-learning`** — review available conversations and authorized local evidence,
  propose evidence-backed improvements, and apply only authorized changes; no
  dedicated session-analysis integration required.

### Integrations
- **`github-operations`** — inspect GitHub repositories, issues, PRs, checks, and
  releases; perform remote changes only within explicit authority.
- **`opencode-playwright-setup`** — inspect, reuse, or repair headless Playwright MCP
  configuration for OpenCode V2, including WSL/root environments.
- **`websearch`** — configure, verify, and troubleshoot available search providers
  and use exposed search/fetch capabilities for current research.

### Games / README
- **`game-readme`** — create or redesign a beautiful, concise game README with real
  gameplay media near the top and verified setup instructions directly underneath.
- **`gameplay-gif`** — record actual browser or native game footage and convert it
  into a compact, attractive looping GIF and poster for a README; never uses
  fictional reference art as published gameplay. Companion: **`game-readme`**.

### Flight-school

- **`flight-implementation`** — implement the accepted modular TypeScript game and its read-only observer.
- **`flight-visual-acceptance`** — review actual cockpit and combat screenshots with vision against the three approved concepts.
- **`flight-smoke-check`** — use real agent-browser controls and bounded MCP evidence for focused acceptance.

For this project, these workflows use agent-browser; the existing Playwright setup skill remains a reusable resource and is not the selected game workflow. Read only relevant skill bodies.

## Adding or removing a skill

1. Place it at `.agents/skills/<name>/SKILL.md` with `name:` + `description:` frontmatter.
2. OpenCode advertises it automatically (no config change needed).
3. Update this index and `.agents/skills/llms.txt` to match.
4. Verify it loads: confirm the skill ID is advertised and its `description` is present.
