import { test, expect } from '../../../../../support/fixtures';
test('JS-16 Видалення товару з кошика', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are dismissed by the test environment.
  // The user qa_user@example.com is registered and the basket is empty.

  // Step 1
  await page.goto('/');

  const accountButton = page.getByRole('button', { name: /Show\/hide account menu|Account/ });
  const cartButton = page.getByRole('button', { name: /Show the shopping cart|Your Basket/ });

  // Step 2
  await accountButton.click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login', exact: true }).click();

  // Step 4
  await page.getByLabel('Email', { exact: true }).fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Password', { exact: true }).fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in', exact: true }).click();
  await expect(accountButton).toContainText('qa_user@example.com');

  // Step 7
  const appleJuiceCard = page.getByRole('article').filter({ hasText: 'Apple Juice (1000ml)' });
  await appleJuiceCard.getByRole('button', { name: 'Add to Basket', exact: true }).click();
  await expect(cartButton).toContainText('1');

  // Step 8
  await cartButton.click();

  // Step 9
  const appleJuiceRow = page.getByRole('row').filter({ hasText: 'Apple Juice (1000ml)' });
  await appleJuiceRow.getByRole('button').last().click();

  // Expected 1
  await expect(appleJuiceRow).toHaveCount(0);

  // Expected 2
  await expect(cartButton).toContainText('0');
  await expect(cartButton).not.toContainText(/[1-9]/);
});
