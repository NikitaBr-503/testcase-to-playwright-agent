import { test, expect } from '../../../../../support/fixtures';
test('TODO-03 Порожнє завдання не додається', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByPlaceholder('What needs to be done?')).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await newTodoInput.fill('   ');
  await newTodoInput.press('Enter');

  // Expected 1
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Expected 2
  await expect(page.locator('footer')).not.toBeVisible();
  await expect(page.getByText('items left')).not.toBeVisible();
  await expect(page.getByRole('link', { name: 'Active' })).not.toBeVisible();
  await expect(page.getByRole('link', { name: 'Completed' })).not.toBeVisible();
});
