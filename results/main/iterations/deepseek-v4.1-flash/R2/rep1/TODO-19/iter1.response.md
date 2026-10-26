```ts
import { test, expect } from '@playwright/test';

test('TODO-19 Редагування завдання у фільтрі «Active»', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByRole('listitem')).toHaveCount(0);

  const newTodoInput = page.getByPlaceholder('What needs to be done?');

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
  const milkItem = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  await milkItem.getByRole('checkbox').check();

  // Step 5
  await page.getByRole('link', { name: 'Active' }).click();

  // Step 6
  const callBossItem = page.getByRole('listitem').filter({ hasText: 'Подзвонити керівнику' });
  await callBossItem.getByText('Подзвонити керівнику').dblclick();

  // Step 7
  const editInput = page.getByRole('listitem').getByRole('textbox');
  await editInput.fill('Подзвонити науковому керівнику');

  // Step 8
  await editInput.press('Enter');

  // Step 9
  const editedItem = page
    .getByRole('listitem')
    .filter({ hasText: 'Подзвонити науковому керівнику' });
  await editedItem.getByRole('checkbox').check();

  // Expected 1
  const activeItems = page.getByRole('listitem');
  await expect(activeItems).toHaveCount(1);
  await expect(activeItems.first()).toContainText('Написати статтю');

  // Step 10
  await page.getByRole('link', { name: 'Completed' }).click();

  // Expected 2
  const completedItems = page.getByRole('listitem');
  await expect(completedItems).toHaveCount(2);
  await expect(
    page.getByRole('listitem').filter({ hasText: 'Купити молоко' })
  ).toBeVisible();
  await expect(
    page.getByRole('listitem').filter({ hasText: 'Подзвонити науковому керівнику' })
  ).toBeVisible();

  // Step 11
  await page.getByRole('link', { name: 'All' }).click();

  // Expected 3
  await expect(page.getByText('1 item left!')).toBeVisible();
});
```