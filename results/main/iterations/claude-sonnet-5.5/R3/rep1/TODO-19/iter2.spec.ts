import { test, expect } from '../../../../../support/fixtures';
test('TODO-19: Редагування завдання у фільтрі «Active»', async ({ page }) => {
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

  // Step 3
  await newTodo.fill('Подзвонити керівнику');
  await newTodo.press('Enter');

  // Step 4
  await page
    .getByRole('listitem')
    .filter({ hasText: 'Купити молоко' })
    .getByRole('checkbox')
    .check();

  // Step 5
  await page.getByRole('link', { name: 'Active' }).click();

  // Step 6
  await page.getByText('Подзвонити керівнику').dblclick();

  // Step 7
  const editInput = page.getByRole('textbox', { name: 'Edit' });
  await expect(editInput).toBeVisible();
  await editInput.fill('Подзвонити науковому керівнику');

  // Step 8
  await editInput.press('Enter');

  // Step 9
  // The item disappears from the "Active" filter once toggled, so use click()
  // instead of check() (which would verify the checked state on a removed element).
  await page
    .getByRole('listitem')
    .filter({ hasText: 'Подзвонити науковому керівнику' })
    .getByRole('checkbox')
    .click();

  // Expected 1
  const items = page.getByRole('listitem').filter({ has: page.getByRole('checkbox') });
  await expect(items).toHaveCount(1);
  await expect(items.first()).toContainText('Написати статтю');
  await expect(page.getByText('Купити молоко')).toBeHidden();
  await expect(page.getByText('Подзвонити науковому керівнику')).toBeHidden();

  // Step 10
  await page.getByRole('link', { name: 'Completed' }).click();

  // Expected 2
  await expect(items).toHaveCount(2);
  await expect(page.getByText('Купити молоко')).toBeVisible();
  await expect(page.getByText('Подзвонити науковому керівнику')).toBeVisible();
  await expect(page.getByText('Написати статтю')).toBeHidden();

  // Step 11
  await page.getByRole('link', { name: 'All' }).click();

  // Expected 3
  await expect(page.getByText('1 item left!')).toBeVisible();
});
