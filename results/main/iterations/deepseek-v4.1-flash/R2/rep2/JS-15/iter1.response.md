```ts
import { test, expect } from '@playwright/test';

test('JS-15 Додавання двох різних товарів до кошика', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // User qa_user@example.com is registered.

  // Step 1
  await page.goto('/');

  // Preconditions
  // The user's basket is empty.
  const basketButton = page.getByRole('button', { name: /Your Basket/ });
  await expect(basketButton).toContainText('0');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByLabel('Email').fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();

  // Step 7
  await page
    .locator('article')
    .filter({ hasText: 'Apple Juice (1000ml)' })
    .getByRole('button', { name: 'Add to Basket' })
    .click();

  // Step 8
  await page
    .locator('article')
    .filter({ hasText: 'Banana Juice (1000ml)' })
    .getByRole('button', { name: 'Add to Basket' })
    .click();

  // Expected 1
  await expect(basketButton).toContainText('2');

  // Step 9
  await basketButton.click();

  // Expected 2
  const appleJuiceRow = page.getByRole('row').filter({ hasText: 'Apple Juice (1000ml)' });
  const bananaJuiceRow = page.getByRole('row').filter({ hasText: 'Banana Juice (1000ml)' });

  await expect(appleJuiceRow).toBeVisible();
  await expect(bananaJuiceRow).toBeVisible();
  await expect(appleJuiceRow.getByRole('spinbutton')).toHaveValue('1');
  await expect(bananaJuiceRow.getByRole('spinbutton')).toHaveValue('1');

  // Expected 3
  await expect(page.getByText(/Total Price:\s*3\.98¤/)).toBeVisible();
});
```