import { test, expect } from '../../../../../support/fixtures';
test('JS-02 Успішний вхід зареєстрованого користувача', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are already dismissed; the user is registered and not logged in.
  

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByLabel('Email').fill('qa_user@example.com');

  // Step 5
  await page.locator('input[type="password"]').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  // Expected 1
  await expect(page).not.toHaveURL(/\/login/);
  await expect(page.getByText('All Products')).toBeVisible();

  // Step 7
  await page.getByRole('button', { name: 'Account' }).click();

  // Expected 2
  await expect(page.getByRole('menu').getByText('qa_user@example.com')).toBeVisible();
  await expect(page.getByRole('menuitem', { name: 'Logout' })).toBeVisible();
});
