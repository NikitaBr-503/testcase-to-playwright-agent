import { test, expect } from '../../../../../support/fixtures';
test('TODO-14 Позначення всіх завдань виконаними', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();
  await expect(page.locator('.todo-list li')).toHaveCount(0);

  const newTodoInput = page.getByPlaceholder('What needs to be done?');

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');
  await expect(page.getByText('Купити молоко')).toBeVisible();

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');
  await expect(page.getByText('Написати статтю')).toBeVisible();

  // Step 3
  await newTodoInput.fill('Подзвонити керівнику');
  await newTodoInput.press('Enter');
  await expect(page.getByText('Подзвонити керівнику')).toBeVisible();

  // Step 4
  await page.locator('.toggle-all').click();

  // Expected 1
  await expect(page.locator('.todo-list li')).toHaveCount(3);
  await expect(page.locator('.todo-list li.completed')).toHaveCount(3);
  const todoToggles = page.locator('.todo-list li .toggle');
  await expect(todoToggles).toHaveCount(3);
  for (const toggle of await todoToggles.all()) {
    await expect(toggle).toBeChecked();
  }

  // Expected 2
  await expect(page.getByText(/0 items left/)).toBeVisible();
});
