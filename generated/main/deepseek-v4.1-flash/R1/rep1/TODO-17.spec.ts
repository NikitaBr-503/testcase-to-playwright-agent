import { test, expect } from '../../../../../support/fixtures';
test('TODO-17 Видалення виконаного завдання у фільтрі «Completed»', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByText('0 items left!')).toBeVisible();

  // Step 1
  const newTodo = page.getByPlaceholder('What needs to be done?');
  await newTodo.fill('Купити молоко');
  await newTodo.press('Enter');

  // Step 2
  await newTodo.fill('Написати статтю');
  await newTodo.press('Enter');

  // Step 3
  await newTodo.fill('Подзвонити керівнику');
  await newTodo.press('Enter');

  const milkItem = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  const articleItem = page.getByRole('listitem').filter({ hasText: 'Написати статтю' });
  const callItem = page.getByRole('listitem').filter({ hasText: 'Подзвонити керівнику' });

  await expect(milkItem).toBeVisible();
  await expect(articleItem).toBeVisible();
  await expect(callItem).toBeVisible();

  // Step 4
  await milkItem.getByRole('checkbox').check();
  await expect(milkItem.getByRole('checkbox')).toBeChecked();

  // Step 5
  await articleItem.getByRole('checkbox').check();
  await expect(articleItem.getByRole('checkbox')).toBeChecked();

  // Step 6
  await page.getByRole('link', { name: 'Completed' }).click();

  await expect(milkItem).toBeVisible();
  await expect(articleItem).toBeVisible();
  await expect(callItem).toHaveCount(0);

  // Step 7
  await milkItem.hover();
  await milkItem.getByRole('button', { name: '×' }).click();

  // Expected 1
  await expect(articleItem).toBeVisible();
  await expect(page.getByRole('listitem').filter({ hasText: 'Купити молоко' })).toHaveCount(0);
  await expect(page.getByRole('listitem')).toHaveCount(1);
  await expect(page.getByRole('listitem').filter({ hasText: 'Написати статтю' })).toBeVisible();

  // Expected 2
  await expect(page.getByText('1 item left!')).toBeVisible();
});
