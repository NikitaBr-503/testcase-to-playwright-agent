import { test, expect } from '../../../../../support/fixtures';
test('TODO-09: Видалення завдання через очищення тексту під час редагування', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();
  const items = page.getByRole('listitem');
  await expect(items).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');
  await expect(page.getByText('Купити молоко')).toBeVisible();

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');
  await expect(page.getByText('Написати статтю')).toBeVisible();
  await expect(items).toHaveCount(2);

  // Step 3
  await page.getByText('Купити молоко').dblclick();
  const editInput = items.first().getByRole('textbox');
  await expect(editInput).toBeVisible();

  // Step 4
  await editInput.fill('');

  // Step 5
  await editInput.press('Enter');

  // Expected 1
  await expect(page.getByText('Купити молоко')).toHaveCount(0);

  // Expected 2
  await expect(items).toHaveCount(1);
  await expect(items.first()).toContainText('Написати статтю');
  await expect(page.getByText('1 item left!')).toBeVisible();
});
