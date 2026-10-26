```ts
import { test, expect } from '@playwright/test';

test('JS-09 Перехід на сторінку «About Us» через бічне меню', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user is not logged in: a fresh browser context has no session.

  // Step 1
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Open Sidenav' })).toBeVisible();

  // Step 2
  await page.getByRole('button', { name: 'Open Sidenav' }).click();
  await expect(page.getByRole('navigation')).toBeVisible();

  // Step 3
  // The sidenav entry is a link whose accessible name is "Go to about us page" (visible text "About Us")
  const aboutLink = page.getByRole('link', { name: /about us/i });
  await expect(aboutLink).toBeVisible();
  await aboutLink.click();

  // Expected 1
  await expect(page).toHaveURL(/#\/about/);
  await expect(
    page.locator('mat-sidenav-content').getByText('About Us', { exact: true }).first()
  ).toBeVisible();

  // Expected 2
  await expect(page.getByText('Corporate History & Policy', { exact: true })).toBeVisible();
});
```