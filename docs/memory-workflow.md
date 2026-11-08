# Markdown memory workflow

Follow the existing [agent-memory skill](../.agents/skills/agent-memory/SKILL.md). This plan uses its established layout rather than introducing a memory MCP, vector store, database, background consolidation agent, or new persistence service.

## Ownership

| Record | Purpose | Update when |
| --- | --- | --- |
| `MEMORY.md` | Short topic index with links | A durable topic is added or removed |
| `docs/memory/<topic>.md` | About 200 words of sourced facts, decisions, or validated lessons | The underlying fact changes or a reusable lesson is verified |
| `docs/state/now.md` | Current phase, files, checks, evidence, blockers, next action | A meaningful milestone or handoff |
| `HANDOFF.md` | Concise continuation entry pointing to current state | A milestone changes the restart instructions |
| Design and decision docs | Canonical product/architecture requirements | An authorized requirement or design decision changes |

Do not keep multiple independent copies of the same plan or progress tracker. Git supplies history. The note schema and scope rules are defined by the existing skill.

## Start and retrieve

1. Read repository instructions, the handoff, and current state.
2. Consult the small memory index only if a remembered decision or lesson is relevant.
3. Select at most three candidate notes and open one or two. Use `rg` for a narrow term if needed; do not concatenate the entire store.
4. Check source links and important claims against current code or documents. Current user instructions and observed source override historical notes.
5. Load the specific phase/specification and only the skills that help it.

Engineering budgets for this project: index roughly 100–200 words, topical notes roughly 200 words, ordinary memory retrieval below about 1,000 tokens. These are practical defaults, not measured optima. A necessary investigation can exceed them.

## Write and hand off

Record a reusable lesson only after an actual issue is understood: symptom, cause, validated fix, and evidence path or commit. Label uncertainty. Revise a topic in place; retain a short dated supersession line where needed. Do not store transcripts, speculation as verified fact, credentials, or unrelated private details.

Before compaction or switching sessions, update `docs/state/now.md` with the current branch/commit, completed phase, changed files, commands actually run and their outcomes, evidence paths, remaining defects, and the exact next action. Update `HANDOFF.md` if the continuation entry changes. Resume from that record; do not reimplement completed phases.

The current planning publication is authorized. Future memory publication still follows the existing skill's scope and authorization rules; project facts are not permission to publish personal notes.

## Research interpretation

The exact Google paper intended by the conversation was not identified, so this package does not attribute an optimal folder tree to an unspecified study. Google's [Open Knowledge Format](https://github.com/GoogleCloudPlatform/open-knowledge-format) is a compatible design reference for Git-versioned Markdown, metadata, links, and progressive disclosure; it is a format, not proof of one best layout. Google Research's [ReasoningBank](https://research.google/blog/reasoningbank-enabling-agents-to-learn-from-experience/) motivates retaining useful lessons from successful and unsuccessful work and retrieving relevant ones. It does not establish this repository's exact Markdown structure.

The chosen layout is therefore an engineering decision grounded first in the owner's existing convention. See [sources and decisions](sources-and-decisions.md) for the evidence boundaries.
