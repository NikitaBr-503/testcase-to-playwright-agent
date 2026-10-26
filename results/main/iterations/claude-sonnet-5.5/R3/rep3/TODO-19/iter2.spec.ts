import { test, expect } from '../../../../../support/fixtures';
test('TODO-19: Редагування завдання у фільтрі «Active»', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodo = page.getByPlaceholder('What needs to be done?');
  await expect(newTodo).toBeVisible();

  const items = page.getByRole('main').getByRole('listitem');

  // Step 1
  await newTodo.fill('Купити молоко');
  await newTodo.press('Enter');

  // Step 2
  await newTodo.fill('Написати статтю');
  await newTodo.press('Enter');

  // Step 3
  await newTodo.fill('Подзвонити керівнику');
  await newTodo.press('Enter');

  // Step 4
  await items
    .filter({ hasText: 'Купити молоко' })
    .getByRole('checkbox')
    .click();

  // Step 5
  await page.getByRole('link', { name: 'Active' }).click();

  // Step 6
  await page.getByText('Подзвонити керівнику').dblclick();

  // Step 7
  const editInput = items.getByRole('textbox');
  await expect(editInput).toBeVisible();
  await editInput.fill('Подзвонити науковому керівнику');

  // Step 8
  await editInput.press('Enter');

  // Step 9
  await items
    .filter({ hasText: 'Подзвонити науковому керівнику' })
    .getByRole('checkbox')
    .click();

  // Expected 1
  await expect(items).toHaveCount(1);
  await expect(items.first()).toContainText('Написати статтю');

  // Step 10
  await page.getByRole('link', { name: 'Completed' }).click();

  // Expected 2
  await expect(items).toHaveCount(2);
  await expect(items.filter({ hasText: 'Купити молоко' })).toHaveCount(1);
  await expect(items.filter({ hasText: 'Подзвонити науковому керівнику' })).toHaveCount(1);

  // Step 11
  await page.getByRole('link', { name: 'All' }).click();

  // Expected 3
  await expect(page.getByText('1 item left!')).toBeVisible();
});
