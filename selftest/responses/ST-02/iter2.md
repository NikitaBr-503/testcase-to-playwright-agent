```ts
import { test, expect } from '@playwright/test';

test('ST-02 Додавання одного товару', async ({ page }) => {
  // Preconditions
  await page.goto('/');

  // Step 1
  await page.getByLabel('New item').fill('Milk');
  // Step 2
  await page.getByRole('button', { name: 'Add' }).click();

  // Expected 1
  await expect(page.getByRole('list', { name: 'Items' })).toContainText('Milk');
});
```
