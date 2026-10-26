```ts
import { test, expect } from '@playwright/test';

test('TODO-03 Порожнє завдання не додається', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByRole('textbox', { name: 'New Todo Input' });
  await expect(newTodoInput).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('   ');
  await newTodoInput.press('Enter');

  // Expected 1
  await expect(page.getByRole('listitem')).toHaveCount(0);
  await expect(page.getByRole('list')).toHaveCount(0);

  // Expected 2
  await expect(page.getByText(/\d+ items? left/)).toBeHidden();
  await expect(page.getByRole('link', { name: 'All' })).toBeHidden();
  await expect(page.getByRole('link', { name: 'Active' })).toBeHidden();
  await expect(page.getByRole('link', { name: 'Completed' })).toBeHidden();
  await expect(page.getByRole('button', { name: 'Clear completed' })).toBeHidden();
});
```