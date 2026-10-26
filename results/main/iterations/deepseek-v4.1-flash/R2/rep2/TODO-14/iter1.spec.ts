import { test, expect } from '../../../../../support/fixtures';
test('TODO-14 Позначення всіх завдань виконаними', async ({ page }) => {
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

  const todoItems = page.getByRole('listitem');
  await expect(todoItems).toHaveCount(3);

  // Step 4
  const toggleAll = page
    .getByRole('checkbox', { name: /mark all as complete/i })
    .or(page.getByRole('button', { name: /mark all as complete/i }));
  await toggleAll.click();

  // Expected 1
  await expect(
    todoItems.filter({ hasText: 'Купити молоко' }).getByRole('checkbox')
  ).toBeChecked();
  await expect(
    todoItems.filter({ hasText: 'Написати статтю' }).getByRole('checkbox')
  ).toBeChecked();
  await expect(
    todoItems.filter({ hasText: 'Подзвонити керівнику' }).getByRole('checkbox')
  ).toBeChecked();

  // Expected 2
  await expect(page.getByText('0 items left!')).toBeVisible();
});
