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
  const label = items.first().getByText('Купити хліб');
  await expect(label).toBeVisible();
  const text = await label.textContent();
  expect(text).toBe('Купити хліб');

  // Expected 2
  await expect(input).toHaveValue('');
});
```