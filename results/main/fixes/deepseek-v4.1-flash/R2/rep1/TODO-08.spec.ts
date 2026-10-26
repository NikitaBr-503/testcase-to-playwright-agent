import { test, expect } from '../../../../../support/fixtures';
test('TODO-08 Редагування завдання подвійним клацанням', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByRole('textbox', { name: 'New Todo Input' });
  await expect(newTodoInput).toBeVisible();
  await expect(page.getByTestId('todo-item')).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');

  // Step 2
  const todoItem = page.getByRole('listitem').filter({ hasText: 'Написати статтю' });
  await todoItem.getByText('Написати статтю', { exact: true }).dblclick();

  // Step 3
  const editInput = todoItem.getByRole('textbox');
  await expect(editInput).toBeVisible();
  await editInput.fill('Написати статтю для Scopus');

  // Step 4
  await editInput.press('Enter');

  // Expected 1
  await expect(page.getByTestId('todo-item')).toHaveCount(1);
  await expect(page.getByText('Написати статтю для Scopus', { exact: true })).toBeVisible();

  // Expected 2
  await expect(page.getByText('Написати статтю', { exact: true })).toHaveCount(0);
});
