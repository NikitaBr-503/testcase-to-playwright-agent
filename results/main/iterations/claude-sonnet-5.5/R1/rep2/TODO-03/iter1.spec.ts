import { test, expect } from '../../../../../support/fixtures';
test('TODO-03: Порожнє завдання не додається', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodo = page.getByPlaceholder('What needs to be done?');
  await expect(newTodo).toBeVisible();
  await expect(page.getByTestId('todo-item')).toHaveCount(0);

  // Step 1
  await newTodo.click();
  await newTodo.fill('   ');
  await newTodo.press('Enter');

  // Expected 1
  await expect(page.getByTestId('todo-item')).toHaveCount(0);
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Expected 2
  await expect(page.getByText(/\d+ items? left/)).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'All' })).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Active' })).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Completed' })).toHaveCount(0);
});
