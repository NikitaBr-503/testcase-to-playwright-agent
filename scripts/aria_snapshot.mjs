// Prints the accessibility snapshot of a page (used as context in modes R2 and R3).
// Usage: node scripts/aria_snapshot.mjs <url>
import { chromium } from '@playwright/test';

const url = process.argv[2];
if (!url) {
  console.error('Usage: node scripts/aria_snapshot.mjs <url>');
  process.exit(2);
}
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await page.goto(url, { waitUntil: 'load', timeout: 30000 });
  await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
  process.stdout.write(await page.locator('body').ariaSnapshot());
} finally {
  await browser.close();
}
