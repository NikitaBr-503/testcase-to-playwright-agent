// Same as playwright.config.ts, plus a pause after every action (used by scripts/debug_fix.py --slow).
import base from '../playwright.config';
import { defineConfig } from '@playwright/test';

export default defineConfig({
  ...base,
  testDir: '../generated',
  outputDir: process.env.AGENT_OUTPUT_DIR ?? '../test-results',
  use: { ...base.use, launchOptions: { slowMo: Number(process.env.SLOWMO || '0') } },
});
