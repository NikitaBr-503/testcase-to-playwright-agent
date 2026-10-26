```ts
import { test, expect } from '@playwright/test';

test('TODO-03 Порожнє завдання не додається', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.locator('.todo-list li')).toHaveCount(0);

  // Step 1
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await newTodoInput.fill('   ');
  await newTodoInput.press('Enter');

  // Expected 1
  await expect(page.locator('.todo-list li')).toHaveCount(0);

  // Expected 2
  await expect(page.getByText(/\d+ items? left/)).toHaveCount(0);
  await expect(page.getByRole('link', { name: /^(All|Active|Completed)$/ })).toHaveCount(0);
});
```