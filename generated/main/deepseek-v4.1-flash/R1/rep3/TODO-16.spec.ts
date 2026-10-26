import { test, expect } from '../../../../../support/fixtures';
test('TODO-16 Кнопка очищення відсутня без виконаних завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByPlaceholder('What needs to be done?')).toBeVisible();

  // Step 1
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');
  await expect(page.getByText('Купити молоко')).toBeVisible();

  // Expected 1
  await expect(page.getByRole('button', { name: 'Clear completed' })).toBeHidden();

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');
  await expect(page.getByText('Написати статтю')).toBeVisible();

  // Expected 2
  await expect(page.getByText(/2 items left!?/)).toBeVisible();
});
