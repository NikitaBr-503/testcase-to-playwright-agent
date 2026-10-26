```ts
import { test, expect } from '@playwright/test';

test('TODO-17 Видалення виконаного завдання у фільтрі «Completed»', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();
  const todoList = page.getByRole('main').getByRole('listitem');
  await expect(todoList).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');
  await expect(todoList.filter({ hasText: 'Купити молоко' })).toBeVisible();

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');
  await expect(todoList.filter({ hasText: 'Написати статтю' })).toBeVisible();

  // Step 3
  await newTodoInput.fill('Подзвонити керівнику');
  await newTodoInput.press('Enter');
  await expect(todoList.filter({ hasText: 'Подзвонити керівнику' })).toBeVisible();
  await expect(todoList).toHaveCount(3);

  // Step 4
  const milkTodo = todoList.filter({ hasText: 'Купити молоко' });
  await milkTodo.getByRole('checkbox').check();
  await expect(milkTodo.getByRole('checkbox')).toBeChecked();

  // Step 5
  const articleTodo = todoList.filter({ hasText: 'Написати статтю' });
  await articleTodo.getByRole('checkbox').check();
  await expect(articleTodo.getByRole('checkbox')).toBeChecked();

  // Step 6
  await page.getByRole('link', { name: 'Completed' }).click();
  await expect(page).toHaveURL(/#\/completed$/);
  await expect(todoList).toHaveCount(2);
  await expect(todoList.filter({ hasText: 'Купити молоко' })).toBeVisible();
  await expect(todoList.filter({ hasText: 'Написати статтю' })).toBeVisible();

  // Step 7
  const milkTodoInCompleted = todoList.filter({ hasText: 'Купити молоко' });
  await milkTodoInCompleted.hover();
  const deleteButton = milkTodoInCompleted.getByRole('button', { name: 'Delete todo' });
  await expect(deleteButton).toBeVisible();
  await deleteButton.click();

  // Expected 1
  await expect(todoList.filter({ hasText: 'Купити молоко' })).toHaveCount(0);
  await expect(todoList).toHaveCount(1);
  await expect(todoList.filter({ hasText: 'Написати статтю' })).toBeVisible();

  // Expected 2
  await expect(page.getByText('1 item left!')).toBeVisible();
});
```