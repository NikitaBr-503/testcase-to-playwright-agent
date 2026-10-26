import { test, expect } from '../../../../../support/fixtures';
test('TODO-19 Редагування завдання у фільтрі «Active»', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const todoItems = page.getByRole('main').getByRole('listitem');
  await expect(todoItems).toHaveCount(0);

  // Step 1
  await page.getByPlaceholder('What needs to be done?').fill('Купити молоко');
  await page.getByPlaceholder('What needs to be done?').press('Enter');

  // Step 2
  await page.getByPlaceholder('What needs to be done?').fill('Написати статтю');
  await page.getByPlaceholder('What needs to be done?').press('Enter');

  // Step 3
  await page.getByPlaceholder('What needs to be done?').fill('Подзвонити керівнику');
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  await expect(todoItems).toHaveCount(3);

  // Step 4
  await todoItems
    .filter({ hasText: 'Купити молоко' })
    .getByRole('checkbox')
    .click();

  // Step 5
  await page.getByRole('link', { name: 'Active' }).click();
  await expect(todoItems).toHaveCount(2);

  // Step 6
  const todoToEdit = todoItems.filter({ hasText: 'Подзвонити керівнику' });
  await todoToEdit.getByText('Подзвонити керівнику').dblclick();

  // Step 7
  const editInput = todoToEdit.getByRole('textbox');
  await expect(editInput).toHaveValue('Подзвонити керівнику');
  await editInput.fill('Подзвонити науковому керівнику');

  // Step 8
  await editInput.press('Enter');
  await expect(
    todoItems.filter({ hasText: 'Подзвонити науковому керівнику' })
  ).toHaveCount(1);

  // Step 9
  await todoItems
    .filter({ hasText: 'Подзвонити науковому керівнику' })
    .getByRole('checkbox')
    .click();

  // Expected 1
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems).toContainText('Написати статтю');
  await expect(
    todoItems.filter({ hasText: 'Подзвонити науковому керівнику' })
  ).toHaveCount(0);

  // Step 10
  await page.getByRole('link', { name: 'Completed' }).click();

  // Expected 2
  await expect(todoItems).toHaveCount(2);
  await expect(
    todoItems.filter({ hasText: 'Купити молоко' })
  ).toContainText('Купити молоко');
  await expect(
    todoItems.filter({ hasText: 'Подзвонити науковому керівнику' })
  ).toContainText('Подзвонити науковому керівнику');

  // Step 11
  await page.getByRole('link', { name: 'All' }).click();

  // Expected 3
  await expect(page.getByText('1 item left!')).toBeVisible();
});
