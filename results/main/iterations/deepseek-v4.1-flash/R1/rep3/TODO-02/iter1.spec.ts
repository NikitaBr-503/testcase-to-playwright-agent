import { test, expect } from '../../../../../support/fixtures';
test('TODO-02 Додавання трьох завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();
  await expect(page.getByTestId('todo-list').getByRole('listitem')).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');

  // Step 3
  await newTodoInput.fill('Подзвонити керівнику');
  await newTodoInput.press('Enter');

  // Expected 1
  const todoItems = page.getByTestId('todo-list').getByRole('listitem');
  await expect(todoItems).toHaveCount(3);
  await expect(todoItems.nth(0)).toHaveText('Купити молоко');
  await expect(todoItems.nth(1)).toHaveText('Написати статтю');
  await expect(todoItems.nth(2)).toHaveText('Подзвонити керівнику');

  // Expected 2
  await expect(page.getByText('3 items left!')).toBeVisible();
});
