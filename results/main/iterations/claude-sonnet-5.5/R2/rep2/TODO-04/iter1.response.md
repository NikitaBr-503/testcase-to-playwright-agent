```ts
import { test, expect } from '@playwright/test';

test('TODO-04: Обрізання пробілів на початку і в кінці завдання', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const input = page.getByPlaceholder('What needs to be done?');
  await expect(input).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  await input.fill('   Купити хліб   ');
  await input.press('Enter');

  // Expected 1
  const items = page.getByRole('listitem');
  await expect(items).toHaveCount(1);
  const title = items.getByText('Купити хліб');
  await expect(title).toBeVisible();
  // Regex is matched against the raw text, so leading/trailing spaces would fail it
  await expect(title).toHaveText(/^Купити хліб$/);

  // Expected 2
  await expect(input).toHaveValue('');
});
```