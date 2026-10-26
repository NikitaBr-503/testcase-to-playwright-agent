import { test, expect } from '../../../../../support/fixtures';
test('TODO-06 Зняття позначки виконання', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByRole('textbox', { name: 'New Todo Input' })).toBeVisible();

  // Step 1
  const input = page.getByPlaceholder('What needs to be done?');
  await input.fill('Купити молоко');
  await input.press('Enter');
  const item = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  await expect(item).toBeVisible();
  const checkbox = item.getByRole('checkbox');

  // Step 2
  await checkbox.check();
  await expect(checkbox).toBeChecked();

  // Step 3
  await checkbox.uncheck();

  // Expected 1
  await expect(checkbox).not.toBeChecked();

  // Expected 2
  await expect(page.getByText('1 item left!')).toBeVisible();
});
