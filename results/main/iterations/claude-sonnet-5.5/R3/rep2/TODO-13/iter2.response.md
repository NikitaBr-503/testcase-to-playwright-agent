```ts
import { test, expect } from '@playwright/test';

test('TODO-13: Очищення виконаних завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodo = page.getByPlaceholder('What needs to be done?');
  await expect(newTodo).toBeVisible();
  const todoItems = page.getByRole('main').getByRole('listitem');
  await expect(todoItems).toHaveCount(0);

  // Step 1
  await newTodo.fill('Купити молоко');
  await newTodo.press('Enter');

  // Step 2
  await newTodo.fill('Написати статтю');
  await newTodo.press('Enter');

  // Step 3
  await newTodo.fill('Подзвонити керівнику');
  await newTodo.press('Enter');
  await expect(todoItems).toHaveCount(3);

  // Step 4
  const milk = todoItems.filter({ hasText: 'Купити молоко' });
  await milk.getByRole('checkbox').check();

  // Step 5
  const call = todoItems.filter({ hasText: 'Подзвонити керівнику' });
  await call.getByRole('checkbox').check();

  // Step 6
  const clearCompleted = page.getByRole('button', { name: 'Clear completed' });
  await expect(clearCompleted).toBeVisible();
  await clearCompleted.click();

  // Expected 1
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems.filter({ hasText: 'Написати статтю' })).toBeVisible();
  await expect(page.getByText('Купити молоко')).toHaveCount(0);
  await expect(page.getByText('Подзвонити керівнику')).toHaveCount(0);

  // Expected 2
  await expect(page.getByRole('button', { name: 'Clear completed' })).toHaveCount(0);
});
```