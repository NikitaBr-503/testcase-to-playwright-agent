import { test, expect } from '../../../../../support/fixtures';
test('TODO-03 Порожнє завдання не додається', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('   ');
  await newTodoInput.press('Enter');

  // Expected 1
  await expect(page.getByRole('listitem')).toHaveCount(0);
  await expect(page.locator('.todo-list li')).toHaveCount(0);

  // Expected 2
  await expect(page.getByText(/\d+ items? left/)).toBeHidden();
  await expect(page.getByRole('link', { name: 'All', exact: true })).toBeHidden();
  await expect(page.getByRole('link', { name: 'Active', exact: true })).toBeHidden();
  await expect(page.getByRole('link', { name: 'Completed', exact: true })).toBeHidden();
});
