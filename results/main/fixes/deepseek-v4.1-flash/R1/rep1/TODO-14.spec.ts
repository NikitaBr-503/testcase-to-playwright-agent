import { test, expect } from '../../../../../support/fixtures';
test('TODO-14 Позначення всіх завдань виконаними', async ({ page }) => {
  const todos = ['Купити молоко', 'Написати статтю', 'Подзвонити керівнику'];

  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();
  await expect(page.getByTestId('todo-item')).toHaveCount(0);

  // Step 1
  await newTodoInput.fill(todos[0]);
  await newTodoInput.press('Enter');

  // Step 2
  await newTodoInput.fill(todos[1]);
  await newTodoInput.press('Enter');

  // Step 3
  await newTodoInput.fill(todos[2]);
  await newTodoInput.press('Enter');

  const todoItems = page.getByTestId('todo-item');
  await expect(todoItems).toHaveCount(3);

  // Step 4
  await page.getByTestId('toggle-all').check();

  // Expected 1
  for (const todo of todos) {
    await expect(todoItems.filter({ hasText: todo }).getByRole('checkbox')).toBeChecked();
  }

  // Expected 2
  await expect(page.getByText('0 items left!')).toBeVisible();
});
