import { test, expect } from '../../../../../support/fixtures';
test('TODO-06: Зняття позначки виконання', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByPlaceholder('What needs to be done?')).toBeVisible();

  // Step 1
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');
  const todoItem = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  await expect(todoItem).toBeVisible();

  // Step 2
  const checkbox = todoItem.getByRole('checkbox');
  await checkbox.check();
  await expect(checkbox).toBeChecked();

  // Step 3
  await checkbox.uncheck();

  // Expected 1
  await expect(checkbox).not.toBeChecked();

  // Expected 2
  await expect(page.getByText('1 item left!')).toBeVisible();
});
