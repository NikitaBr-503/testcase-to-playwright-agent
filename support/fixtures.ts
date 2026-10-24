import { test as base, expect } from '@playwright/test';
import * as fs from 'fs';

/**
 * Every generated test imports `test` and `expect` from this file (the agent rewrites
 * the import automatically). When a test fails, an automatic fixture saves the data
 * the agent needs for self-correction: a screenshot and the accessibility snapshot
 * of the page at the moment of failure.
 */
export const test = base.extend<{ _failureContext: void }>({
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
