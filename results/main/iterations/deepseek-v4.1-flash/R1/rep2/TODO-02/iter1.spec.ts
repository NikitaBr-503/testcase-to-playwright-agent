import { test, expect } from '../../../../../support/fixtures';
test('TODO-02 Додавання трьох завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByPlaceholder('What needs to be done?')).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  const newTodo = page.getByPlaceholder('What needs to be done?');

  // Step 1
  await newTodo.fill('Купити молоко');
  await newTodo.press('Enter');

  // Step 2
  await newTodo.fill('Написати статтю');
  await newTodo.press('Enter');

  // Step 3
  await newTodo.fill('Подзвонити керівнику');
  await newTodo.press('Enter');

  // Expected 1
  const items = page.getByRole('listitem');
  await expect(items).toHaveCount(3);
  await expect(items.nth(0)).toContainText('Купити молоко');
  await expect(items.nth(1)).toContainText('Написати статтю');
  await expect(items.nth(2)).toContainText('Подзвонити керівнику');

  // Expected 2
  await expect(page.getByText('3 items left!', { exact: true })).toBeVisible();
});
