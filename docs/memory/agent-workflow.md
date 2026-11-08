---
version: 1
id: agent-workflow
title: Agent tooling and memory choices
tags: [agents, tooling, memory, browser]
kind: decision
updated: 2026-11-08
verified: 2026-11-08
sources:
  - ../decisions/repository-integration.md
  - ../agent-setup.md
  - ../memory-workflow.md
---

# Agent workflow

The owner selected OpenCode V2 with a local vision-capable coding model, agent-browser for browser work, Markdown files for durable memory, and game-state observation through a small custom MCP. Context7 and Playwright MCP are excluded from this project workflow.

Preserve the repository's `.agents/skills/` discovery and lowercase `docs/` and `tests/`. The existing `agent-memory` folder exposes the display name `task-memory`; use the folder/runtime ID documented by the installed OpenCode version.

The [tooling guide](../agent-setup.md) and [memory workflow](../memory-workflow.md) are authoritative for implementation details. Read only relevant notes. Current progress belongs in `HANDOFF.md` and `docs/state/now.md`.

Decision date: 8 November 2026. This replaces the earlier optional Context7/Playwright setup. The owner explicitly authorized publishing this project planning package through a PR and merge; that does not grant blanket publication of future personal memories.
