---
version: 1
id: product-contract
title: Flight-school MVP scope
tags: [game, scope, cockpit, combat]
kind: decision
updated: 2026-11-08
verified: 2026-11-08
sources:
  - ../game-design.md
  - ../visual-target.md
  - ../decisions/repository-integration.md
---

# Product contract

The game is named **gpt-flight-school**. The accepted direction is a low-poly canyon flying game viewed from a vintage open biplane cockpit: red struts, wooden panel, round gauges, curved windscreen, and two visible guns.

The [game design](../game-design.md) and [combat specification](../combat.md) define the full rules. The timed ring course is the completion objective. Ground tanks and moving flying blips provide optional combat score with basic return fire and player hull damage; the canonical design owns their counts and tuning.

The owner replaced the original one-HTML requirement with a proper file structure. Repository conventions require strict TypeScript and Node tooling, so the chosen implementation is modular TypeScript with a small Vite build and a static production output. Preserve the pinned Three.js version unless a concrete incompatibility requires a separately explained change.

Decision date: 8 November 2026. This supersedes the generic navy cockpit, bullseye practice targets, and the earlier no-build single-page delivery constraint. Concept PNGs are acceptance references, never evidence of completed gameplay.
