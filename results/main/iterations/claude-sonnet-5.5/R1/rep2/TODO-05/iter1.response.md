```ts
import { test, expect } from '@playwright/test';

test('TODO-05 Позначення завдання виконаним', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  const input = page.getByPlaceholder('What needs to be done?');
  await input.fill('Купити молоко');
  await input.press('Enter');
  const taskText = page.getByText('Купити молоко');
  await expect(taskText).toBeVisible();

  // Step 2
  const checkbox = page.getByRole('listitem').filter({ hasText: 'Купити молоко' }).getByRole('checkbox');
  await checkbox.check();

  // Expected 1
  await expect(checkbox).toBeChecked();
  await expect(taskText).toHaveCSS('text-decoration-line', 'line-through');

  // Expected 2
  await expect(page.getByText('0 items left!')).toBeVisible();
});
```