import { test, expect } from '../../../../../support/fixtures';
test('TODO-07: Видалення завдання', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');

  const todoItem = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  await expect(todoItem).toBeVisible();

  // Step 2
  await todoItem.hover();
  await todoItem.getByRole('button').click();

  // Expected 1
  await expect(page.getByRole('listitem')).toHaveCount(0);
  await expect(page.getByText('Купити молоко')).toBeHidden();

  // Expected 2
  await expect(page.locator('.footer')).toBeHidden();
  await expect(page.getByText(/items? left/)).toBeHidden();
  await expect(page.getByRole('link', { name: 'Active' })).toBeHidden();
});
