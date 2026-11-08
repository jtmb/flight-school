# Practical capture routes

Use one route appropriate to the game. Resolve paths from the real project; commands in this document are examples, not claims about its setup or controls.

## Browser game

1. Start the repository's documented development command and wait for the actual ready URL.
2. Open the game, identify the canvas or game region, and learn the controls from code or in-game help.
3. Capture a meaningful interaction using available browser tools. If none provides recording, use the optional standalone Playwright helper described in [browser-capture.md](browser-capture.md).
4. Choose a viewport that preserves the game's layout. Set `recordVideo.size` to match the viewport; Playwright otherwise may scale the video to fit its default bounds.
5. Flush and inspect the recorded video before converting it. Headless WebGL support varies; if the capture is blank, use a working headed/browser capture environment or report the blocker.

Loading, navigating, and entering play may be included at the start of the raw video. Select the correct start time when encoding; do not publish the whole raw session merely because it was recorded.

## Native game

Use the actual platform's existing game-window recorder. OBS or built-in screen recording is adequate; no custom engine recorder is required. Crop unrelated desktop chrome if necessary, preserve the game aspect ratio, and capture at the real play speed. On Windows, a WSL-only process may not see the native game window; capture on the host and provide the resulting file to the encoder.

If no screen or graphics runtime is available, look for an existing authentic clip supplied by the project or user. A screenshot can be a truthful fallback. Do not build a fake simulation merely to produce motion.

## Existing real footage

Inspect the clip to confirm it belongs to the game and depicts the relevant version. Use a local copy. Select a short segment with an immediate visual hook and enough context to understand the interaction. Preserve original speed and essential HUD information. Use the encoder's start and duration flags to trim.

## Conversion prerequisites

- Python 3 for the portable encoder wrapper.
- FFmpeg and ffprobe on PATH.
- Only for the optional browser recorder: Node.js, the Playwright library, and its matching Chromium installation.

The encoder does not download anything, change the project configuration, or require a Python package installation. Browser capture is optional; any authentic local video can be converted.

## Sources

Verified against primary documentation on 2026-11-08:

- [Playwright video recording](https://playwright.dev/docs/videos): library recording, explicit dimensions, and closing the context to save video.
- [Playwright browser installation](https://playwright.dev/docs/browsers): browser binaries are separate from the library.
- [FFmpeg palette generation](https://ffmpeg.org/ffmpeg-filters.html#palettegen) and [palette application](https://ffmpeg.org/ffmpeg-filters.html#paletteuse): palette optimization, dithering, and changed-region processing.
- [OpenCode skills](https://opencode.ai/docs/skills/): project-local skills, supporting resources, and discovery. Keep the two skills as siblings; a skill directory is not recursively searched for nested skills.

These sources describe tool behavior. The suggested duration, frame rate, and byte target are adjustable editorial defaults for readable README media.
