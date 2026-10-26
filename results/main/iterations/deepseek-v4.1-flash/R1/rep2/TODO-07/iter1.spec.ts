import { test, expect } from '../../../../../support/fixtures';
test('TODO-07 Видалення завдання', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();
  await expect(page.getByTestId('todo-item')).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');

  // Step 2
  const todoItem = page.getByTestId('todo-item').filter({ hasText: 'Купити молоко' });
  await expect(todoItem).toBeVisible();
  await todoItem.hover();
  await todoItem.getByRole('button', { name: '×' }).click();

  // Expected 1
  await expect(page.getByText('Купити молоко')).toHaveCount(0);
  await expect(page.getByTestId('todo-item')).toHaveCount(0);

  // Expected 2
  await expect(page.getByTestId('footer')).toBeHidden();
  await expect(page.getByRole('button', { name: 'All' })).toBeHidden();
});
