```ts
import { test, expect } from '@playwright/test';

test('JS-05 Додавання товару до кошика', async ({ page }) => {
  // Preconditions: welcome dialog and cookie banner are already dismissed (test environment),
  // user qa_user@example.com is registered and the basket is empty.
  const basketButton = page.getByRole('button', { name: /Show the shopping cart|Your Basket/ });

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

  // Step 7
  const appleJuiceCard = page.locator('article').filter({ hasText: 'Apple Juice (1000ml)' });
  await appleJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Expected 1
  await expect(page.getByText('Placed Apple Juice (1000ml) into basket.')).toBeVisible();
  await expect(basketButton).toContainText(/Your Basket\s*1/);

  // Step 8
  await basketButton.click();

  // Expected 2
  const basketRow = page.getByRole('row').filter({ hasText: 'Apple Juice (1000ml)' });
  await expect(basketRow).toBeVisible();
  await expect(basketRow).toContainText('Apple Juice (1000ml)');
  await expect(
    basketRow.getByRole('spinbutton').or(basketRow.getByText('1', { exact: true })).first()
  ).toBeVisible();

  // Expected 3
  await expect(page.getByText('Total Price')).toBeVisible();
  await expect(page.getByRole('row').last()).toContainText('1.99¤');
});
```