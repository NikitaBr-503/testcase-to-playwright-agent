import { test, expect } from '../../../../../support/fixtures';
test('JS-02 Успішний вхід зареєстрованого користувача', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are already dismissed; the user is not logged in.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByLabel('Text field for the login email').fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Text field for the login password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  // Expected 1
  await expect(page).not.toHaveURL(/\/login/);
  await expect(page.getByText('All Products')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Add to Basket' }).first()).toBeVisible();

  // Step 7
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Expected 2
  await expect(page.getByRole('menuitem', { name: /qa_user@example\.com/ })).toBeVisible();
  await expect(page.getByRole('menuitem', { name: 'Logout' })).toBeVisible();
});
