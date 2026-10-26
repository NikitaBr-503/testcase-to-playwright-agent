import { test, expect } from '../../../../../support/fixtures';
test('TODO-10: Фільтр активних завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();

  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  // The todo items live inside the main list; the filter links are a separate list,
  // so scope the item locator to main to avoid matching the filter entries.
  const todoItems = page.getByRole('main').getByRole('listitem');

  await expect(newTodoInput).toHaveValue('');
  await expect(todoItems).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');
  await expect(todoItems.filter({ hasText: 'Купити молоко' })).toBeVisible();

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');
  await expect(todoItems.filter({ hasText: 'Написати статтю' })).toBeVisible();

  // Step 3
  await newTodoInput.fill('Подзвонити керівнику');
  await newTodoInput.press('Enter');
  await expect(todoItems.filter({ hasText: 'Подзвонити керівнику' })).toBeVisible();
  await expect(todoItems).toHaveCount(3);

  // Step 4
  const articleItem = todoItems.filter({ hasText: 'Написати статтю' });
  await articleItem.getByRole('checkbox').click();
  await expect(articleItem.getByRole('checkbox')).toBeChecked();

  // Step 5
  await page.getByRole('link', { name: 'Active' }).click();

  // Expected 1
  await expect(todoItems).toHaveCount(2);
  await expect(todoItems.filter({ hasText: 'Купити молоко' })).toBeVisible();
  await expect(todoItems.filter({ hasText: 'Подзвонити керівнику' })).toBeVisible();
  await expect(todoItems.filter({ hasText: 'Написати статтю' })).toHaveCount(0);

  // Expected 2
  await expect(page).toHaveURL(/#\/active$/);
  await expect(page.getByRole('link', { name: 'Active' })).toHaveClass(/selected/);
});
