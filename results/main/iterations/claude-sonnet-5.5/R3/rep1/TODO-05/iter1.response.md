```ts
import { test, expect } from '@playwright/test';

test('TODO-05 Позначення завдання виконаним', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const input = page.getByPlaceholder('What needs to be done?');
  await expect(input).toBeVisible();

  // Step 1
  await input.fill('Купити молоко');
  await input.press('Enter');
  const item = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  await expect(item).toBeVisible();

  // Step 2
  await item.getByRole('checkbox').check();

  // Expected 1
  await expect(item.getByRole('checkbox')).toBeChecked();
  await expect(item.getByText('Купити молоко')).toHaveCSS('text-decoration-line', 'line-through');

  // Expected 2
  await expect(page.getByText('0 items left!')).toBeVisible();
});
```