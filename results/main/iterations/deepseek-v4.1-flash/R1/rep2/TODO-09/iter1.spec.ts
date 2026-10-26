import { test, expect } from '../../../../../support/fixtures';
test('TODO-09 Видалення завдання через очищення тексту під час редагування', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');
  await expect(page.getByRole('listitem').filter({ hasText: 'Купити молоко' })).toBeVisible();

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');
  await expect(page.getByRole('listitem')).toHaveCount(2);
  await expect(page.getByRole('listitem').filter({ hasText: 'Написати статтю' })).toBeVisible();

  // Step 3
  await page.getByRole('listitem').filter({ hasText: 'Купити молоко' }).dblclick();
  const editInput = page.locator('li.editing').getByRole('textbox');
  await expect(editInput).toBeVisible();
  await expect(editInput).toHaveValue('Купити молоко');

  // Step 4
  await editInput.fill('');
  await expect(editInput).toHaveValue('');

  // Step 5
  await editInput.press('Enter');

  // Expected 1
  await expect(page.getByRole('listitem').filter({ hasText: 'Купити молоко' })).toHaveCount(0);

  // Expected 2
  await expect(page.getByRole('listitem')).toHaveCount(1);
  await expect(page.getByRole('listitem').filter({ hasText: 'Написати статтю' })).toBeVisible();
  await expect(page.locator('.todo-count')).toHaveText(/1 item left/);
});
