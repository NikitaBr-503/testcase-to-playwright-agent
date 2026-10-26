```ts
import { test, expect } from '@playwright/test';

test('TODO-19: Редагування завдання у фільтрі «Active»', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const input = page.getByPlaceholder('What needs to be done?');
  await expect(input).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  await input.fill('Купити молоко');
  await input.press('Enter');

  // Step 2
  await input.fill('Написати статтю');
  await input.press('Enter');

  // Step 3
  await input.fill('Подзвонити керівнику');
  await input.press('Enter');
  await expect(page.getByText('Подзвонити керівнику')).toBeVisible();

  // Step 4
  await page.getByRole('listitem').filter({ hasText: 'Купити молоко' }).getByRole('checkbox').check();

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
  await page.getByRole('listitem').filter({ hasText: 'Подзвонити науковому керівнику' }).getByRole('checkbox').check();

  // Expected 1
  const items = page.getByTestId('todo-item');
  await expect(page.getByRole('listitem').filter({ hasText: 'Написати статтю' })).toBeVisible();
  await expect(page.getByText('Купити молоко')).toHaveCount(0);
  await expect(page.getByText('Подзвонити науковому керівнику')).toHaveCount(0);
  await expect(page.getByTestId('todo-list').getByRole('listitem')).toHaveCount(1);

  // Step 10
  await page.getByRole('link', { name: 'Completed' }).click();

  // Expected 2
  await expect(page.getByText('Купити молоко')).toBeVisible();
  await expect(page.getByText('Подзвонити науковому керівнику')).toBeVisible();
  await expect(page.getByText('Написати статтю')).toHaveCount(0);
  await expect(page.getByTestId('todo-list').getByRole('listitem')).toHaveCount(2);

  // Step 11
  await page.getByRole('link', { name: 'All' }).click();

  // Expected 3
  await expect(page.getByText('1 item left!')).toBeVisible();
});
```