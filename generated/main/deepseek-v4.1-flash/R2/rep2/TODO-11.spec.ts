import { test, expect } from '../../../../../support/fixtures';
test('TODO-11 Фільтр виконаних завдань', async ({ page }) => {
  // Preconditions
  // Список завдань порожній — застосунок не зберігає завдання між запусками
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

  await expect(page.getByRole('listitem')).toHaveCount(3);

  // Step 4
  await page
    .getByRole('listitem')
    .filter({ hasText: 'Написати статтю' })
    .getByRole('checkbox')
    .check();

  // Step 5
  await page.getByRole('link', { name: 'Completed' }).click();

  // Expected 1
  await expect(
    page.getByRole('listitem').filter({ hasText: 'Написати статтю' })
  ).toBeVisible();
  await expect(
    page.getByRole('listitem').filter({ hasText: 'Купити молоко' })
  ).toHaveCount(0);
  await expect(
    page.getByRole('listitem').filter({ hasText: 'Подзвонити керівнику' })
  ).toHaveCount(0);
  await expect(page.getByRole('listitem')).toHaveCount(1);

  // Expected 2
  await expect(page).toHaveURL(/#\/completed$/);
});
