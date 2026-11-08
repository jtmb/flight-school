---
name: opencode-playwright-setup
description: Reuse, inspect or repair the headless Playwright MCP setup for OpenCode V2, including WSL/root environments, without reformatting existing configuration.
---
# OpenCode Playwright setup

Read the existing installed `opencode-playwright-setup` end to end before changing
or rerunning it. The reviewed portable source is
[scripts/opencode-playwright-setup](scripts/opencode-playwright-setup).
The built-in OpenCode `opencode` skill lives at `/builtin`; it has no on-disk
package to copy. Load it with OpenCode's skill tool when available. Use only the
[V2 index](https://opencode.ai/v2/llms.txt) and
[V2 MCP docs](https://opencode.ai/v2/docs/mcp-servers).

First run `opencode mcp list` in the actual user's OpenCode shell/location. A
healthy connection reports `✓ playwright connected`; connection alone is not a
browser launch or game acceptance test. The reviewed script's `--check` validates
the expected pinned command and connection without downloads/config writes.
Reuse a healthy installation. Do not run setup, `--with-deps` or `--prune` just
to check it. Preserve other MCP servers and active sessions.

On WSL/Kali, use Linux Node/npx from the user's existing shell environment, not
Windows npx inherited through WSL PATH. Root Chromium needs `--no-sandbox`.
Always use `--headless --browser chromium`; the MCP default Chrome channel needs
a system Chrome that this setup does not have. Pin MCP (reviewed: 0.0.83), whose
bundled Playwright requires matching browser builds. Never switch to `@latest`
or guess a browser revision. If installation is actually needed, the script uses
`npx -y @playwright/mcp@<version> install-browser chrome-for-testing`.
Inspect that pinned command's dry-run before estimating downloads. Normal
Playwright GC knows shared package links; do not manually delete browser builds.

Run the repository script using Bash. Configuration resolves from the target
user's `$XDG_CONFIG_HOME` or `$HOME/.config`, using an existing `opencode.jsonc`
when there is no `opencode.json`. Cache resolution respects the platform and
`PLAYWRIGHT_BROWSERS_PATH`. Keep these assumptions portable; do not hardcode this
machine's root home, mounts, model drives or browser executable. The checkout's
AGENTS storage policy applies to generated checks; ordinary installed Kali state
keeps its authorized default paths. Do not create mounts or drives.

For repairs, edit the script and rerun it. Never parse and reserialize the whole
OpenCode config. The embedded editor validates JSON/JSONC, rejects ambiguous keys
and wrong MCP types, and splices only changed managed fields or an entry. Preserve
comments, escapes, key order, indentation, BOM and CRLF outside changed spans.
No-op runs must not write config or backup. Back up only an actual change;
invalid inputs remain untouched. Existing server environment/timeouts/disabled
settings remain intact. An explicitly disabled or disconnected server is not a
successful health check. `--uninstall` removes only the named entry, not browsers.

After changes, run `python -B scripts/checks/test_playwright_setup.py` from the
repository and Bash syntax validation, then the installed script's `--check` in
the real target shell. For application validation, discover the actual MCP tools,
use live browser actions and report observed outcomes against the plan; setup
health does not establish functional correctness or visual approval.
