```ts
import { test, expect } from '@playwright/test';

test('TODO-19 Редагування завдання у фільтрі «Active»', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  await page.getByPlaceholder('What needs to be done?').fill('Купити молоко');
  await page.getByPlaceholder('What needs to be done?').press('Enter');

  // Step 2
  await page.getByPlaceholder('What needs to be done?').fill('Написати статтю');
  await page.getByPlaceholder('What needs to be done?').press('Enter');

  // Step 3
  await page.getByPlaceholder('What needs to be done?').fill('Подзвонити керівнику');
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  await expect(page.getByRole('listitem')).toHaveCount(3);

  // Step 4
  await page
    .getByRole('listitem')
    .filter({ hasText: 'Купити молоко' })
    .getByRole('checkbox')
    .check();

  // Step 5
  await page.getByRole('link', { name: 'Active' }).click();
  await expect(page.getByRole('listitem')).toHaveCount(2);

  // Step 6
  const todoToEdit = page.getByRole('listitem').filter({ hasText: 'Подзвонити керівнику' });
  await todoToEdit.getByText('Подзвонити керівнику').dblclick();

  // Step 7
  const editInput = todoToEdit.getByRole('textbox');
  await expect(editInput).toHaveValue('Подзвонити керівнику');
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
  await expect(page.getByRole('listitem')).toHaveCount(1);
  await expect(page.getByRole('listitem')).toHaveText('Написати статтю');
  await expect(
    page.getByRole('listitem').filter({ hasText: 'Подзвонити науковому керівнику' })
  ).toHaveCount(0);

  // Step 10
  await page.getByRole('link', { name: 'Completed' }).click();

  // Expected 2
  await expect(page.getByRole('listitem')).toHaveCount(2);
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