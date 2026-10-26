import { test, expect } from '../../../../../support/fixtures';
test('JS-05 Додавання товару до кошика', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // User qa_user@example.com is registered and the basket of the user is empty.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByLabel('Email').fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByRole('button', { name: 'Show/hide account menu' })).toBeVisible();
  await expect(page.getByRole('button', { name: /Your Basket/ })).toContainText('0');

  // Step 7
  const appleJuiceCard = page
    .locator('article')
    .filter({ hasText: 'Apple Juice (1000ml)' });
  await expect(appleJuiceCard).toBeVisible();
  await appleJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Expected 1
  await expect(page.getByText('Placed Apple Juice (1000ml) into basket.')).toBeVisible();
  await expect(page.getByRole('button', { name: /Your Basket/ })).toContainText('1');

  // Step 8
  await page.getByRole('button', { name: /Your Basket/ }).click();

  // Expected 2
  const basketRow = page.getByRole('row').filter({ hasText: 'Apple Juice (1000ml)' });
  await expect(basketRow).toBeVisible();
  await expect(basketRow).toContainText('Apple Juice (1000ml)');
  await expect(basketRow.getByText('1', { exact: true })).toBeVisible();
  await expect(basketRow).toContainText('1.99¤');

  // Expected 3
  const totalPriceSection = page
    .getByText('Total Price', { exact: true })
    .locator('xpath=ancestor::*[.//*[contains(text(),"¤")]][1]');
  await expect(page.getByText('Total Price', { exact: true })).toBeVisible();
  await expect(totalPriceSection).toContainText('1.99¤');
});
