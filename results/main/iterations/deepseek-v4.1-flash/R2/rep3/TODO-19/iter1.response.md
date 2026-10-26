```ts
import { test, expect } from '@playwright/test';

test('TODO-19: Редагування завдання у фільтрі «Active»', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodo = page.getByPlaceholder('What needs to be done?');
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

  // Step 4
  await page
    .getByRole('listitem')
    .filter({ hasText: 'Купити молоко' })
    .getByRole('checkbox')
    .check();

  // Step 5
  await page.getByRole('link', { name: 'Active' }).click();

  // Step 6
  const callBossItem = page.getByRole('listitem').filter({ hasText: 'Подзвонити керівнику' });
  await callBossItem.getByText('Подзвонити керівнику').dblclick();

  // Step 7
  const editInput = callBossItem.getByRole('textbox');
  await editInput.fill('Подзвонити науковому керівнику');

  // Step 8
  await editInput.press('Enter');

  // Step 9
  await page
    .getByRole('listitem')
    .filter({ hasText: 'Подзвонити науковому керівнику' })
    .getByRole('checkbox')
    .check();

  // Expected 1
  const items = page.getByRole('listitem');
  await expect(items).toHaveCount(1);
  await expect(items.first()).toHaveText('Написати статтю');

  // Step 10
  await page.getByRole('link', { name: 'Completed' }).click();

  // Expected 2
  await expect(items).toHaveCount(2);
  await expect(page.getByRole('listitem').filter({ hasText: 'Купити молоко' })).toBeVisible();
  await expect(
    page.getByRole('listitem').filter({ hasText: 'Подзвонити науковому керівнику' })
  ).toBeVisible();

  // Step 11
  await page.getByRole('link', { name: 'All' }).click();

  // Expected 3
  await expect(page.getByText('1 item left!')).toBeVisible();
});
```