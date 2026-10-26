import { test, expect } from '../../../../../support/fixtures';
test('TODO-02 Додавання трьох завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();

  // The todo list lives inside the main region; the footer filter links are
  // also list items, so scope the locator to the main region.
  const todoList = page.getByRole('main').getByRole('listitem');
  await expect(todoList).toHaveCount(0);

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
  await expect(todoList).toHaveText([
    'Купити молоко',
    'Написати статтю',
    'Подзвонити керівнику',
  ]);

  // Expected 2
  await expect(page.getByText('3 items left!', { exact: true })).toBeVisible();
});
