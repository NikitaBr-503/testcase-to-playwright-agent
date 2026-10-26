The failure snapshot shows the menu item's accessible name is "Go to user profile", set by an aria-label. The email is only its text content, so the regex on the name found nothing. I now locate the item by its role and the name "Go to user profile", then check that it contains the email text. The rest of the test is unchanged.

```ts
import { test, expect } from '@playwright/test';

test('JS-02: Успішний вхід зареєстрованого користувача', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are already dismissed; the user is registered and not logged in.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByRole('textbox', { name: 'Text field for the login email' }).fill('qa_user@example.com');

  // Step 5
  await page.getByRole('textbox', { name: 'Text field for the login password' }).fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  // Expected 1
  await expect(page).not.toHaveURL(/\/login/);
  await expect(page.getByText('All Products')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Add to Basket' }).first()).toBeVisible();

  // Step 7
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Expected 2
  await expect(page.getByRole('menuitem', { name: 'Go to user profile' })).toContainText('qa_user@example.com');
  await expect(page.getByRole('menuitem', { name: 'Logout' })).toBeVisible();
});
```