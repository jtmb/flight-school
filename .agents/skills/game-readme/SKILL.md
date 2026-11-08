---
name: game-readme
description: Create or redesign a beautiful, concise game README with real gameplay media near the top and verified setup instructions directly underneath. Use for game repository READMEs, gameplay GIF headers, and requests for a clean visual introduction inspired by the OpenCode README. Includes model-only visual references and works with the companion gameplay-gif skill.
---

# Game README

Make the game understandable at a glance and playable with the fewest accurate steps. Let its actual artwork supply the visual identity. Favor a strong gameplay image, restrained typography, generous spacing, and short, useful copy.

## 1. Learn the project

Read the existing README, repository guidance, manifests, lockfiles, launch scripts, engine configuration, control bindings, and existing media. Determine the real game name, one-sentence premise, supported setup path, required versions, and available demo or download links. Use the project's own package manager and conventions.

Do not assume Node, npm, a particular engine, WASD controls, a license, or a published release. If a fact is not established by the repository or user, omit the claim or identify the specific missing fact in the handoff. Preserve useful existing instructions and credits.

## 2. Use the reference correctly

Read `references/layout-reference.md`. If image inspection is available, open `references/model-only/mock-gameplay-reference.png`; inspect the adjacent GIF only if motion guidance is helpful.

**Everything under `references/model-only/` is guidance for the model only.** The fictional CINDERWING art demonstrates framing, hierarchy, and motion. Never copy, embed, link, trace, or rename it into the project's README or public media. Never inherit its name, features, controls, or illustrative setup commands. Reference paths must not appear in the delivered README.

Transfer the presentation principles to the actual game; preserve the actual game's aesthetic.

## 3. Choose truthful gameplay media

Prefer a good existing capture that represents the current game. Otherwise load the sibling `gameplay-gif` skill using the installed agent's native skill mechanism. OpenCode should discover both skills independently. If native loading is unavailable, read `../gameplay-gif/SKILL.md` relative to this skill's directory.

Use a short, readable capture of real play, with action already visible in the first frame. A useful default destination is `docs/media/gameplay.gif`, with `docs/media/gameplay-poster.png` as its still companion. Follow existing repository paths when practical. Write alt text describing what the footage actually shows.

When the game cannot be captured, use a verified existing screenshot or video if one is suitable. Otherwise complete the text and report exactly what capture is missing. Omit the media element until a real asset exists; do not leave a broken image, invent gameplay, or substitute the model-only reference. Do not change game behavior merely to make a recording appear more impressive.

## 4. Build the README

Use `assets/README.template.md` as a structural starting point; replace every placeholder and remove unused sections. The default reading order is:

1. Game name or existing logo, followed by one concrete sentence about playing it.
2. One prominent gameplay GIF. Add a real Play or Download link only when available.
3. **Play locally**: necessary prerequisites, the shortest verified setup commands, and how to open or launch the game.
4. **Controls**: a compact table only when it helps someone start playing.
5. Optional build instructions in `<details>`, then existing license, credits, or contribution links where relevant.

Place setup directly below the introduction and media. Avoid inserting a feature catalog, roadmap, architecture essay, or table of contents before it. Keep the main reading path roughly 150–300 words when possible; necessary setup details take precedence over a word target.

For GitHub, use ordinary Markdown and simple supported HTML such as `<p align="center">`, `<img>`, `<picture>`, and `<details>`. Use the existing logo if suitable. A centered title and one strong visual are enough; avoid decorative badges, emoji headings everywhere, repeated screenshots, and invented statistics. Include a badge only when its destination and claim are real and useful. Do not rely on custom CSS, JavaScript, autoplay video, or GitHub rendering unsupported HTML.

Keep image paths relative to the README. Preserve aspect ratio; do not hardcode both width and height. Use a sensible display width, usually 800–960 pixels. A muted background within the real game capture is fine; do not recolor gameplay to match a template. Check that branding remains legible in light and dark themes when a preview is available.

## 5. Verify what matters, then finish

Confirm that the setup commands match the project and run the primary documented launch path when the environment permits. If launch was already verified during capture, reuse that evidence. Check local media/link targets, unresolved placeholders, readable alt text, and one rendered preview when available. Watch the GIF through one loop, or inspect representative frames and explicitly state that limitation.

Do not add a test framework, coverage goal, snapshot suite, README lint pipeline, or CI job for this documentation task. Repeat a check only to resolve a concrete problem or an existing required gate. Once the README is accurate, readable, and backed by working files, finish.

Return the updated README and any actual gameplay media, plus a short handoff stating the changes, what was checked, and any real blocker. Keep raw recordings and temporary capture actions out of the published deliverable unless requested. Do not publish, push, or alter unrelated application code without task authorization.
