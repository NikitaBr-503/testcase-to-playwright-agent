import { test, expect } from '../../../../../support/fixtures';
test('TODO-17 Видалення виконаного завдання у фільтрі «Completed»', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'todos', level: 1 })).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  const newTodoInput = page.getByPlaceholder('What needs to be done?');

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');
  await expect(page.getByRole('listitem').filter({ hasText: 'Купити молоко' })).toBeVisible();

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');
  await expect(page.getByRole('listitem').filter({ hasText: 'Написати статтю' })).toBeVisible();

  // Step 3
  await newTodoInput.fill('Подзвонити керівнику');
  await newTodoInput.press('Enter');
  await expect(page.getByRole('listitem')).toHaveCount(3);

  const milkItem = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  const articleItem = page.getByRole('listitem').filter({ hasText: 'Написати статтю' });

  // Step 4
  await milkItem.getByRole('checkbox').check();
  await expect(milkItem.getByRole('checkbox')).toBeChecked();

  // Step 5
  await articleItem.getByRole('checkbox').check();
  await expect(articleItem.getByRole('checkbox')).toBeChecked();

  // Step 6
  await page.getByRole('link', { name: 'Completed' }).click();
  await expect(page.getByRole('listitem')).toHaveCount(2);
  await expect(page.getByRole('listitem').filter({ hasText: 'Купити молоко' })).toBeVisible();

  // Step 7
  await milkItem.hover();
  await milkItem.getByRole('button').click();

  // Expected 1
  await expect(page.getByRole('listitem')).toHaveCount(1);
  await expect(page.getByRole('listitem').filter({ hasText: 'Написати статтю' })).toBeVisible();
  await expect(page.getByRole('listitem').filter({ hasText: 'Купити молоко' })).toHaveCount(0);
  await expect(page.getByRole('listitem').filter({ hasText: 'Подзвонити керівнику' })).toHaveCount(0);

  // Expected 2
  await expect(page.getByText('1 item left!')).toBeVisible();
});
