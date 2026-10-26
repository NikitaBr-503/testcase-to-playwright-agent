import { test, expect } from '../../../../../support/fixtures';
test('TODO-08: Редагування завдання подвійним клацанням', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');
  await expect(page.getByText('Написати статтю', { exact: true })).toBeVisible();

  // Step 2
  await page.getByText('Написати статтю', { exact: true }).dblclick();
  const editInput = page.getByRole('listitem').getByRole('textbox');
  await expect(editInput).toBeVisible();

  // Step 3
  await editInput.fill('Написати статтю для Scopus');

  // Step 4
  await editInput.press('Enter');

  // Expected 1
  await expect(page.getByText('Написати статтю для Scopus', { exact: true })).toBeVisible();

  // Expected 2
  await expect(page.getByText('Написати статтю', { exact: true })).toHaveCount(0);
});
