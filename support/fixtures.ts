import { test as base, expect } from '@playwright/test';
import * as fs from 'fs';

/**
 * Every generated test imports `test` and `expect` from this file (the agent rewrites
 * the import automatically).
 *
 * 1. Test environment set-up: cookies listed in `init_cookies` of the application config
 *    (for example, an already dismissed welcome banner) are added before the test starts.
 * 2. When a test fails, an automatic fixture saves the data the agent needs for
 *    self-correction: a screenshot and the accessibility snapshot of the page.
 */
const initCookies: { name: string; value: string }[] = JSON.parse(process.env.AGENT_INIT_COOKIES || '[]');

export const test = base.extend<{ _failureContext: void }>({
  context: async ({ context, baseURL }, use) => {
    if (initCookies.length && baseURL) {
      await context.addCookies(initCookies.map((c) => ({ ...c, url: baseURL })));
    }
    await use(context);
  },
  _failureContext: [
    async ({ page }, use, testInfo) => {
      await use();
      if (testInfo.status === testInfo.expectedStatus) return;
      try {
        await page.screenshot({ path: testInfo.outputPath('failure.png'), fullPage: false, timeout: 5000 });
      } catch {
        /* page may be closed */
      }
      try {
        const snapshot = await page.locator('body').ariaSnapshot({ timeout: 5000 });
        fs.writeFileSync(testInfo.outputPath('aria-snapshot.yml'), snapshot, 'utf8');
      } catch {
        /* page may be closed */
      }
      try {
        fs.writeFileSync(testInfo.outputPath('url.txt'), page.url(), 'utf8');
      } catch {
        /* ignore */
      }
    },
    { auto: true },
  ],
});

export { expect };
