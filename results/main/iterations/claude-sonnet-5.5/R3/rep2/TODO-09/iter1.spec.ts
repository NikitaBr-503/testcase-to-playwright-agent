import { test, expect } from '../../../../../support/fixtures';
test('TODO-09: Видалення завдання через очищення тексту під час редагування', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodo = page.getByPlaceholder('What needs to be done?');
  await expect(newTodo).toBeVisible();
  await expect(page.getByTestId('todo-item')).toHaveCount(0);

  // Step 1
  await newTodo.fill('Купити молоко');
  await newTodo.press('Enter');

  // Step 2
  await newTodo.fill('Написати статтю');
  await newTodo.press('Enter');
  await expect(page.getByTestId('todo-item')).toHaveCount(2);

  // Step 3
  await page.getByText('Купити молоко').dblclick();
  const editInput = page.getByRole('textbox', { name: 'Edit' });
  await expect(editInput).toBeVisible();

  // Step 4
  await editInput.fill('');

  // Step 5
  await editInput.press('Enter');

  // Expected 1
  await expect(page.getByText('Купити молоко')).toHaveCount(0);

  // Expected 2
  await expect(page.getByTestId('todo-item')).toHaveCount(1);
  await expect(page.getByTestId('todo-item').first()).toContainText('Написати статтю');
  await expect(page.getByText('1 item left!')).toBeVisible();
});
