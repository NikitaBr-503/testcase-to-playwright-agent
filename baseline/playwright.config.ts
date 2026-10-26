import { defineConfig, devices } from '@playwright/test';

/**
 * Reference implementation of the ten baseline test cases (article, 4.8, table 6).
 * Written with the Page Object pattern; test data is kept in data/*.json.
 * Run from the repository root (both applications must be running):
 *   npx playwright test -c baseline/playwright.config.ts
 */
const env = (name: string, fallback: string) => process.env[name] ?? fallback;

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 60_000,
  expect: { timeout: 5_000 },
  outputDir: '../test-results/baseline',
  reporter: [['list']],
  use: { actionTimeout: 10_000, navigationTimeout: 20_000, trace: 'retain-on-failure' },
  projects: [
    {
      name: 'juice-shop',
      testDir: './tests/juice-shop',
      use: { ...devices['Desktop Chrome'], baseURL: env('JUICE_SHOP_URL', 'http://localhost:3000') },
    },
    {
      name: 'todomvc',
      testDir: './tests/todomvc',
      use: { ...devices['Desktop Chrome'], baseURL: env('TODOMVC_URL', 'http://localhost:7002') },
    },
  ],
});
