import { test, expect } from '../../../../../support/fixtures';
test('TODO-06: Зняття позначки виконання', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const todoText = 'Купити молоко';
  const todoItem = page.getByRole('listitem').filter({ hasText: todoText });
  const checkbox = todoItem.getByRole('checkbox');

  // Step 1
  await page.getByPlaceholder('What needs to be done?').fill(todoText);
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  await expect(todoItem).toBeVisible();

  // Step 2
  await checkbox.click();

  // Step 3
  await checkbox.click();

  // Expected 1
  await expect(checkbox).not.toBeChecked();

  // Expected 2
  await expect(page.getByText('1 item left!')).toBeVisible();
});
