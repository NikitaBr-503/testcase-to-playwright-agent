import { test, expect } from '../../../../../support/fixtures';
test('TODO-07 Видалення завдання', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();
  const newTodoInput = page.getByRole('textbox', { name: 'New Todo Input' });
  await expect(newTodoInput).toBeVisible();
  await expect(newTodoInput).toHaveValue('');
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');

  const todoItem = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  await expect(todoItem).toBeVisible();

  // Step 2
  await todoItem.hover();
  const deleteButton = todoItem.getByRole('button', { name: 'Delete todo' });
  await expect(deleteButton).toBeVisible();
  await deleteButton.click();

  // Expected 1
  await expect(page.getByText('Купити молоко')).toHaveCount(0);
  await expect(page.getByRole('listitem').filter({ hasText: 'Купити молоко' })).toHaveCount(0);

  // Expected 2
  await expect(page.getByText(/item left/)).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'All' })).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Active' })).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Completed' })).toHaveCount(0);
});
