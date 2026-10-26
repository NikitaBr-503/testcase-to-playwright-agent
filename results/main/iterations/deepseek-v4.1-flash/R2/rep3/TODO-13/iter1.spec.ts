import { test, expect } from '../../../../../support/fixtures';
test('TODO-13 Очищення виконаних завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');

  // Step 3
  await newTodoInput.fill('Подзвонити керівнику');
  await newTodoInput.press('Enter');

  const milkItem = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  const articleItem = page.getByRole('listitem').filter({ hasText: 'Написати статтю' });
  const callItem = page.getByRole('listitem').filter({ hasText: 'Подзвонити керівнику' });

  await expect(milkItem).toBeVisible();
  await expect(articleItem).toBeVisible();
  await expect(callItem).toBeVisible();

  // Step 4
  await milkItem.getByRole('checkbox').check();

  // Step 5
  await callItem.getByRole('checkbox').check();

  // Step 6
  await page.getByRole('button', { name: 'Clear completed' }).click();

  // Expected 1
  await expect(page.getByRole('listitem')).toHaveCount(1);
  await expect(articleItem).toBeVisible();
  await expect(articleItem).toContainText('Написати статтю');
  await expect(milkItem).toHaveCount(0);
  await expect(callItem).toHaveCount(0);

  // Expected 2
  await expect(page.getByRole('button', { name: 'Clear completed' })).toBeHidden();
});
