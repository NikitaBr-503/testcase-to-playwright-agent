import { test, expect } from '../../../../../support/fixtures';
test('JS-15 Додавання двох різних товарів до кошика', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // User qa_user@example.com is registered and the user's basket is empty.
  const accountButton = page.getByRole('button', { name: /account/i });
  const basketButton = page.getByRole('button', { name: /your basket|shopping cart/i });

  // Step 1
  await page.goto('/');

  // Step 2
  await accountButton.click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByLabel('Email').fill('qa_user@example.com');

  // Step 5
  await page.getByRole('textbox', { name: 'Text field for the login password' }).fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  // The login form is gone only after a successful login (otherwise an error is shown).
  await expect(page.getByRole('textbox', { name: 'Text field for the login password' })).toBeHidden();

  // Step 7
  const appleJuiceCard = page.locator('mat-card').filter({ hasText: 'Apple Juice (1000ml)' });
  await appleJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Step 8
  const bananaJuiceCard = page.locator('mat-card').filter({ hasText: 'Banana Juice (1000ml)' });
  await bananaJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Step 9
  await basketButton.click();

  // Expected 1
  await expect(basketButton).toContainText('2');

  // Expected 2
  const appleJuiceRow = page.getByRole('row').filter({ hasText: 'Apple Juice (1000ml)' });
  const bananaJuiceRow = page.getByRole('row').filter({ hasText: 'Banana Juice (1000ml)' });

  await expect(appleJuiceRow).toHaveCount(1);
  await expect(bananaJuiceRow).toHaveCount(1);
  await expect(appleJuiceRow.getByRole('cell').nth(2)).toHaveText('1');
  await expect(bananaJuiceRow.getByRole('cell').nth(2)).toHaveText('1');

  // Expected 3
  await expect(page.getByText('Total Price: 3.98¤')).toBeVisible();
});
