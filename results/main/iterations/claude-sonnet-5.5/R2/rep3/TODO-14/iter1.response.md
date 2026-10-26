```ts
import { test, expect } from '@playwright/test';

test('TODO-14 Позначення всіх завдань виконаними', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodo = page.getByPlaceholder('What needs to be done?');
  await expect(newTodo).toBeVisible();

  const todos = ['Купити молоко', 'Написати статтю', 'Подзвонити керівнику'];

  // Step 1
  await newTodo.fill(todos[0]);
  await newTodo.press('Enter');
  await expect(page.getByRole('listitem').filter({ hasText: todos[0] })).toBeVisible();

  // Step 2
  await newTodo.fill(todos[1]);
  await newTodo.press('Enter');
  await expect(page.getByRole('listitem').filter({ hasText: todos[1] })).toBeVisible();

  // Step 3
  await newTodo.fill(todos[2]);
  await newTodo.press('Enter');
  await expect(page.getByRole('listitem').filter({ hasText: todos[2] })).toBeVisible();

  // Step 4
  await page.getByLabel('Mark all as complete').check();

  // Expected 1
  for (const todo of todos) {
    await expect(
      page.getByRole('listitem').filter({ hasText: todo }).getByRole('checkbox')
    ).toBeChecked();
  }

  // Expected 2
  await expect(page.getByText('0 items left!')).toBeVisible();
});
```