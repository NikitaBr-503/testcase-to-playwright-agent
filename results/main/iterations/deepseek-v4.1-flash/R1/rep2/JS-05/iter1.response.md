```ts
import { test, expect } from '@playwright/test';

test('JS-05 Додавання товару до кошика', async ({ page }) => {
  const productName = 'Apple Juice (1000ml)';
  const userEmail = 'qa_user@example.com';
  const userPassword = 'QaPassword123!';

  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user qa_user@example.com is registered and owns an empty basket (environment state).

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: /account/i }).click();

  // Step 3
  await page.getByRole('button', { name: 'Login' }).click();

  // Step 4
  await page.getByLabel('Email').fill(userEmail);

  // Step 5
  await page.getByLabel('Password').fill(userPassword);

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page).not.toHaveURL(/\/login/);

  // Step 7
  const productCard = page.locator('mat-card').filter({ hasText: productName });
  await productCard.getByRole('button', { name: 'Add to Basket' }).click();

  const basketButton = page.getByRole('button', { name: /shopping basket|your basket/i });

  // Expected 1
  await expect(page.getByText('Placed Apple Juice (1000ml) into basket.')).toBeVisible();
  await expect(basketButton).toContainText('1');

  // Step 8
  await basketButton.click();

  // Expected 2
  const basketRow = page.getByRole('row').filter({ hasText: productName });
  await expect(basketRow).toBeVisible();
  await expect(basketRow).toContainText(productName);
  await expect(basketRow).toContainText(/(?:^|\s)1(?![.\d])/);

  // Expected 3
  await expect(page.getByText(/Total Price:\s*1\.99\s*¤/)).toBeVisible();
});
```