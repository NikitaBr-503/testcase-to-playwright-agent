import { test, expect } from '../../../../../support/fixtures';
test('TODO-12 Повернення до перегляду всіх завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByText('0 items left!')).toBeVisible();

  const newTodoInput = page.getByPlaceholder('What needs to be done?');

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');

  const milkTodo = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  const articleTodo = page.getByRole('listitem').filter({ hasText: 'Написати статтю' });

  await expect(milkTodo).toBeVisible();
  await expect(articleTodo).toBeVisible();

  // Step 3
  await milkTodo.getByRole('checkbox').check();

  // Step 4
  await page.getByRole('link', { name: 'Completed' }).click();
  await expect(milkTodo).toBeVisible();
  await expect(articleTodo).toBeHidden();

  // Step 5
  await page.getByRole('link', { name: 'All' }).click();

  // Expected 1
  await expect(milkTodo).toBeVisible();
  await expect(articleTodo).toBeVisible();

  // Expected 2
  await expect(page.getByText('1 item left!')).toBeVisible();
});
