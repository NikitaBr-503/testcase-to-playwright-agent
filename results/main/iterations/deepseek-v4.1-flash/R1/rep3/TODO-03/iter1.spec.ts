import { test, expect } from '../../../../../support/fixtures';
test('TODO-03 Порожнє завдання не додається', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();
  const todoItems = page.locator('.todo-list li');
  await expect(todoItems).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('   ');
  await newTodoInput.press('Enter');

  // Expected 1
  await expect(todoItems).toHaveCount(0);
  await expect(page.locator('.todo-list')).not.toBeVisible();

  // Expected 2
  await expect(page.getByRole('contentinfo')).not.toBeVisible();
  await expect(page.getByText(/items? left/)).not.toBeVisible();
  await expect(page.getByRole('link', { name: 'All' })).not.toBeVisible();
  await expect(page.getByRole('link', { name: 'Active' })).not.toBeVisible();
  await expect(page.getByRole('link', { name: 'Completed' })).not.toBeVisible();
});
