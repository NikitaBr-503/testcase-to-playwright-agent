import { test, expect } from '../../../../../support/fixtures';
test('JS-09: Перехід на сторінку «About Us» через бічне меню', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user is not logged in (guest session).

  // Step 1
  await page.goto('/');

  // Step 2
  const menuButton = page.getByRole('button', { name: /menu|sidenav|navigation|☰/i }).first();
  await expect(menuButton).toBeVisible();
  await menuButton.click();

  // Step 3
  const aboutUsItem = page
    .getByRole('menuitem', { name: 'About Us' })
    .or(page.getByRole('link', { name: 'About Us' }))
    .or(page.getByRole('button', { name: 'About Us' }))
    .first();
  await expect(aboutUsItem).toBeVisible();
  await aboutUsItem.click();

  // Expected 1
  await expect(page.getByRole('heading', { name: 'About Us' })).toBeVisible();

  // Expected 2
  await expect(page.getByText('Corporate History & Policy')).toBeVisible();
});
