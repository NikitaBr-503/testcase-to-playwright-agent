```ts
import { test, expect } from '@playwright/test';

test('JS-15 Додавання двох різних товарів до кошика', async ({ page }) => {
  const basketButton = page.getByRole('button', { name: /Your Basket/ });

  // Preconditions
  // Вітальне вікно і банер про cookies уже закриті налаштуваннями тестового середовища.
  // Користувач qa_user@example.com зареєстрований (дані надані в контексті застосунку).

  // Step 1
  await page.goto('/');
  // Preconditions: кошик користувача порожній
  await expect(basketButton).toBeVisible();
  await expect(basketButton).toContainText(/Your Basket\s*0/);

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
  await expect(page.getByRole('button', { name: 'Log in' })).toBeHidden();

  // Step 7
  await page
    .locator('article')
    .filter({ hasText: 'Apple Juice (1000ml)' })
    .getByRole('button', { name: 'Add to Basket' })
    .click();

  // Step 8
  await page
    .locator('article')
    .filter({ hasText: 'Banana Juice (1000ml)' })
    .getByRole('button', { name: 'Add to Basket' })
    .click();

  // Expected 1
  await expect(basketButton).toContainText(/Your Basket\s*2/);

  // Step 9
  await basketButton.click();

  // Expected 2
  const appleRow = page.getByRole('row').filter({ hasText: 'Apple Juice (1000ml)' });
  const bananaRow = page.getByRole('row').filter({ hasText: 'Banana Juice (1000ml)' });
  await expect(appleRow).toBeVisible();
  await expect(bananaRow).toBeVisible();
  await expect(appleRow.getByRole('cell').nth(2)).toHaveText('1');
  await expect(bananaRow.getByRole('cell').nth(2)).toHaveText('1');

  // Expected 3
  await expect(page.getByText(/Total Price:\s*3\.98¤/)).toBeVisible();
});
```