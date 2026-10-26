import { test, expect } from '../../../../../support/fixtures';
test('TODO-17 Видалення виконаного завдання у фільтрі «Completed»', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();
  const newTodo = page.getByPlaceholder('What needs to be done?');
  await expect(newTodo).toBeVisible();

  // Todo items live inside the main section; the filter bar below is a separate list.
  const todoItems = page.getByRole('main').getByRole('listitem');
  await expect(todoItems).toHaveCount(0);

  // Step 1
  await newTodo.fill('Купити молоко');
  await newTodo.press('Enter');
  await expect(todoItems.filter({ hasText: 'Купити молоко' })).toBeVisible();

  // Step 2
  await newTodo.fill('Написати статтю');
  await newTodo.press('Enter');
  await expect(todoItems.filter({ hasText: 'Написати статтю' })).toBeVisible();

  // Step 3
  await newTodo.fill('Подзвонити керівнику');
  await newTodo.press('Enter');
  await expect(todoItems.filter({ hasText: 'Подзвонити керівнику' })).toBeVisible();

  // Step 4
  const milkTodo = todoItems.filter({ hasText: 'Купити молоко' });
  await milkTodo.getByRole('checkbox').check();
  await expect(milkTodo.getByRole('checkbox')).toBeChecked();

  // Step 5
  const articleTodo = todoItems.filter({ hasText: 'Написати статтю' });
  await articleTodo.getByRole('checkbox').check();
  await expect(articleTodo.getByRole('checkbox')).toBeChecked();

  // Step 6
  await page.getByRole('link', { name: 'Completed' }).click();
  await expect(page).toHaveURL(/#\/completed$/);
  await expect(todoItems).toHaveCount(2);
  await expect(todoItems.filter({ hasText: 'Купити молоко' })).toBeVisible();
  await expect(todoItems.filter({ hasText: 'Написати статтю' })).toBeVisible();

  // Step 7
  const completedMilkTodo = todoItems.filter({ hasText: 'Купити молоко' });
  await completedMilkTodo.hover();
  await expect(completedMilkTodo.getByRole('button')).toBeVisible();
  await completedMilkTodo.getByRole('button').click();

  // Expected 1
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems.filter({ hasText: 'Написати статтю' })).toBeVisible();
  await expect(todoItems.filter({ hasText: 'Купити молоко' })).toHaveCount(0);

  // Expected 2
  await expect(page.getByText('1 item left!')).toBeVisible();
});
