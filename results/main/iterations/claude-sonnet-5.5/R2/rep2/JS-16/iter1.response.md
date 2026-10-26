```ts
import { test, expect } from '@playwright/test';

test('JS-16: Видалення товару з кошика', async ({ page }) => {
  // Preconditions
  // The user is registered and the basket is empty; the dialogs are already dismissed by the environment.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: /Login/ }).click();

  // Step 4
  await page.getByLabel('Text field for the login email').fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Text field for the password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Show the shopping cart' })).toBeVisible();

  // Step 7
  const productCard = page.locator('mat-card', { hasText: 'Apple Juice (1000ml)' });
  await productCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Step 8
  await page.getByRole('button', { name: 'Show the shopping cart' }).click();
  const row = page.getByRole('row', { name: /Apple Juice \(1000ml\)/ });
  await expect(row).toBeVisible();

  // Step 9
  await row.getByRole('button').click();

  // Expected 1
  await expect(page.getByRole('cell', { name: 'Apple Juice (1000ml)' })).toHaveCount(0);

  // Expected 2
  await expect(page.getByRole('button', { name: 'Show the shopping cart' })).toContainText('0');
});
```