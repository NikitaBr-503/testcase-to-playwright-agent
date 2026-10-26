```ts
import { test, expect } from '@playwright/test';

test('TODO-07 Видалення завдання', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();
  await expect(newTodoInput).toHaveValue('');
  await expect(page.getByText(/items? left/)).toBeHidden();

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');

  // Step 2
  const todoItem = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  await expect(todoItem).toBeVisible();
  await todoItem.hover();
  await todoItem.getByRole('button').click();

  // Expected 1
  await expect(todoItem).toBeHidden();
  await expect(page.getByText('Купити молоко')).toBeHidden();

  // Expected 2
  await expect(page.getByText(/items? left/)).toBeHidden();
  await expect(page.getByRole('link', { name: 'All' })).toBeHidden();
  await expect(page.getByRole('link', { name: 'Active' })).toBeHidden();
  await expect(page.getByRole('link', { name: 'Completed' })).toBeHidden();
});
```