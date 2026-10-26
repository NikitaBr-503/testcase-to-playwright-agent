```ts
import { test, expect } from '@playwright/test';

test('TODO-06 Зняття позначки виконання', async ({ page }) => {
  // Preconditions
  // Список завдань порожній (застосунок не зберігає завдання між запусками)
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  const todoItem = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });

  // Step 1
  const newTodoInput = page.getByRole('textbox', { name: 'New Todo Input' });
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');

  // Step 2
  await todoItem.getByRole('checkbox').click();
  await expect(todoItem.getByRole('checkbox')).toBeChecked();

  // Step 3
  await todoItem.getByRole('checkbox').click();

  // Expected 1
  await expect(todoItem.getByRole('checkbox')).not.toBeChecked();
  await expect(todoItem).not.toHaveClass(/completed/);

  // Expected 2
  await expect(page.getByText('1 item left!')).toBeVisible();
});
```