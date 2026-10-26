```ts
import { test, expect } from '@playwright/test';

test('TODO-18: Повний сценарій роботи зі списком', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodo = page.getByPlaceholder('What needs to be done?');
  await expect(newTodo).toBeVisible();
  await expect(page.getByTestId('todo-item')).toHaveCount(0);

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
  await expect(page.getByRole('listitem').filter({ hasText: 'Забронювати квиток' })).toBeVisible();

  // Step 5
  const milkItem = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  await milkItem.getByRole('checkbox').check();

  // Step 6
  const ticketItem = page.getByRole('listitem').filter({ hasText: 'Забронювати квиток' });
  await ticketItem.getByRole('checkbox').check();

  // Step 7
  await page.getByText('Написати статтю', { exact: true }).dblclick();

  // Step 8
  const editInput = page.getByRole('textbox', { name: 'Edit' });
  await expect(editInput).toBeVisible();
  await editInput.fill('Написати статтю для Scopus');

  // Step 9
  await editInput.press('Enter');
  await expect(page.getByText('Написати статтю для Scopus')).toBeVisible();

  // Step 10
  await page.getByRole('link', { name: 'Active' }).click();

  // Expected 1
  const items = page.getByRole('listitem').filter({ has: page.getByRole('checkbox') });
  await expect(items).toHaveCount(2);
  await expect(page.getByText('Написати статтю для Scopus')).toBeVisible();
  await expect(page.getByText('Подзвонити керівнику')).toBeVisible();
  await expect(page.getByText('Купити молоко')).toHaveCount(0);
  await expect(page.getByText('Забронювати квиток')).toHaveCount(0);

  // Step 11
  await page.getByRole('button', { name: 'Clear completed' }).click();

  // Step 12
  await page.getByRole('link', { name: 'All' }).click();

  // Expected 2
  await expect(items).toHaveCount(2);
  await expect(page.getByText('Написати статтю для Scopus')).toBeVisible();
  await expect(page.getByText('Подзвонити керівнику')).toBeVisible();
  await expect(page.getByText('Купити молоко')).toHaveCount(0);
  await expect(page.getByText('Забронювати квиток')).toHaveCount(0);
  await expect(page.getByText('2 items left!')).toBeVisible();
});
```