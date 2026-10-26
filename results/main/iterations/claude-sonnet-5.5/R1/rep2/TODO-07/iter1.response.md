```ts
import { test, expect } from '@playwright/test';

test('TODO-07 Видалення завдання', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodo = page.getByPlaceholder('What needs to be done?');
  await expect(newTodo).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  await newTodo.fill('Купити молоко');
  await newTodo.press('Enter');
  const todoItem = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  await expect(todoItem).toBeVisible();

  // Step 2
  await todoItem.hover();
  await todoItem.getByRole('button', { name: /×|delete|remove|destroy/i }).click();

  // Expected 1
  await expect(page.getByText('Купити молоко')).toHaveCount(0);
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Expected 2
  await expect(page.locator('footer')).toBeHidden();
  await expect(page.getByText(/items? left/i)).toBeHidden();
  await expect(page.getByRole('link', { name: 'All' })).toBeHidden();
});
```