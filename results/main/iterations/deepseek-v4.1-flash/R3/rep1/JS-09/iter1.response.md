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

  // Step 3
  await page.getByRole('link', { name: 'About Us', exact: true }).click();

  // Expected 1
  await expect(page).toHaveURL(/\/about/);
  await expect(page.getByRole('heading', { name: 'About Us', exact: true })).toBeVisible();

  // Expected 2
  await expect(page.getByRole('heading', { name: 'Corporate History & Policy' })).toBeVisible();
});
```