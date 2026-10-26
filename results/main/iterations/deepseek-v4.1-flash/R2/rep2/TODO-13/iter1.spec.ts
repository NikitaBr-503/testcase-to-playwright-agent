import { test, expect } from '../../../../../support/fixtures';
test('TODO-13 Очищення виконаних завдань', async ({ page }) => {
  // Preconditions
  // Список завдань порожній (застосунок не зберігає завдання між запусками)
  await page.goto('/');
  const newTodoInput = page.getByRole('textbox', { name: 'New Todo Input' });
  await expect(newTodoInput).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');
  await expect(page.getByRole('listitem').filter({ hasText: 'Купити молоко' })).toBeVisible();

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');
  await expect(page.getByRole('listitem').filter({ hasText: 'Написати статтю' })).toBeVisible();

  // Step 3
  await newTodoInput.fill('Подзвонити керівнику');
  await newTodoInput.press('Enter');
  await expect(page.getByRole('listitem').filter({ hasText: 'Подзвонити керівнику' })).toBeVisible();

  // Step 4
  await page
    .getByRole('listitem')
    .filter({ hasText: 'Купити молоко' })
    .getByRole('checkbox')
    .check();

  // Step 5
  await page
    .getByRole('listitem')
    .filter({ hasText: 'Подзвонити керівнику' })
    .getByRole('checkbox')
    .check();

  // Step 6
  await page.getByRole('button', { name: 'Clear completed' }).click();

  // Expected 1
  const remainingTodos = page.getByRole('listitem');
  await expect(remainingTodos).toHaveCount(1);
  await expect(remainingTodos.first()).toContainText('Написати статтю');
  await expect(page.getByText('Купити молоко')).toHaveCount(0);
  await expect(page.getByText('Подзвонити керівнику')).toHaveCount(0);

  // Expected 2
  await expect(page.getByRole('button', { name: 'Clear completed' })).toBeHidden();
});
