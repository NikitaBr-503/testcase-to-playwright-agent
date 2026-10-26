import { test, expect } from '../../../../../support/fixtures';
test('JS-15 Додавання двох різних товарів до кошика', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // User qa_user@example.com is registered and the basket is empty.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Account' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByLabel('Email').fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();

  // Step 7
  const appleJuiceCard = page
    .locator('mat-card')
    .filter({ hasText: 'Apple Juice (1000ml)' });
  await appleJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Step 8
  const bananaJuiceCard = page
    .locator('mat-card')
    .filter({ hasText: 'Banana Juice (1000ml)' });
  await bananaJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Step 9
  const basketButton = page.getByRole('button', { name: /Your Basket/ });

  // Expected 1
  await expect(basketButton).toContainText('2');

  await basketButton.click();

  // Expected 2
  const appleJuiceRow = page
    .getByRole('row')
    .filter({ hasText: 'Apple Juice (1000ml)' });
  await expect(appleJuiceRow).toBeVisible();
  await expect(appleJuiceRow).toContainText('1');

  const bananaJuiceRow = page
    .getByRole('row')
    .filter({ hasText: 'Banana Juice (1000ml)' });
  await expect(bananaJuiceRow).toBeVisible();
  await expect(bananaJuiceRow).toContainText('1');

  // Expected 3
  await expect(page.getByText('Total Price: 3.98¤')).toBeVisible();
});
