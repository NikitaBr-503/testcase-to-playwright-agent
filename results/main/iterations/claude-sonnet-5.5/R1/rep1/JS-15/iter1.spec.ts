import { test, expect } from '../../../../../support/fixtures';
test('JS-15 Додавання двох різних товарів до кошика', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are dismissed by the test environment,
  // the user is registered, and a fresh browser context starts with an empty basket.
  const basketButton = page.getByRole('button', { name: /Your Basket/i });

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: /account/i }).click();

  // Step 3
  await page.getByRole('menuitem', { name: /login/i }).click();

  // Step 4
  await page.getByLabel(/email/i).fill('qa_user@example.com');

  // Step 5
  await page.locator('#password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: /^Log ?in$/i }).click();

  // Step 7
  await expect(basketButton).toBeVisible();
  await page
    .locator('mat-grid-tile')
    .filter({ hasText: 'Apple Juice (1000ml)' })
    .getByRole('button', { name: /Add to Basket/i })
    .click();

  // Step 8
  await page
    .locator('mat-grid-tile')
    .filter({ hasText: 'Banana Juice (1000ml)' })
    .getByRole('button', { name: /Add to Basket/i })
    .click();

  // Expected 1
  await expect(basketButton).toContainText('2');

  // Step 9
  await basketButton.click();

  // Expected 2
  const appleRow = page.getByRole('row').filter({ hasText: 'Apple Juice (1000ml)' });
  const bananaRow = page.getByRole('row').filter({ hasText: 'Banana Juice (1000ml)' });
  await expect(appleRow).toBeVisible();
  await expect(bananaRow).toBeVisible();
  await expect(appleRow.locator('.mat-column-quantity')).toHaveText(/^\s*1\s*$|\b1\b/);
  await expect(bananaRow.locator('.mat-column-quantity')).toHaveText(/^\s*1\s*$|\b1\b/);

  // Expected 3
  await expect(page.getByText('Total Price: 3.98¤')).toBeVisible();
});
