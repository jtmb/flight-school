---
name: gameplay-gif
description: Record actual browser or native game footage and convert it into a compact, attractive looping GIF and poster for a README. Use when a game README needs gameplay media, an existing real clip needs trimming or optimization, or game-readme requests a fresh capture. Includes optional Playwright capture and an FFmpeg conversion helper; does not use fictional reference art as published gameplay.
---

# Gameplay GIF

Show a short, representative moment of real play. Deliver a readable GIF and a still poster that honestly represent the current game, without building a test suite.

## 1. Choose the source and moment

Inspect the game's launch instructions, actual controls, existing recordings, and media conventions. Reuse suitable existing footage when it reflects the current game. Otherwise launch the actual game and capture play. Prefer a local development instance when available.

Choose an understandable 5–8 second moment: movement, a recognizable objective or interaction, and a visible result. Start on gameplay, trim loading screens and idle menus, and avoid repeatedly dying before any action is clear. Keep useful HUD elements. Match the game's real aspect ratio and visual style.

The sibling README skill includes fictional examples under `references/model-only/`. Those files are for model guidance only. Never copy or transform them into published gameplay. Do not create simulated footage, move a still image around, splice unrelated game clips, or present AI-generated frames as a recording. If a user explicitly requests a separate concept animation, label it as a mockup and keep it separate from real gameplay documentation.

## 2. Capture with the available tool

Read `references/capture-workflows.md` for the relevant route:

- **Browser game:** use an available browser recorder or the optional `scripts/capture-browser.cjs` helper. Read `references/browser-capture.md` before using that helper. Derive actions from this game's controls. Use the standalone Playwright library; a capture does not require Playwright Test or a new test suite.
- **Native game:** record the actual game window using available OS recording tools, OBS, or an existing capture facility. Do not assume a platform-specific recorder exists.
- **Existing clip:** use the local video directly after inspecting its content and confirming its relationship to the current game.

Keep a clean view of the game: no unrelated windows, developer console, terminal output, private overlays, or accidental cursor obstruction. A browser recording should use matching viewport and recorded-video dimensions. Close the recording context and await the file flush before encoding.

Do not install a framework into the game or modify its lockfile just to record footage. Prefer already available tools; a separate temporary capture environment is reasonable when dependency installation is authorized. If WebGL or a native window is unavailable, report that specific capture blocker and use verified existing footage if possible. Never treat a black or frozen recording as successful capture.

## 3. Encode a small, clear loop

Use Python 3, FFmpeg, and ffprobe with the bundled helper. Resolve the script relative to this skill's directory; the following example assumes project-local installation and a real source video already captured:

```sh
python3 .opencode/skills/gameplay-gif/scripts/make_gameplay_gif.py \
  --input .tmp/readme-media/gameplay.webm \
  --output docs/media/gameplay.gif \
  --start 1 --duration 6 --width 960 --fps 12 --max-mb 8
```

Select `--start` and `--duration` from the actual clip; the values above are defaults to adapt. The helper creates `gameplay.gif` and `gameplay-poster.png`, uses a generated palette, preserves aspect ratio, avoids upscaling, and reports output metadata. It does not automatically rerun until a size target is met. Existing outputs require `--overwrite`; inspect them before replacing.

For pixel art, try `--pixel-art --dither none` and inspect the result. For other art, the default Bayer dithering is a reasonable starting point, not a universal rule. Start around 960 pixels wide and 12 fps; use more frames only when motion needs it. An 8 MiB size target is a project preference, not a GitHub platform limit. Keep a larger real clip available locally if it is useful, but do not commit temporary recordings by default.

If the GIF is too large, make a purposeful adjustment to duration, width, or fps and encode again. Usually one or two adjustments suffice. Do not degrade it indefinitely to meet a number; a clear shorter GIF or truthful static screenshot can serve the README better. Preserve smooth enough motion, readable important UI, and the original game speed. A natural jump cut is acceptable; do not reverse gameplay just to manufacture a seamless loop.

## 4. Inspect once and deliver

Watch one complete loop if playback is available; otherwise inspect the first, middle, and last frames and disclose that playback was not observed. Confirm visible real motion, an informative first frame, correct aspect ratio, no blank/loading frames, acceptable color, and no disruptive loop boundary. Verify dimensions, frame count or duration, infinite looping, and byte size using the helper's output and a media inspector as needed.

Make another capture or encode only for a specific visible defect, accuracy issue, or size problem. Do not create test fixtures, failure-case suites, CI pipelines, benchmark matrices, or an elaborate recorder abstraction for this task.

Return the GIF, poster, actual dimensions/duration/size, and a brief statement of the source and any limitation. Hand their relative paths to `game-readme` when applicable. If no authentic media is available, report the precise missing input instead of substituting reference art.
