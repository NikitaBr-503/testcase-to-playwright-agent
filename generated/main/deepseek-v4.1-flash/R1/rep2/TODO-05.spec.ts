import { test, expect } from '../../../../../support/fixtures';
test('TODO-05 Позначення завдання виконаним', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByPlaceholder('What needs to be done?')).toBeVisible();

  // Step 1
  const newTodo = page.getByPlaceholder('What needs to be done?');
  await newTodo.fill('Купити молоко');
  await newTodo.press('Enter');
  await expect(page.getByRole('listitem').filter({ hasText: 'Купити молоко' })).toBeVisible();

  // Step 2
  const todoItem = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  await todoItem.getByRole('checkbox').click();

  // Expected 1
  await expect(todoItem).toHaveClass(/completed/);
  await expect(todoItem.getByText('Купити молоко')).toHaveCSS('text-decoration-line', 'line-through');

  // Expected 2
  await expect(page.locator('.todo-count')).toHaveText('0 items left!');
});
