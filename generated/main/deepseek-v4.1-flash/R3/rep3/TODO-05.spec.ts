import { test, expect } from '../../../../../support/fixtures';
test('TODO-05 Позначення завдання виконаним', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByRole('textbox', { name: 'New Todo Input' });
  await expect(newTodoInput).toBeVisible();
  // The application does not persist todos, so the list starts empty
  await expect(page.locator('.todo-list li')).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');

  const todoItem = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  await expect(todoItem).toBeVisible();

  // Step 2
  await todoItem.getByRole('checkbox').check();

  // Expected 1
  await expect(todoItem.getByRole('checkbox')).toBeChecked();
  const todoLabel = todoItem.locator('label');
  await expect(todoLabel).toHaveText('Купити молоко');
  await expect(todoLabel).toHaveCSS('text-decoration-line', 'line-through');

  // Expected 2
  // The items-left counter has no accessible role/name, so its stable TodoMVC class is used
  await expect(page.locator('.todo-count')).toHaveText('0 items left!');
});
