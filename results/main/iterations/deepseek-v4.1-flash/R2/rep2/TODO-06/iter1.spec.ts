import { test, expect } from '../../../../../support/fixtures';
test('TODO-06 Зняття позначки виконання', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  const todoItem = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  const todoCheckbox = todoItem.getByRole('checkbox');

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');
  await expect(todoItem).toBeVisible();
  await expect(todoCheckbox).not.toBeChecked();

  // Step 2
  await todoCheckbox.click();
  await expect(todoCheckbox).toBeChecked();

  // Step 3
  await todoCheckbox.click();

  // Expected 1
  await expect(todoItem).toBeVisible();
  await expect(todoCheckbox).not.toBeChecked();

  // Expected 2
  await expect(page.getByText('1 item left!')).toBeVisible();
});
