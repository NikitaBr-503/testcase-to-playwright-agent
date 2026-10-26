import { test, expect } from '../../../../../support/fixtures';
test('TODO-04 Обрізання пробілів на початку і в кінці завдання', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await newTodoInput.fill('   Купити хліб   ');
  await newTodoInput.press('Enter');

  // Expected 1
  await expect(page.getByText('Купити хліб', { exact: true })).toBeVisible();

  // Expected 2
  await expect(newTodoInput).toHaveValue('');
});
