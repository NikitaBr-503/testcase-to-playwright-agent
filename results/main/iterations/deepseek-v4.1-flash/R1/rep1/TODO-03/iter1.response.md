```ts
import { test, expect } from '@playwright/test';

test('TODO-03 Порожнє завдання не додається', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const todoInput = page.getByPlaceholder('What needs to be done?');
  const todoItems = page.getByRole('listitem');
  const footer = page.getByRole('contentinfo');

  await expect(todoInput).toBeVisible();
  await expect(todoItems).toHaveCount(0);
  await expect(footer).toBeHidden();

  // Step 1
  await todoInput.fill('   ');
  await todoInput.press('Enter');

  // Expected 1
  await expect(todoItems).toHaveCount(0);
  await expect(page.getByRole('list')).toHaveCount(0);

  // Expected 2
  await expect(footer).toBeHidden();
  await expect(page.getByText('items left')).toBeHidden();
  await expect(page.getByRole('link', { name: 'Active' })).toBeHidden();
  await expect(page.getByRole('link', { name: 'Completed' })).toBeHidden();
});
```