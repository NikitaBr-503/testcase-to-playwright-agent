import { test, expect } from '../../../../../support/fixtures';
test('TODO-11 Фільтр виконаних завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');

  // Step 3
  await newTodoInput.fill('Подзвонити керівнику');
  await newTodoInput.press('Enter');

  await expect(page.getByRole('listitem')).toHaveCount(3);

  // Step 4
  const articleTodo = page.getByRole('listitem').filter({ hasText: 'Написати статтю' });
  await articleTodo.getByRole('checkbox').check();

  // Step 5
  await page.getByRole('link', { name: 'Completed' }).click();

  // Expected 1
  await expect(page.getByRole('listitem')).toHaveCount(1);
  await expect(page.getByRole('listitem').filter({ hasText: 'Написати статтю' })).toBeVisible();
  await expect(page.getByRole('listitem').filter({ hasText: 'Купити молоко' })).not.toBeVisible();
  await expect(page.getByRole('listitem').filter({ hasText: 'Подзвонити керівнику' })).not.toBeVisible();

  // Expected 2
  await expect(page).toHaveURL(/#\/completed$/);
});
