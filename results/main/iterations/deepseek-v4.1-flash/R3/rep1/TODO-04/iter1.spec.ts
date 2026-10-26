import { test, expect } from '../../../../../support/fixtures';
test('TODO-04 Обрізання пробілів на початку і в кінці завдання', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('   Купити хліб   ');
  await newTodoInput.press('Enter');

  // Expected 1
  const todoItem = page.getByRole('listitem').filter({ hasText: 'Купити хліб' });
  await expect(todoItem).toHaveCount(1);
  const todoLabel = todoItem.getByText('Купити хліб');
  await expect(todoLabel).toBeVisible();
  await expect(todoLabel).toHaveText('Купити хліб');
  expect(await todoLabel.textContent()).toBe('Купити хліб');

  // Expected 2
  await expect(newTodoInput).toHaveValue('');
});
