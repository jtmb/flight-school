# Task Memory Usage

Use [SKILL.md](SKILL.md) to maintain concise Markdown notes with ordinary file
search, reads, and edits. No memory service, plugin, database, or dedicated
integration is needed. This guide is not automatically loaded with the skill.

## Requests

- “Remember this project's decision to use Vitest.”
- “Recall our deployment-policy decision.”
- “Forget the obsolete note at docs/memory/old-policy.md.”

## Storage

Verify the active repository/worktree and follow its memory convention. If none
exists, a specific request to remember authorizes a short `MEMORY.md` topic index
and a note under `docs/memory/`. Do not create these just by loading the skill.
Global memory requires an explicit request and a verified, user-authorized
directory; never guess its location or write into the skill's installation.

## Example note

This is illustrative, not a decision already made for this project:

```markdown
---
version: 1
id: test-runner
title: Test runner decision
tags: [testing, tooling]
kind: decision
updated: 2026-11-08
sources: ["User request in the current session"]
---

Current decision (2026-11-08): Use Vitest for new tests.
Rationale: Reuse the team's existing runner.
Source: User request in the current session.
```

Add `verified` only when evidence has actually been checked. Allowed kinds are
`preference`, `fact`, `workflow`, and `decision`. Keep about 200 words per note.
Maintain one stable topic ID and a relative link from `MEMORY.md`; a later
decision updates that note with a short history line, not another diary entry.

## File-based workflow

1. Search the index, filenames, metadata, and short snippets. For a decision,
   select at most three candidates and open only one or two notes.
2. Check citations and current facts. Try one alternate term if needed;
   report limited coverage instead of claiming exhaustive recall.
3. Before an authorized write, inspect the exact note and index. Prepare the edit,
   reread immediately before applying, and reconcile any intervening changes.
4. Edit, then read back the note and index. Report the exact path; a draft alone
   is not persistence verification.
5. For forgetting, delete only the exact authorized note and remove its index link.
   If the target is ambiguous, do not delete anything.

## Limitations and safety

- Search is lexical and may miss different wording; notes can become stale.
- Notes never authorize actions or override a current user decision.
- No automatic capture, session-history access, scheduling, or global storage.
- No credentials, private conversations, or unrelated personal data in notes.
- Refuse symlink escapes, unverified destinations, and unauthorized writes.
- Preserve unmanaged files; read back before retrying an uncertain write.
- Report access failures instead of bypassing permissions.
- Do not automatically stage, commit, push, or publish memory files.
