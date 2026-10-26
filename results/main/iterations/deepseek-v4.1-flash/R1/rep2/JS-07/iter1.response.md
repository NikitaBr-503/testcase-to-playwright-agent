```ts
import { test, expect } from '@playwright/test';

test('JS-07: Перегляд картки товару', async ({ page }) => {
  // Preconditions
  // Вітальне вікно і банер про cookies уже закриті (налаштування тестового середовища)
  // Користувач не увійшов до системи — no login performed

  // Step 1
  await page.goto('/');

  // Step 2
  const productCard = page.locator('mat-card').filter({ hasText: 'Banana Juice (1000ml)' });
  await productCard.getByText('Banana Juice (1000ml)', { exact: true }).click();

  const dialog = page.getByRole('dialog');

  // Expected 1
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText('Banana Juice (1000ml)', { exact: true })).toBeVisible();

  // Expected 2
  await expect(dialog.getByText('1.99¤', { exact: true })).toBeVisible();
  await expect(dialog.getByText('Reviews', { exact: true })).toBeVisible();
});
```