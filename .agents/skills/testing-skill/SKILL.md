---
name: testing-skill
description: Apply the owner's risk-based testing policy when implementing, debugging, reviewing, delegating, or releasing changes. Reuse coverage, verify real behavior proportionately, avoid recursive test infrastructure, and stop when requirements and applicable checks are satisfied.
---

# Proportionate verification

## Objective

Complete the requested functionality with proportionate, meaningful verification.
Optimize for confidence in real behavior, maintainability, and finishing the task.
Test counts, coverage percentages, and the amount of testing infrastructure created
are not measures of success. Apply this policy to delegated work as well.

## 1. Every additional test must earn its place

Add a test when it protects an explicit requirement, reproduces a real defect, or
covers a concrete failure risk with meaningful consequences. It must add useful
coverage that existing tests do not already provide.

Before adding it, be able to answer: **What plausible defect would this catch,
what would break for a user or consuming system, and why would existing tests
miss it?** If the answer is not specific, skip it. Apply judgment directly; do not
create a separate justification document or approval process.

## 2. Reuse coverage and choose the simplest effective check

Inspect tests relevant to the change. Extend an existing test when appropriate.
Choose the least expensive level that reliably exposes the defect: focused logic
tests for logic, integration checks for component boundaries, and end-to-end
checks only for risks requiring the complete workflow.

Do not duplicate coverage across layers unless each detects a distinct failure.

## 3. Test behavior and contracts

Assert meaningful outputs, state changes, permissions, and externally visible
effects. Derive expectations from requirements or independently established
behavior, not by copying the implementation's algorithm.

Avoid source-text assertions and checks that merely confirm configured mock
returns. Do not test trivial wrappers, getters, or library internals without a
specific behavioral risk.

## 4. Select failure cases according to risk

Cover relevant boundaries, expected errors, and credible security, data-integrity
or side-effect failures. Rare failures can deserve checks when consequences are
serious. Use representative cases for equivalent inputs.

Do not enumerate every combination, invent unsupported operating conditions, or
expand into unrelated hardening merely because another edge case is conceivable.

## 5. Prevent recursive testing work

If a fixture, mock, assertion, or helper is wrong, repair or simplify it and rerun
the affected checks. A test defect does not automatically justify another suite
for the testing machinery.

Do not build validators for validators, frameworks for frameworks, or test layers
whose sole purpose is supporting layers just invented. Substantial independent
test-infrastructure logic may warrant focused checks only when it satisfies the
same value criteria; existence alone is not justification.

## 6. Keep verification proportional

A reversible, low-impact edit already covered adequately may need only an existing
check or focused inspection. New tests are not mandatory for every edit.

Run focused checks during development and complete applicable required project
checks. Repeat or broaden verification only because relevant code changed, a
check failed, a concrete uncertainty remains, or a required gate demands it.
Never rerun an unchanged passing suite merely for reassurance.

## 7. Fix genuine problems without indefinite scope growth

Distinguish a product defect from a broken test or unavailable environment. Fix
the actual cause. Preserve useful regressions; do not weaken assertions, delete
valid tests, or conceal failures to get a passing result.

Keep optional improvements outside completion criteria. Agent-created checks,
documents, helpers, and reviewer suggestions do not automatically become new
requirements.

## 8. Use a firm stopping condition

When requested behavior is implemented, relevant verification and required checks
pass, and no known material in-scope defect remains, stop adding tests and deliver.

Continue checking only to resolve a specific remaining requirement, defect, or
risk. “More confidence,” “extra robustness,” and “one more edge case” are not
sufficient explanations.

Finish with a concise account of what works, what actually ran, and remaining
limitations or blockers—not growing test totals as a substitute for completion.

## Delegation and this workspace

- Give workers bounded functionality, exclusive files and this policy; do not
  assign test-count or coverage targets. Propagate scope corrections to them.
- Retain completed verification evidence across restarts. Rerun only for a
  relevant change, failure, concrete uncertainty or required release gate.
- Complete code and automated checks before human-required acceptance, as the
  owner requested. Do not confuse missing implementation with a human-test hold.
- Preserve existing safety/authorization rules, secrets, pairing and unrelated
  work. This policy does not authorize live devices, microphones, GPUs, gateway
  login, destructive reset or broader deployment.
