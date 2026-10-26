```ts
import { test, expect } from '@playwright/test';

test('TODO-02 Додавання трьох завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();

  // Scope to the todo list inside <main> so the filter links
  // (All / Active / Completed) are not counted as todo items.
  const todoList = page.getByRole('main').getByRole('list');
  const todoItems = todoList.getByRole('listitem');
  await expect(todoItems).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');

  // Step 3
  await newTodoInput.fill('Подзвонити керівнику');
  await newTodoInput.press('Enter');

  // Expected 1
  await expect(todoItems).toHaveCount(3);
  await expect(todoItems).toHaveText([
    'Купити молоко',
    'Написати статтю',
    'Подзвонити керівнику',
  ]);

  // Expected 2
  await expect(page.getByText('3 items left!')).toBeVisible();
});
```