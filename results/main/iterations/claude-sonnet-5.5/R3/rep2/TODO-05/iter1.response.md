```ts
import { test, expect } from '@playwright/test';

test('TODO-05 Позначення завдання виконаним', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByPlaceholder('What needs to be done?')).toBeVisible();

  // Step 1
  const input = page.getByPlaceholder('What needs to be done?');
  await input.fill('Купити молоко');
  await input.press('Enter');

  // Step 2
  const item = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  await expect(item).toBeVisible();
  await item.getByRole('checkbox').check();

  // Expected 1
  await expect(item).toHaveClass(/completed/);
  await expect(item.getByText('Купити молоко')).toHaveCSS('text-decoration-line', 'line-through');

  // Expected 2
  await expect(page.getByText('0 items left!')).toBeVisible();
});
```