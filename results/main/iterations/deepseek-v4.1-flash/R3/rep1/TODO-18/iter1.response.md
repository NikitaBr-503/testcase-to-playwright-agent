```ts
import { test, expect } from '@playwright/test';

test('TODO-18 Повний сценарій роботи зі списком', async ({ page }) => {
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  const todoItems = page.getByRole('listitem');

  // Preconditions
  await page.goto('/');
  await expect(newTodoInput).toBeVisible();
  await expect(todoItems).toHaveCount(0);

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
  await newTodoInput.fill('Забронювати квиток');
  await newTodoInput.press('Enter');
  await expect(todoItems).toHaveCount(4);

  // Step 5
  await todoItems.filter({ hasText: 'Купити молоко' }).getByRole('checkbox').click();

  // Step 6
  await todoItems.filter({ hasText: 'Забронювати квиток' }).getByRole('checkbox').click();

  // Step 7
  await page.getByText('Написати статтю', { exact: true }).dblclick();

  // Step 8
  const editInput = page.getByRole('textbox').nth(1);
  await expect(editInput).toBeVisible();
  await editInput.fill('Написати статтю для Scopus');

  // Step 9
  await editInput.press('Enter');
  await expect(page.getByText('Написати статтю для Scopus', { exact: true })).toBeVisible();

  // Step 10
  await page.getByRole('link', { name: 'Active' }).click();

  // Expected 1
  await expect(todoItems).toHaveCount(2);
  await expect(todoItems.filter({ hasText: 'Написати статтю для Scopus' })).toBeVisible();
  await expect(todoItems.filter({ hasText: 'Подзвонити керівнику' })).toBeVisible();
  await expect(todoItems.filter({ hasText: 'Купити молоко' })).toHaveCount(0);
  await expect(todoItems.filter({ hasText: 'Забронювати квиток' })).toHaveCount(0);

  // Step 11
  await page.getByRole('button', { name: 'Clear completed' }).click();

  // Step 12
  await page.getByRole('link', { name: 'All' }).click();

  // Expected 2
  await expect(todoItems).toHaveCount(2);
  await expect(todoItems.filter({ hasText: 'Написати статтю для Scopus' })).toBeVisible();
  await expect(todoItems.filter({ hasText: 'Подзвонити керівнику' })).toBeVisible();
  await expect(todoItems.filter({ hasText: 'Купити молоко' })).toHaveCount(0);
  await expect(todoItems.filter({ hasText: 'Забронювати квиток' })).toHaveCount(0);
  await expect(page.getByText('2 items left!')).toBeVisible();
});
```