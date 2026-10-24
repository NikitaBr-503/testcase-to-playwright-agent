```ts
import { test, expect } from '@playwright/test';

test('ST-01 Додавання двох товарів до списку', async ({ page }) => {
  // Preconditions
  await page.goto('/');

  // Step 1
  await page.getByLabel('New item').fill('Milk');
  // Step 2
  await page.getByRole('button', { name: 'Add' }).click();
  // Step 3
  await page.getByLabel('New item').fill('Bread');
  // Step 4
  await page.getByRole('button', { name: 'Add' }).click();

  // Expected 1
  const items = page.getByRole('list', { name: 'Items' });
  await expect(items.getByRole('listitem')).toHaveText(['Milk', 'Bread']);
  // Expected 2
  await expect(page.getByRole('status')).toHaveText('2 items');
});
```
