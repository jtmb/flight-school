# Record a browser game

Use `scripts/capture-browser.cjs` when the game already runs in a browser and an existing Playwright environment is available. This is a short recording utility using the library API; it does not create tests or a test configuration.

Run from the game's repository so the helper can resolve its installed `playwright` or `@playwright/test` package. Alternatively pass `--playwright-module /absolute/path/to/playwright`; an existing `CODEX_PRIMARY_RUNTIME_NODE_MODULES` environment is also recognized. Use a Node.js version supported by the installed Playwright package, with its matching Chromium browser available. The helper installs nothing and does not edit package manifests or lockfiles. If these dependencies are unavailable, use an already available browser recording tool or ask for actual footage when that is the only remaining blocker.

## Choose the action sequence

Read the game's controls and inspect its UI first. Use a temporary JSON array to start the game, focus its play area, and demonstrate one representative interaction. The helper operates the real page through keyboard and mouse input; it never replaces game logic or draws fake gameplay.

Illustrative schema only—the selectors, keys, timings, and URL below are **not** the controls or setup instructions for the user's game:

```json
[
  { "type": "click", "selector": "button[aria-label='Play']" },
  { "type": "click", "selector": "canvas" },
  { "type": "keydown", "key": "ArrowRight" },
  { "type": "wait", "ms": 1500 },
  { "type": "keyup", "key": "ArrowRight" },
  { "type": "press", "key": "Space" },
  { "type": "wait", "ms": 4500 }
]
```

| Action | Fields | Behavior |
| --- | --- | --- |
| `wait` | `ms` | Wait 0–10,000 milliseconds while the game runs. |
| `click` | `selector` **or** `x`, `y`; optional `button` | Click one matching element, or a viewport coordinate. Selectors use Playwright locator syntax. |
| `keydown`, `keyup` | `key` | Hold or release one key. Use these around a wait for sustained movement. |
| `press` | `key` | Press and release a key or chord, such as `Space` or `Control+Enter`. |
| `mousemove` | `x`, `y` | Move the pointer within the viewport. |
| `mousedown`, `mouseup` | Optional `button` | Hold or release a mouse button. |

Mouse buttons are `left` (default), `right`, or `middle`. Coordinates are CSS pixels. Pair held inputs explicitly for a clear sequence; the helper releases any remaining held keys and buttons at the end. A selector click waits up to five seconds for an actionable element. The sequence is limited to 200 actions and 60 seconds of explicit waits, with a separate overall capture deadline. Aim for a much shorter, useful gameplay moment.

## Capture

Start the game using its verified development command. Store the adapted actions in a temporary location such as `.tmp/readme-media/actions.json`, then run from the project root:

```bash
node .opencode/skills/gameplay-gif/scripts/capture-browser.cjs --url http://localhost:5173 --actions .tmp/readme-media/actions.json --output .tmp/readme-media/gameplay.webm
```

Replace the URL with the address actually printed by the game. Quote paths containing spaces. The same command works in PowerShell when Node is available. Global installations should use the actual absolute path to the helper instead of the project-relative path shown above.

The default viewport and recorded video are both 1280 × 720; use `--width` and `--height` for the game's aspect ratio. `--headed` shows Chromium when a graphical display is available. `--timeout-ms` defaults to 60,000 and accepts 5,000–180,000; browser launch has a separate 30-second limit. `--overwrite` explicitly replaces an existing regular output file. A fresh browser context is used, without importing a signed-in browser profile.

The recording starts before navigation and includes loading. Inspect the actual video, choose the gameplay start time, and trim it with `scripts/make_gameplay_gif.py`. An ordinary successful capture prints JSON describing the output path, file size, viewport, action count, and planned wait time; the wait time is **not** the encoded video's duration.

## Judge the footage

Confirm that the game starts, input works, and the recorded frames show real interaction. If headless rendering produces a blank WebGL canvas, try an available headed browser or an existing screen recorder. Report the precise capture blocker if neither is available. Do not substitute the packaged model-reference artwork, use a loading screen as a gameplay demo, or change the game to imitate the reference.

Keep raw video and action plans temporary. Publish the optimized GIF and poster only after visual inspection. Use a few representative actions; do not build a replay framework or add a test suite for the recording task.

## Primary references

- [Playwright video recording](https://playwright.dev/docs/videos): match the viewport and video size; await context closure so the video is written.
- [Playwright video API](https://playwright.dev/docs/api/class-video#video-save-as): save the recording to the requested path after the page closes.
- [Playwright keyboard API](https://playwright.dev/docs/api/class-keyboard): use real keyboard input for press, hold, and release actions.

The helper needs a working browser runtime. Its syntax and input checks can be validated without one; that does not establish that gameplay recording works on a particular game or machine.
