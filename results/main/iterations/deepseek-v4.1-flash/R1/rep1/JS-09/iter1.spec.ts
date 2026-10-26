import { test, expect } from '../../../../../support/fixtures';
test('JS-09: Перехід на сторінку «About Us» через бічне меню', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user is not logged in.

  // Step 1
  await page.goto('/');

  // Step 2
  const menuButton = page.getByRole('button', { name: '☰' });
  await expect(menuButton).toBeVisible();
  await menuButton.click();

  // Step 3
  await page.getByRole('menuitem', { name: 'About Us' }).click();

  // Expected 1
  const aboutHeading = page.getByRole('heading', { name: 'About Us', level: 1 });
  await expect(aboutHeading).toBeVisible();
  await expect(page).toHaveURL(/about/);

  // Expected 2
  await expect(page.getByText('Corporate History & Policy')).toBeVisible();
});
