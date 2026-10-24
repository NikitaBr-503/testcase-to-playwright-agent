import { defineConfig, devices } from '@playwright/test';

// Values are passed by the agent through environment variables so that one config
// serves every application and mode. Run tests through `python -m agent`, not directly.
const env = (name: string, fallback: string) => process.env[name] ?? fallback;

export default defineConfig({
  testDir: './generated',
  testMatch: '**/*.spec.ts',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: Number(env('AGENT_TEST_TIMEOUT_MS', '60000')),
  expect: { timeout: Number(env('AGENT_EXPECT_TIMEOUT_MS', '5000')) },
  outputDir: env('AGENT_OUTPUT_DIR', './test-results'),
  use: {
    baseURL: env('AGENT_BASE_URL', 'http://localhost:3000'),
    actionTimeout: Number(env('AGENT_ACTION_TIMEOUT_MS', '10000')),
    navigationTimeout: Number(env('AGENT_ACTION_TIMEOUT_MS', '10000')) * 2,
    trace: 'off',
    screenshot: 'off',
    video: 'off',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
