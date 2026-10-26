```ts
import { test, expect } from '@playwright/test';

test('TODO-05 Позначення завдання виконаним', async ({ page }) => {
  // Preconditions
  // Список завдань порожній (застосунок не зберігає завдання між запусками)
  await page.goto('/');
  await expect(page.getByRole('textbox', { name: 'New Todo Input' })).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  const newTodoInput = page.getByRole('textbox', { name: 'New Todo Input' });
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');

  const todoItem = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  await expect(todoItem).toBeVisible();

  // Step 2
  await todoItem.getByRole('checkbox').click();

  // Expected 1
  await expect(todoItem.getByRole('checkbox')).toBeChecked();
  await expect(todoItem.getByText('Купити молоко')).toHaveCSS('text-decoration-line', 'line-through');

  // Expected 2
  await expect(page.getByText('0 items left!')).toBeVisible();
});
```