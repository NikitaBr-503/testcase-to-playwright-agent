import { test, expect } from '../../../../../support/fixtures';
test('JS-15 Додавання двох різних товарів до кошика', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are already dismissed by the test environment.
  // User qa_user@example.com is registered; a fresh browser context has an empty basket.

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
  await expect(page.getByRole('button', { name: 'Show the shopping cart' })).toBeVisible();

  // Step 7
  await page
    .locator('mat-card', { hasText: 'Apple Juice (1000ml)' })
    .getByRole('button', { name: 'Add to Basket' })
    .click();

  // Step 8
  await page
    .locator('mat-card', { hasText: 'Banana Juice (1000ml)' })
    .getByRole('button', { name: 'Add to Basket' })
    .click();

  // Expected 1
  await expect(page.getByRole('button', { name: 'Show the shopping cart' })).toContainText('2');

  // Step 9
  await page.getByRole('button', { name: 'Show the shopping cart' }).click();

  // Expected 2
  const appleRow = page.getByRole('row').filter({ hasText: 'Apple Juice (1000ml)' });
  const bananaRow = page.getByRole('row').filter({ hasText: 'Banana Juice (1000ml)' });
  await expect(appleRow).toBeVisible();
  await expect(bananaRow).toBeVisible();
  await expect(appleRow.locator('.mat-column-quantity')).toContainText('1');
  await expect(bananaRow.locator('.mat-column-quantity')).toContainText('1');

  // Expected 3
  await expect(page.getByText('Total Price: 3.98¤')).toBeVisible();
});
