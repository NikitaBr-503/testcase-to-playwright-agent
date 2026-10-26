import { test, expect } from '../../../../../support/fixtures';
test('TODO-14 Позначення всіх завдань виконаними', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();
  await expect(page.getByTestId('todo-item')).toHaveCount(0);

  const newTodoInput = page.getByPlaceholder('What needs to be done?');

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');

  // Step 3
  await newTodoInput.fill('Подзвонити керівнику');
  await newTodoInput.press('Enter');

  const todoItems = page.getByTestId('todo-item');
  await expect(todoItems).toHaveCount(3);
  await expect(todoItems.nth(0)).toContainText('Купити молоко');
  await expect(todoItems.nth(1)).toContainText('Написати статтю');
  await expect(todoItems.nth(2)).toContainText('Подзвонити керівнику');

  // Step 4
  // The "toggle all" control of TodoMVC is the arrow to the left of the input
  await page.locator('.toggle-all').click();

  // Expected 1
  await expect(page.locator('.todo-list li.completed')).toHaveCount(3);
  await expect(todoItems.nth(0)).toHaveClass(/completed/);
  await expect(todoItems.nth(1)).toHaveClass(/completed/);
  await expect(todoItems.nth(2)).toHaveClass(/completed/);

  // Expected 2
  await expect(page.getByText('0 items left!')).toBeVisible();
});
