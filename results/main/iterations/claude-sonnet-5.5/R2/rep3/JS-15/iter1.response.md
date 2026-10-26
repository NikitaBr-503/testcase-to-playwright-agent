```ts
import { test, expect } from '@playwright/test';

test('JS-15 Додавання двох різних товарів до кошика', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are dismissed by the test environment.
  // The registered user is qa_user@example.com; the basket is empty for a fresh browser session.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByLabel('Email').fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Password', { exact: true }).fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByRole('button', { name: 'Show the shopping cart' })).toBeVisible();

  // Step 7
  const appleCard = page.locator('mat-card', {
    has: page.getByText('Apple Juice (1000ml)', { exact: true }),
  });
  await appleCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Step 8
  const bananaCard = page.locator('mat-card', {
    has: page.getByText('Banana Juice (1000ml)', { exact: true }),
  });
  await bananaCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Expected 1
  const basketButton = page.getByRole('button', { name: 'Show the shopping cart' });
  await expect(basketButton).toContainText('2');

  // Step 9
  await basketButton.click();

  // Expected 2
  await expect(page).toHaveURL(/\/basket/);
  const appleRow = page.getByRole('row', { name: /Apple Juice \(1000ml\)/ });
  const bananaRow = page.getByRole('row', { name: /Banana Juice \(1000ml\)/ });
  await expect(appleRow).toBeVisible();
  await expect(bananaRow).toBeVisible();
  await expect(appleRow.locator('.mat-column-quantity')).toContainText('1');
  await expect(bananaRow.locator('.mat-column-quantity')).toContainText('1');

  // Expected 3
  await expect(page.getByText('Total Price: 3.98¤')).toBeVisible();
});
```