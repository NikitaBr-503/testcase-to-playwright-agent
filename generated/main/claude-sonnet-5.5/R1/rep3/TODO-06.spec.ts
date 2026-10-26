import { test, expect } from '../../../../../support/fixtures';
test('TODO-06 Зняття позначки виконання', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByPlaceholder('What needs to be done?')).toBeVisible();
  await expect(page.getByRole('listitem').filter({ hasText: 'Купити молоко' })).toHaveCount(0);

  // Step 1
  const input = page.getByPlaceholder('What needs to be done?');
  await input.fill('Купити молоко');
  await input.press('Enter');
  const todoItem = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  await expect(todoItem).toBeVisible();
  const checkbox = todoItem.getByRole('checkbox');

  // Step 2
  await checkbox.click();

  // Step 3
  await checkbox.click();

  // Expected 1
  await expect(checkbox).not.toBeChecked();

  // Expected 2
  await expect(page.getByText('1 item left!')).toBeVisible();
});
