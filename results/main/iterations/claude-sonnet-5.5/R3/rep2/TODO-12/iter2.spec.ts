import { test, expect } from '../../../../../support/fixtures';
test('TODO-12 Повернення до перегляду всіх завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodo = page.getByPlaceholder('What needs to be done?');
  await expect(newTodo).toBeVisible();

  // Step 1
  await newTodo.fill('Купити молоко');
  await newTodo.press('Enter');

  // Step 2
  await newTodo.fill('Написати статтю');
  await newTodo.press('Enter');

  // Step 3
  const todoList = page.getByRole('main').getByRole('list');
  const todoItems = todoList.getByRole('listitem');
  const milkItem = todoItems.filter({ hasText: 'Купити молоко' });
  await milkItem.getByRole('checkbox').check();

  // Step 4
  await page.getByRole('link', { name: 'Completed' }).click();

  // Step 5
  await page.getByRole('link', { name: 'All' }).click();

  // Expected 1
  await expect(page.getByText('Купити молоко')).toBeVisible();
  await expect(page.getByText('Написати статтю')).toBeVisible();
  await expect(todoItems).toHaveCount(2);

  // Expected 2
  await expect(page.getByText('1 item left!')).toBeVisible();
});
