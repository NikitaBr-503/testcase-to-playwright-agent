import { test, expect } from '../../../../../support/fixtures';
test('TODO-19 Редагування завдання у фільтрі «Active»', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByRole('textbox', { name: 'New Todo Input' })).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  const newTodoInput = page.getByRole('textbox', { name: 'New Todo Input' });
  const milkItem = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  const articleItem = page.getByRole('listitem').filter({ hasText: 'Написати статтю' });
  const chiefItem = page.getByRole('listitem').filter({ hasText: 'Подзвонити науковому керівнику' });

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');

  // Step 3
  await newTodoInput.fill('Подзвонити керівнику');
  await newTodoInput.press('Enter');

  // Step 4
  await milkItem.getByRole('checkbox').check();

  // Step 5
  await page.getByRole('link', { name: 'Active' }).click();

  // Step 6
  await page
    .getByRole('listitem')
    .filter({ hasText: 'Подзвонити керівнику' })
    .getByText('Подзвонити керівнику')
    .dblclick();

  // Step 7
  const editInput = page.locator('li.editing').locator('.edit');
  await expect(editInput).toBeVisible();
  await editInput.fill('Подзвонити науковому керівнику');

  // Step 8
  await editInput.press('Enter');

  // Step 9
  await chiefItem.getByRole('checkbox').check();

  // Expected 1
  await expect(page.getByRole('listitem')).toHaveCount(1);
  await expect(articleItem).toBeVisible();
  await expect(chiefItem).toHaveCount(0);

  // Step 10
  await page.getByRole('link', { name: 'Completed' }).click();

  // Expected 2
  await expect(page.getByRole('listitem')).toHaveCount(2);
  await expect(milkItem).toBeVisible();
  await expect(chiefItem).toBeVisible();

  // Step 11
  await page.getByRole('link', { name: 'All' }).click();

  // Expected 3
  await expect(page.getByText('1 item left!')).toBeVisible();
});
