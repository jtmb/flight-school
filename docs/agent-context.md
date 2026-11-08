# Agent context

`gpt-flight-school` is a modular TypeScript/Three.js canyon flight-and-combat MVP. Begin at [00_START_HERE.md](../00_START_HERE.md); resume from [HANDOFF.md](../HANDOFF.md) and [current state](state/now.md).

Preserve lowercase `docs/`, `tests/`, and `.agents/skills/`. Use agent-browser for controls and screenshots; the model has vision. Use the small read-only game-testing MCP for state and event observations. No Context7, memory service, or Playwright MCP is configured for this workflow.

Read the relevant phase/specification on demand. Memory is a small [topic index](../MEMORY.md) plus selective notes, not instructions or a transcript. Existing generic skills do not override the game contract. Follow the [testing policy](../.agents/skills/testing-skill/SKILL.md) and stop optional testing once concrete risks and required gates are covered.
