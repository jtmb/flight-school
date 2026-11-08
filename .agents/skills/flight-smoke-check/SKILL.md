---
name: flight-smoke-check
description: Verify gpt-flight-school with real agent-browser controls, vision screenshots, and read-only game MCP evidence. Use after a playable milestone or changes to combat, checkpoints, pause, retry, timing, or diagnostics; apply focused risk-based checks.
---

# Flight smoke check

1. Read the existing [testing policy](../testing-skill/SKILL.md), [smoke checklist](../../../tests/smoke.md), and [MCP contract](../../../docs/game-testing-mcp.md). Select checks relevant to the changed behaviour; run all required gates at final delivery.
2. Verify the dev server and one agent-browser `flight-school` session. Before Phase 5, exercise the available gameplay through real browser input/screenshots and leave observer checks NOT RUN; do not enable an unimplemented MCP. From Phase 5 onward, open the debug URL, call `flight_get_status`, bind its page `instanceId`, and inspect a fresh `flight_get_state`. A stale or ambiguous instance cannot pass acceptance.
3. Drive start, pitch, turns, boost, firing, pause, and retry through real UI/keyboard/mouse input. Use bounded holds and release keys in a `finally` cleanup. Never set hull, score, enemy health, position, or checkpoint progress to manufacture a pass.
4. Query small summaries by default and full state only for entity checks. Read bounded `flight_get_events` pages using the last cursor; note cursor gaps. Verify `runId` after retry and rebind `instanceId` after page reload.
5. Cover actual gameplay risks: ordered swept ring crossing; two tank hits and one 200-point award; one blip hit and one 100-point award; terrain occlusion; projectile damage once; pause freeze; complete retry; and a reachable course win.
6. Inspect console/runtime errors and actual screenshots. Use [visual acceptance](../flight-visual-acceptance/SKILL.md) for cockpit and combat appearance. A DOM snapshot cannot inspect the WebGL scene.
7. Run the implemented type-check, lint, focused tests, and production build. Check production launches without the debug object or telemetry API. Do not add test layers for existing helpers or the MCP SDK.
8. Record passed, failed, blocked, and not-run results separately, with commands, browser/model environment, instance/run IDs, and artifact paths. Update the current state and handoff.

Stop once the requested behaviour, relevant risks, and required gates are satisfied. Recheck only after a related change, a failure, or a concrete remaining uncertainty. Never replace missing gameplay evidence with fabricated JSON or concept art.
