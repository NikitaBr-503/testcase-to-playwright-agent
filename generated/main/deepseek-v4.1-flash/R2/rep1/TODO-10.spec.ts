import { test, expect } from '../../../../../support/fixtures';
test('TODO-10: Фільтр активних завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  const newTodoInput = page.getByPlaceholder('What needs to be done?');

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');

  // Step 3
  await newTodoInput.fill('Подзвонити керівнику');
  await newTodoInput.press('Enter');

  const milkTodo = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  const articleTodo = page.getByRole('listitem').filter({ hasText: 'Написати статтю' });
  const callTodo = page.getByRole('listitem').filter({ hasText: 'Подзвонити керівнику' });

  await expect(milkTodo).toBeVisible();
  await expect(articleTodo).toBeVisible();
  await expect(callTodo).toBeVisible();

  // Step 4
  await articleTodo.getByRole('checkbox').click();
  await expect(articleTodo.getByRole('checkbox')).toBeChecked();

  // Step 5
  await page.getByRole('link', { name: 'Active' }).click();

  // Expected 1
  await expect(page.getByRole('listitem')).toHaveCount(2);
  await expect(milkTodo).toBeVisible();
  await expect(callTodo).toBeVisible();
  await expect(articleTodo).toBeHidden();

  // Expected 2
  await expect(page).toHaveURL(/#\/active$/);
  await expect(page.getByRole('link', { name: 'Active' })).toHaveClass(/selected/);
});
