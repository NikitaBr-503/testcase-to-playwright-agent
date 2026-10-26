```ts
import { test, expect } from '@playwright/test';

test('TODO-18: Повний сценарій роботи зі списком', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();

  // Only the todo list lives inside <main>; the footer filter links are also list items,
  // so they must be excluded from every todo item locator.
  const todoItems = page.getByRole('main').getByRole('listitem');
  const todoItem = (text: string) => todoItems.filter({ hasText: text });

  await expect(todoItems).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');
  await expect(todoItem('Купити молоко')).toBeVisible();

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');
  await expect(todoItem('Написати статтю')).toBeVisible();

  // Step 3
  await newTodoInput.fill('Подзвонити керівнику');
  await newTodoInput.press('Enter');
  await expect(todoItem('Подзвонити керівнику')).toBeVisible();

  // Step 4
  await newTodoInput.fill('Забронювати квиток');
  await newTodoInput.press('Enter');
  await expect(todoItems).toHaveCount(4);
  await expect(todoItem('Забронювати квиток')).toBeVisible();

  // Step 5
  const milkCheckbox = todoItem('Купити молоко').getByRole('checkbox');
  await milkCheckbox.check();
  await expect(milkCheckbox).toBeChecked();

  // Step 6
  const ticketCheckbox = todoItem('Забронювати квиток').getByRole('checkbox');
  await ticketCheckbox.check();
  await expect(ticketCheckbox).toBeChecked();

  // Step 7
  await todoItem('Написати статтю').getByText('Написати статтю', { exact: true }).dblclick();

  // Step 8
  const editInput = todoItems.getByRole('textbox');
  await expect(editInput).toBeVisible();
  await editInput.fill('Написати статтю для Scopus');

  // Step 9
  await editInput.press('Enter');
  await expect(todoItem('Написати статтю для Scopus')).toBeVisible();

  // Step 10
  await page.getByRole('link', { name: 'Active' }).click();

  // Expected 1
  await expect(todoItems).toHaveCount(2);
  await expect(todoItem('Написати статтю для Scopus')).toBeVisible();
  await expect(todoItem('Подзвонити керівнику')).toBeVisible();
  await expect(todoItem('Купити молоко')).toHaveCount(0);
  await expect(todoItem('Забронювати квиток')).toHaveCount(0);

  // Step 11
  await page.getByRole('button', { name: 'Clear completed' }).click();

  // Step 12
  await page.getByRole('link', { name: 'All' }).click();

  // Expected 2
  await expect(todoItems).toHaveCount(2);
  await expect(todoItem('Написати статтю для Scopus')).toBeVisible();
  await expect(todoItem('Подзвонити керівнику')).toBeVisible();
  await expect(todoItem('Купити молоко')).toHaveCount(0);
  await expect(todoItem('Забронювати квиток')).toHaveCount(0);
  await expect(page.getByText('2 items left!')).toBeVisible();
});
```