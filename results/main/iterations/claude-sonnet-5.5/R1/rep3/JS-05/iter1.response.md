```ts
import { test, expect } from '@playwright/test';

test('JS-05 Додавання товару до кошика', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are dismissed by the test environment.
  // User qa_user@example.com is registered and the basket is empty.
  const email = 'qa_user@example.com';
  const password = 'QaPassword123!';
  const productName = 'Apple Juice (1000ml)';

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: /account/i }).click();

  // Step 3
  await page.getByRole('menuitem', { name: /login/i }).click();

  // Step 4
  await page.getByRole('textbox', { name: /email/i }).fill(email);

  // Step 5
  await page.locator('#password').fill(password);

  // Step 6
  await page.getByRole('button', { name: /^log\s?in$/i }).click();

  // Step 7
  const productCard = page.locator('mat-card').filter({ hasText: productName });
  await productCard.getByRole('button', { name: /add to basket/i }).click();

  // Expected 1
  await expect(page.getByText('Placed Apple Juice (1000ml) into basket.')).toBeVisible();
  const basketButton = page.getByRole('button', { name: /your basket/i });
  await expect(basketButton).toContainText('1');

  // Step 8
  await basketButton.click();

  // Expected 2
  await expect(page.getByRole('heading', { name: /your basket/i })).toBeVisible();
  const basketRow = page.getByRole('row').filter({ hasText: productName });
  await expect(basketRow).toBeVisible();
  await expect(basketRow).toContainText(/\b1\b/);

  // Expected 3
  await expect(page.getByText(/Total Price:\s*1\.99¤/)).toBeVisible();
});
```