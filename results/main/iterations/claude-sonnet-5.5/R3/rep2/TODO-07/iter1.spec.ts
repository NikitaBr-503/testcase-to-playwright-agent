import { test, expect } from '../../../../../support/fixtures';
test('TODO-07 Видалення завдання', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');

  // Step 2
  const todoItem = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  await todoItem.getByText('Купити молоко').hover();
  await todoItem.getByRole('button').click();

  // Expected 1
  await expect(page.getByText('Купити молоко')).toHaveCount(0);
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Expected 2
  await expect(page.getByText(/items? left/)).toBeHidden();
  await expect(page.getByRole('link', { name: 'All' })).toBeHidden();
  await expect(page.getByRole('link', { name: 'Active' })).toBeHidden();
  await expect(page.getByRole('link', { name: 'Completed' })).toBeHidden();
});
