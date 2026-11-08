#!/usr/bin/env node
'use strict';

// Record an existing browser game with the Playwright library, without a test runner.
const fs = require('node:fs');
const path = require('node:path');
const { createRequire } = require('node:module');

const HELP = `Capture actual browser gameplay to WebM.

Usage:
  node capture-browser.cjs --url http://localhost:5173 --actions actions.json --output gameplay.webm

Required:
  --url URL                  Running game's HTTP(S) URL
  --actions FILE             JSON array of actions; see references/browser-capture.md
  --output FILE.webm         Destination (existing files are preserved by default)

Options:
  --width N                  Viewport and video width (default: 1280)
  --height N                 Viewport and video height (default: 720)
  --timeout-ms N             Capture deadline, 5000–180000 ms (default: 60000)
  --playwright-module PATH   Existing Playwright package directory or entry file
  --headed                   Show the browser; requires a graphical display
  --overwrite                Replace an existing regular output file
  --help                     Show this help

Actions: wait, click (selector or x/y), keydown, keyup, press,
         mousemove, mousedown, mouseup. At most 200 actions and 60 seconds of waits.
The recording includes page loading; trim it when encoding the final GIF.
Uses an already installed Playwright and Chromium. Installs nothing.
`;

function fail(message) { throw new Error(message); }
function integer(value, label, min, max) {
  const number = Number(value);
  if (!Number.isInteger(number) || number < min || number > max) {
    fail(`${label} must be an integer from ${min} to ${max}.`);
  }
  return number;
}
function nonempty(value, label, max = 1024) {
  if (typeof value !== 'string' || !value.trim() || value.length > max) {
    fail(`${label} must be a nonempty string of at most ${max} characters.`);
  }
  return value;
}
function outputExists(file, overwrite) {
  let stat;
  try { stat = fs.lstatSync(file); }
  catch (error) { if (error.code === 'ENOENT') return; throw error; }
  if (!stat.isFile()) fail('Output must be a regular file, not a directory or symlink.');
  if (!overwrite) fail('Output already exists. Choose another path or pass --overwrite.');
}

function parseArguments(args) {
  const values = { width: '1280', height: '720', 'timeout-ms': '60000' };
  const valued = new Set(['url', 'actions', 'output', 'width', 'height', 'timeout-ms', 'playwright-module']);
  const flags = new Set(['headed', 'overwrite']);
  for (let index = 0; index < args.length; index++) {
    const key = args[index].replace(/^--/, '');
    if (!args[index].startsWith('--')) fail(`Unexpected argument: ${args[index]}`);
    if (flags.has(key)) values[key] = true;
    else if (valued.has(key)) {
      const value = args[++index];
      if (!value || value.startsWith('--')) fail(`--${key} needs a value.`);
      values[key] = value;
    } else fail(`Unknown option: --${key}`);
  }
  for (const key of ['url', 'actions', 'output']) nonempty(values[key], `--${key}`, 8192);
  let url;
  try { url = new URL(values.url); } catch { fail('--url must be a complete HTTP(S) URL.'); }
  if (!['http:', 'https:'].includes(url.protocol)) fail('--url must use HTTP or HTTPS.');
  if (url.username || url.password) fail('Use a URL without embedded credentials.');

  const options = {
    url: url.href,
    actionsPath: path.resolve(values.actions),
    output: path.resolve(values.output),
    width: integer(values.width, '--width', 64, 4096),
    height: integer(values.height, '--height', 64, 4096),
    timeoutMs: integer(values['timeout-ms'], '--timeout-ms', 5000, 180000),
    modulePath: values['playwright-module'],
    headed: Boolean(values.headed),
    overwrite: Boolean(values.overwrite),
  };
  if (options.width * options.height > 8294400) fail('Viewport must not exceed 8,294,400 pixels.');
  if (path.extname(options.output).toLowerCase() !== '.webm') fail('--output must end in .webm.');
  if (options.output === options.actionsPath) fail('Output and actions file must be different paths.');
  outputExists(options.output, options.overwrite);
  return options;
}

function readActions(options) {
  if (fs.statSync(options.actionsPath).size > 262144) fail('Actions file must be smaller than 256 KiB.');
  let actions;
  try { actions = JSON.parse(fs.readFileSync(options.actionsPath, 'utf8')); }
  catch (error) { fail(`Could not read actions JSON: ${error.message}`); }
  if (!Array.isArray(actions) || actions.length < 1 || actions.length > 200) {
    fail('Actions must be a JSON array containing 1–200 action objects.');
  }
  let waitMs = 0;
  const fields = {
    wait: ['ms'], click: ['selector', 'x', 'y', 'button'],
    keydown: ['key'], keyup: ['key'], press: ['key'],
    mousemove: ['x', 'y'], mousedown: ['button'], mouseup: ['button'],
  };
  actions.forEach((action, index) => {
    const label = `Action ${index + 1}`;
    if (!action || typeof action !== 'object' || Array.isArray(action) || !Object.hasOwn(fields, action.type)) {
      fail(`${label} has an unsupported type.`);
    }
    for (const key of Object.keys(action)) {
      if (key !== 'type' && !fields[action.type].includes(key)) fail(`${label}: unexpected field '${key}'.`);
    }
    if (action.type === 'wait') waitMs += integer(action.ms, `${label}.ms`, 0, 10000);
    if (['keydown', 'keyup', 'press'].includes(action.type)) nonempty(action.key, `${label}.key`, 80);
    if (['click', 'mousedown', 'mouseup'].includes(action.type)) {
      if (action.button !== undefined && !['left', 'right', 'middle'].includes(action.button)) {
        fail(`${label}.button must be left, right, or middle.`);
      }
    }
    if (action.type === 'click' && action.selector !== undefined) {
      nonempty(action.selector, `${label}.selector`);
      if (action.x !== undefined || action.y !== undefined) fail(`${label}: choose selector or x/y, not both.`);
    } else if (['click', 'mousemove'].includes(action.type)) {
      for (const [key, bound] of [['x', options.width], ['y', options.height]]) {
        if (typeof action[key] !== 'number' || !Number.isFinite(action[key]) || action[key] < 0 || action[key] >= bound) {
          fail(`${label}.${key} must be a number inside the viewport.`);
        }
      }
    }
  });
  if (waitMs > 60000 || waitMs >= options.timeoutMs) fail('Planned waits must fit the capture deadline and total at most 60 seconds.');
  return { actions, waitMs };
}

function loadPlaywright(modulePath) {
  const fromGame = createRequire(path.join(process.cwd(), '__gameplay_capture__.cjs'));
  const candidates = modulePath ? [path.resolve(modulePath)] : ['playwright', '@playwright/test'];
  if (!modulePath && process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES) {
    candidates.push(path.join(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES, 'playwright'));
  }
  for (const candidate of candidates) {
    try {
      const loaded = fromGame(candidate);
      if (typeof loaded.chromium?.launch === 'function') return loaded;
    } catch (error) {
      if (modulePath) fail(`Could not load --playwright-module: ${error.message}`);
      if (error.code !== 'MODULE_NOT_FOUND') fail(`Could not load ${candidate}: ${error.message}`);
    }
  }
  fail('Playwright was not found. Run from a project with playwright or @playwright/test, or pass --playwright-module to an existing package. No dependencies were installed.');
}

async function performActions(page, actions) {
  const keys = new Set();
  const buttons = new Set();
  for (const [index, action] of actions.entries()) {
    const button = action.button || 'left';
    try {
      switch (action.type) {
        case 'wait': await page.waitForTimeout(action.ms); break;
        case 'click':
          if (action.selector !== undefined) await page.locator(action.selector).click({ button });
          else await page.mouse.click(action.x, action.y, { button });
          break;
        case 'keydown': await page.keyboard.down(action.key); keys.add(action.key); break;
        case 'keyup': await page.keyboard.up(action.key); keys.delete(action.key); break;
        case 'press': await page.keyboard.press(action.key, { delay: 30 }); break;
        case 'mousemove': await page.mouse.move(action.x, action.y); break;
        case 'mousedown': await page.mouse.down({ button }); buttons.add(button); break;
        case 'mouseup': await page.mouse.up({ button }); buttons.delete(button); break;
      }
    } catch (error) { fail(`Action ${index + 1} (${action.type}) failed: ${error.message}`); }
  }
  for (const key of keys) await page.keyboard.up(key);
  for (const button of buttons) await page.mouse.up({ button });
}

async function withDeadline(promise, milliseconds) {
  let timer;
  try {
    return await Promise.race([
      promise,
      new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error(`Capture exceeded ${milliseconds} ms. Shorten the action sequence or inspect the game's loading state.`)), milliseconds);
      }),
    ]);
  } finally { clearTimeout(timer); }
}

async function capture(options, plan, playwright) {
  fs.mkdirSync(path.dirname(options.output), { recursive: true });
  const temporary = fs.mkdtempSync(path.join(path.dirname(options.output), '.gameplay-capture-'));
  const staged = path.join(temporary, 'capture.webm');
  let browser;
  let context;
  try {
    browser = await playwright.chromium.launch({ headless: !options.headed, timeout: 30000 });
    await withDeadline((async () => {
      const size = { width: options.width, height: options.height };
      context = await browser.newContext({ viewport: size, deviceScaleFactor: 1, recordVideo: { dir: path.join(temporary, 'raw'), size } });
      const page = await context.newPage();
      page.setDefaultTimeout(5000);
      const video = page.video();
      if (!video) fail('Playwright did not create a video recording.');
      const response = await page.goto(options.url, { waitUntil: 'domcontentloaded', timeout: Math.min(20000, options.timeoutMs) });
      if (response && response.status() >= 400) fail(`The game URL returned HTTP ${response.status()}.`);
      await performActions(page, plan.actions);
      await context.close(); // Closing flushes the recording before saveAs.
      context = undefined;
      await video.saveAs(staged);
    })(), options.timeoutMs);
    if (fs.statSync(staged).size === 0) fail('The recording is empty.');
    outputExists(options.output, options.overwrite);
    if (options.overwrite) fs.renameSync(staged, options.output);
    else fs.copyFileSync(staged, options.output, fs.constants.COPYFILE_EXCL);
    return {
      output: options.output,
      bytes: fs.statSync(options.output).size,
      viewport: { width: options.width, height: options.height },
      actions: plan.actions.length,
      plannedWaitMs: plan.waitMs,
      includesPageLoading: true,
    };
  } finally {
    if (context) await context.close().catch(() => {});
    if (browser) await browser.close().catch(() => {});
    fs.rmSync(temporary, { recursive: true, force: true });
  }
}

async function main() {
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h')) { process.stdout.write(HELP); return; }
  const options = parseArguments(args);
  const plan = readActions(options); // Validate actions before importing or launching a browser.
  const playwright = loadPlaywright(options.modulePath);
  const result = await capture(options, plan, playwright);
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}

main().catch(error => { process.stderr.write(`Capture failed: ${error.message}\n`); process.exitCode = 1; });
