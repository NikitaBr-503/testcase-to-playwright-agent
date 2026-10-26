import { test, expect } from '../../../../../support/fixtures';
test('TODO-19: Редагування завдання у фільтрі «Active»', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodo = page.getByPlaceholder('What needs to be done?');
  await expect(newTodo).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  await newTodo.fill('Купити молоко');
  await newTodo.press('Enter');

  // Step 2
  await newTodo.fill('Написати статтю');
  await newTodo.press('Enter');

  // Step 3
  await newTodo.fill('Подзвонити керівнику');
  await newTodo.press('Enter');

  const list = page.getByRole('list').filter({ has: page.getByRole('checkbox') });
  const milk = list.getByRole('listitem').filter({ hasText: 'Купити молоко' });

  // Step 4
  await milk.getByRole('checkbox').check();

  // Step 5
  await page.getByRole('link', { name: 'Active' }).click();

  // Step 6
  await list.getByText('Подзвонити керівнику').dblclick();

  // Step 7
  const editInput = list.getByRole('textbox');
  await expect(editInput).toBeVisible();
  await editInput.fill('Подзвонити науковому керівнику');

  // Step 8
  await editInput.press('Enter');

  // Step 9
  const call = list.getByRole('listitem').filter({ hasText: 'Подзвонити науковому керівнику' });
  await call.getByRole('checkbox').check();

  // Expected 1
  await expect(list.getByRole('listitem')).toHaveCount(1);
  await expect(list.getByRole('listitem').filter({ hasText: 'Написати статтю' })).toBeVisible();
  await expect(list.getByText('Купити молоко')).toHaveCount(0);
  await expect(list.getByText('Подзвонити науковому керівнику')).toHaveCount(0);

  // Step 10
  await page.getByRole('link', { name: 'Completed' }).click();

  // Expected 2
  await expect(list.getByRole('listitem')).toHaveCount(2);
  await expect(list.getByText('Купити молоко')).toBeVisible();
  await expect(list.getByText('Подзвонити науковому керівнику')).toBeVisible();
  await expect(list.getByText('Написати статтю')).toHaveCount(0);

  // Step 11
  await page.getByRole('link', { name: 'All' }).click();

  // Expected 3
  await expect(page.getByText('1 item left!')).toBeVisible();
});
