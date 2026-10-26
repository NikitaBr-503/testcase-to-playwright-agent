import { test, expect } from '../../../../../support/fixtures';
test('TODO-09 Видалення завдання через очищення тексту під час редагування', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();
  await expect(page.getByTestId('todo-item')).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');
  await expect(page.getByText('Купити молоко', { exact: true })).toBeVisible();

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');
  await expect(page.getByText('Написати статтю', { exact: true })).toBeVisible();
  await expect(page.getByTestId('todo-item')).toHaveCount(2);

  // Step 3
  await page.getByText('Купити молоко', { exact: true }).dblclick();
  const editInput = page.locator('.todo-list li.editing').getByRole('textbox');
  await expect(editInput).toBeVisible();
  await expect(editInput).toHaveValue('Купити молоко');

  // Step 4
  await editInput.fill('');

  // Step 5
  await editInput.press('Enter');

  // Expected 1
  await expect(page.getByText('Купити молоко', { exact: true })).toHaveCount(0);
  await expect(page.getByTestId('todo-item')).toHaveCount(1);

  // Expected 2
  await expect(page.getByText('Написати статтю', { exact: true })).toBeVisible();
  await expect(page.getByTestId('todo-item')).toHaveCount(1);
  await expect(page.getByText('1 item left!')).toBeVisible();
});
