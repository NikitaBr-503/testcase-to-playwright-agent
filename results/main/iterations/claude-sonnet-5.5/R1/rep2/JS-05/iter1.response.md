```ts
import { test, expect } from '@playwright/test';

test('JS-05 Додавання товару до кошика', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are dismissed by the environment;
  // user qa_user@example.com is registered and the basket is empty.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: /Account/ }).click();

  // Step 3
  await page.getByRole('menuitem', { name: /Login/ }).click();

  // Step 4
  await page.getByLabel(/^Email/).fill('qa_user@example.com');

  // Step 5
  await page.getByLabel(/^Password/).fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in', exact: true }).click();

  // Step 7
  const productCard = page
    .locator('mat-card')
    .filter({ hasText: 'Apple Juice (1000ml)' })
    .first();
  await productCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Expected 1
  await expect(page.getByText('Placed Apple Juice (1000ml) into basket.')).toBeVisible();
  await expect(page.getByRole('button', { name: /Your Basket/ })).toContainText('1');

  // Step 8
  await page.getByRole('button', { name: /Your Basket/ }).click();

  // Expected 2
  await expect(page).toHaveURL(/\/basket/);
  const row = page.getByRole('row', { name: /Apple Juice \(1000ml\)/ });
  await expect(row).toBeVisible();
  await expect(row.locator('.mat-column-quantity')).toContainText('1');

  // Expected 3
  await expect(page.getByText(/Total Price:\s*1\.99¤/)).toBeVisible();
});
```