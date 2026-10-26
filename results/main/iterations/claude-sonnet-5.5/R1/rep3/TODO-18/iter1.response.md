```ts
import { test, expect } from '@playwright/test';

test('TODO-18 Повний сценарій роботи зі списком', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodo = page.getByPlaceholder('What needs to be done?');
  const items = page.getByRole('listitem');
  await expect(items).toHaveCount(0);

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
  await newTodo.fill('Забронювати квиток');
  await newTodo.press('Enter');
  await expect(items).toHaveCount(4);

  // Step 5
  await items.filter({ hasText: 'Купити молоко' }).getByRole('checkbox').check();

  // Step 6
  await items.filter({ hasText: 'Забронювати квиток' }).getByRole('checkbox').check();

  // Step 7
  await page.getByText('Написати статтю', { exact: true }).dblclick();

  // Step 8
  const editInput = page.getByRole('list').getByRole('textbox');
  await expect(editInput).toBeVisible();
  await editInput.fill('Написати статтю для Scopus');

  // Step 9
  await editInput.press('Enter');

  // Step 10
  await page.getByRole('link', { name: 'Active' }).click();

  // Expected 1
  await expect(items).toHaveCount(2);
  await expect(items).toHaveText(['Написати статтю для Scopus', 'Подзвонити керівнику']);
  await expect(page.getByText('Купити молоко')).toHaveCount(0);
  await expect(page.getByText('Забронювати квиток')).toHaveCount(0);

  // Step 11
  await page.getByRole('button', { name: 'Clear completed' }).click();

  // Step 12
  await page.getByRole('link', { name: 'All' }).click();

  // Expected 2
  await expect(items).toHaveCount(2);
  await expect(items).toHaveText(['Написати статтю для Scopus', 'Подзвонити керівнику']);
  await expect(page.getByText('2 items left!')).toBeVisible();
});
```