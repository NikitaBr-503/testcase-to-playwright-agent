import { test, expect } from '../../../../../support/fixtures';
test('TODO-11: Фільтр виконаних завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodo = page.getByPlaceholder('What needs to be done?');
  await expect(newTodo).toBeVisible();
  await expect(page.getByTestId('todo-item')).toHaveCount(0);

  // Step 1
  await newTodo.fill('Купити молоко');
  await newTodo.press('Enter');

  // Step 2
  await newTodo.fill('Написати статтю');
  await newTodo.press('Enter');

  // Step 3
  await newTodo.fill('Подзвонити керівнику');
  await newTodo.press('Enter');
  await expect(page.getByTestId('todo-item')).toHaveCount(3);

  // Step 4
  await page
    .getByTestId('todo-item')
    .filter({ hasText: 'Написати статтю' })
    .getByRole('checkbox')
    .check();

  // Step 5
  await page.getByRole('link', { name: 'Completed' }).click();

  // Expected 1
  const items = page.getByTestId('todo-item');
  await expect(items).toHaveCount(1);
  await expect(items.first()).toContainText('Написати статтю');
  await expect(page.getByText('Купити молоко')).toHaveCount(0);
  await expect(page.getByText('Подзвонити керівнику')).toHaveCount(0);

  // Expected 2
  await expect(page).toHaveURL(/#\/completed$/);
});
