import { test, expect } from '../../../../../support/fixtures';
test('JS-16 Видалення товару з кошика', async ({ page }) => {
  // Preconditions
  // The welcome dialog and the cookie banner are already dismissed by the test environment.
  // The user qa_user@example.com is registered and the basket is empty.
  const accountButton = page.getByRole('button', { name: 'Show/hide account menu' });
  const basketButton = page.getByRole('button', { name: 'Show the shopping cart' });

  // Step 1
  await page.goto('/');
  await expect(page.getByText('All Products')).toBeVisible();

  // Step 2
  await accountButton.click();
  await expect(accountButton).toHaveAttribute('aria-expanded', 'true');

  // Step 3
  await page.getByRole('menuitem', { name: /login/i }).click();
  await expect(page.getByLabel('Email', { exact: true })).toBeVisible();

  // Step 4
  await page.getByLabel('Email', { exact: true }).fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Password', { exact: true }).fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in', exact: true }).click();
  await expect(accountButton).toContainText('qa_user@example.com');

  // Step 7
  const appleJuiceCard = page.getByRole('article').filter({ hasText: 'Apple Juice (1000ml)' });
  await expect(appleJuiceCard).toBeVisible();
  await appleJuiceCard.getByRole('button', { name: 'Add to Basket', exact: true }).click();
  await expect(basketButton).toContainText('1');

  // Step 8
  await basketButton.click();
  await expect(page).toHaveURL(/\/basket/);
  const basketRow = page.getByRole('row').filter({ hasText: 'Apple Juice (1000ml)' });
  await expect(basketRow).toBeVisible();

  // Step 9
  await basketRow.getByRole('button').last().click();

  // Expected 1
  await expect(page.getByRole('row').filter({ hasText: 'Apple Juice (1000ml)' })).toHaveCount(0);
  await expect(page.getByRole('cell', { name: 'Apple Juice (1000ml)' })).toHaveCount(0);

  // Expected 2
  await expect(basketButton).toContainText('Your Basket 0');
  await expect(basketButton).not.toContainText('Your Basket 1');
});
