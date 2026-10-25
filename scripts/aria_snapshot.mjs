// Prints the accessibility snapshot of a page (used as context in modes R2 and R3).
// Usage: node scripts/aria_snapshot.mjs <url> [button name to close] ...
//
// Modal dialogs hide the rest of the page from the accessibility tree. If button names are given
// (e.g. a welcome dialog and a cookie banner), the script prints the initial snapshot, clicks those
// buttons and prints a second snapshot of the page without the dialogs.
import { chromium } from '@playwright/test';

const [url, ...dismiss] = process.argv.slice(2);
if (!url) {
  console.error('Usage: node scripts/aria_snapshot.mjs <url> [button name to close] ...');
  process.exit(2);
}
const browser = await chromium.launch();
try {
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  // Same test environment set-up as support/fixtures.ts (e.g. dismissed start-up banners).
  const cookies = JSON.parse(process.env.AGENT_INIT_COOKIES || '[]');
  if (cookies.length) await context.addCookies(cookies.map((c) => ({ ...c, url })));
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'load', timeout: 30000 });
  await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
  const first = await page.locator('body').ariaSnapshot();
  if (!dismiss.length) {
    process.stdout.write(first);
  } else {
    const closed = [];
    for (const name of dismiss) {
      const button = page.getByRole('button', { name, exact: true });
      try {
        await button.first().click({ timeout: 5000 });
        closed.push(name);
      } catch {
        /* the dialog may not be shown */
      }
    }
    await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});
    await page.waitForTimeout(2000); // dialogs close with an animation; this is the snapshot tool, not a test
    const second = await page.locator('body').ariaSnapshot();
    process.stdout.write('# Start page as it opens:\n' + first + '\n\n');
    process.stdout.write(`# The same page after clicking ${closed.map((n) => `"${n}"`).join(', ') || 'nothing (no dialog found)'}:\n`);
    process.stdout.write(second);
  }
} finally {
  await browser.close();
}
