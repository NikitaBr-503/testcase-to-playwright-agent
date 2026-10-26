```ts
import { test, expect } from '@playwright/test';

test('TODO-18: Повний сценарій роботи зі списком', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const input = page.getByPlaceholder('What needs to be done?');
  await expect(input).toBeVisible();
  await expect(page.getByTestId('todo-item')).toHaveCount(0);

  // Step 1
  await input.fill('Купити молоко');
  await input.press('Enter');

  // Step 2
  await input.fill('Написати статтю');
  await input.press('Enter');

  // Step 3
  await input.fill('Подзвонити керівнику');
  await input.press('Enter');

  // Step 4
  await input.fill('Забронювати квиток');
  await input.press('Enter');

  const items = page.getByRole('listitem').filter({ has: page.getByRole('checkbox') });
  await expect(items).toHaveCount(4);

  // Step 5
  await items.filter({ hasText: 'Купити молоко' }).getByRole('checkbox').check();

  // Step 6
  await items.filter({ hasText: 'Забронювати квиток' }).getByRole('checkbox').check();

  // Step 7
  await page.getByText('Написати статтю', { exact: true }).dblclick();

  // Step 8
  const editInput = page.getByRole('textbox', { name: 'Edit' });
  await expect(editInput).toBeVisible();
  await editInput.fill('Написати статтю для Scopus');

  // Step 9
  await editInput.press('Enter');

  // Step 10
  await page.getByRole('link', { name: 'Active' }).click();

  // Expected 1
  await expect(items).toHaveCount(2);
  await expect(items.filter({ hasText: 'Написати статтю для Scopus' })).toBeVisible();
  await expect(items.filter({ hasText: 'Подзвонити керівнику' })).toBeVisible();
  await expect(page.getByText('Купити молоко')).toHaveCount(0);
  await expect(page.getByText('Забронювати квиток')).toHaveCount(0);

  // Step 11
  await page.getByRole('button', { name: 'Clear completed' }).click();

  // Step 12
  await page.getByRole('link', { name: 'All' }).click();

  // Expected 2
  await expect(items).toHaveCount(2);
  await expect(items.filter({ hasText: 'Написати статтю для Scopus' })).toBeVisible();
  await expect(items.filter({ hasText: 'Подзвонити керівнику' })).toBeVisible();
  await expect(page.getByText('Купити молоко')).toHaveCount(0);
  await expect(page.getByText('Забронювати квиток')).toHaveCount(0);
  await expect(page.getByText('2 items left!')).toBeVisible();
});
```