import { test, expect } from '../../../../../support/fixtures';
test('JS-15: Додавання двох різних товарів до кошика', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user qa_user@example.com is registered; a fresh browser context starts with an empty basket.

  // Step 1
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Show/hide account menu' })).toBeVisible();

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
  const appleCard = page.locator('mat-card', { hasText: 'Apple Juice (1000ml)' });
  await appleCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Step 8
  const bananaCard = page.locator('mat-card', { hasText: 'Banana Juice (1000ml)' });
  await bananaCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Step 9
  const basketButton = page.getByRole('button', { name: 'Show the shopping cart' });

  // Expected 1
  await expect(basketButton).toContainText('2');

  await basketButton.click();

  // Expected 2
  await expect(page).toHaveURL(/\/basket/);
  const appleRow = page.getByRole('row', { name: /Apple Juice \(1000ml\)/ });
  const bananaRow = page.getByRole('row', { name: /Banana Juice \(1000ml\)/ });
  await expect(appleRow).toBeVisible();
  await expect(bananaRow).toBeVisible();
  await expect(appleRow.getByRole('cell').nth(2)).toHaveText('1');
  await expect(bananaRow.getByRole('cell').nth(2)).toHaveText('1');

  // Expected 3
  await expect(page.getByText('Total Price: 3.98¤')).toBeVisible();
});
