import { test, expect } from '../../../../../support/fixtures';
test('TODO-07 Видалення завдання', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');

  const todoItem = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  const footer = page.locator('.footer');
  await expect(todoItem).toBeVisible();
  await expect(footer).toBeVisible();

  // Step 2
  await todoItem.hover();
  await todoItem.getByRole('button').click();

  // Expected 1
  await expect(todoItem).toHaveCount(0);
  await expect(page.getByText('Купити молоко')).toHaveCount(0);

  // Expected 2
  await expect(footer).toBeHidden();
});
