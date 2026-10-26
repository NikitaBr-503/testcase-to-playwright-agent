import { test, expect } from '../../../../../support/fixtures';
test('TODO-03: Порожнє завдання не додається', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const input = page.getByPlaceholder('What needs to be done?');
  await expect(input).toBeVisible();
  await expect(page.getByTestId('todo-item')).toHaveCount(0);

  // Step 1
  await input.fill('   ');
  await input.press('Enter');

  // Expected 1
  await expect(page.getByTestId('todo-item')).toHaveCount(0);
  await expect(page.getByRole('listitem').filter({ hasNot: page.locator('p, a') })).toHaveCount(0);

  // Expected 2
  // The footer may exist in the DOM but must not be displayed, so check visibility.
  await expect(page.getByText(/items? left/)).toBeHidden();
  await expect(page.getByRole('link', { name: 'All', exact: true })).toBeHidden();
  await expect(page.getByRole('link', { name: 'Active', exact: true })).toBeHidden();
  await expect(page.getByRole('link', { name: 'Completed', exact: true })).toBeHidden();
});
