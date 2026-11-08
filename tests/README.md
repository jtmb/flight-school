# Verification

The planning baseline has no application tests to execute. Implement focused behavioural checks as game/tooling code is added, using the existing [testing policy](../.agents/skills/testing-skill/SKILL.md).

- [Smoke and acceptance record](smoke.md): real controls, screenshots, and fresh MCP evidence.
- [Benchmark scorecard](scorecard.md): consistent evaluation of the local coding model.
- [Planning validation](../docs/planning-validation.md): checks of the handoff itself, kept separate from game results.

Use Node's built-in test runner with tsx for a few TypeScript behaviour tests. Keep local captures under ignored `artifacts/acceptance/`; approved design PNGs live under `docs/reference-images/`. Do not confuse the two.
