```ts
import { test, expect } from '@playwright/test';

test('TODO-05: Позначення завдання виконаним', async ({ page }) => {
  // Preconditions
  await page.goto('/');

  // Step 1
  const input = page.getByPlaceholder('What needs to be done?');
  await input.fill('Купити молоко');
  await input.press('Enter');
  const todoText = page.getByText('Купити молоко', { exact: true });
  await expect(todoText).toBeVisible();

  // Step 2
  const checkbox = page.getByRole('checkbox').first();
  await checkbox.check();

  // Expected 1
  await expect(checkbox).toBeChecked();
  await expect(todoText).toHaveCSS('text-decoration-line', 'line-through');

  // Expected 2
  await expect(page.getByText('0 items left!')).toBeVisible();
});
```