import { test, expect } from '../../../../../support/fixtures';
test('TODO-08: Редагування завдання подвійним клацанням', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');
  const todoItem = page.getByRole('listitem').filter({ hasText: 'Написати статтю' });
  await expect(todoItem).toBeVisible();

  // Step 2
  await todoItem.getByText('Написати статтю', { exact: true }).dblclick();
  const editInput = page.locator('li.editing').getByRole('textbox');
  await expect(editInput).toBeVisible();
  await expect(editInput).toHaveValue('Написати статтю');

  // Step 3
  await editInput.fill('Написати статтю для Scopus');

  // Step 4
  await editInput.press('Enter');

  // Expected 1
  await expect(page.getByRole('listitem').filter({ hasText: 'Написати статтю для Scopus' })).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(1);

  // Expected 2
  await expect(page.getByText('Написати статтю', { exact: true })).toHaveCount(0);
  await expect(page.locator('li.editing')).toHaveCount(0);
});
