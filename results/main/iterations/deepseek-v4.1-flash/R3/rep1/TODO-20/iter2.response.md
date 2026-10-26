```ts
import { test, expect } from '@playwright/test';

test('TODO-20 Масове позначення, видалення і додавання завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();

  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  const toggleAll = page.getByRole('checkbox', { name: /Toggle All/ });
  // Todo items live inside <main>; the filter links are a separate list outside it.
  const todoItems = page.getByRole('main').getByRole('listitem');

  await expect(todoItems).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems.first()).toContainText('Купити молоко');

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');
  await expect(todoItems).toHaveCount(2);
  await expect(todoItems.nth(1)).toContainText('Написати статтю');

  // Step 3
  await newTodoInput.fill('Подзвонити керівнику');
  await newTodoInput.press('Enter');
  await expect(todoItems).toHaveCount(3);
  await expect(todoItems.nth(2)).toContainText('Подзвонити керівнику');

  // Step 4
  await toggleAll.click();
  await expect(todoItems.nth(0).getByRole('checkbox')).toBeChecked();
  await expect(todoItems.nth(1).getByRole('checkbox')).toBeChecked();
  await expect(todoItems.nth(2).getByRole('checkbox')).toBeChecked();

  // Step 5
  const articleItem = todoItems.filter({ hasText: 'Написати статтю' });
  await articleItem.getByRole('checkbox').click();
  await expect(articleItem.getByRole('checkbox')).not.toBeChecked();

  // Step 6
  await page.getByRole('button', { name: 'Clear completed' }).click();

  // Expected 1
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems.first()).toContainText('Написати статтю');

  // Step 7
  await newTodoInput.fill('Підготувати презентацію');
  await newTodoInput.press('Enter');
  await expect(todoItems).toHaveCount(2);
  await expect(todoItems.nth(1)).toContainText('Підготувати презентацію');

  // Step 8
  await toggleAll.click();
  await expect(todoItems.nth(0).getByRole('checkbox')).toBeChecked();
  await expect(todoItems.nth(1).getByRole('checkbox')).toBeChecked();

  // Step 9
  await page.getByRole('link', { name: 'Completed' }).click();
  await expect(todoItems).toHaveCount(2);

  // Step 10
  await page.getByRole('button', { name: 'Clear completed' }).click();

  // Expected 2
  await expect(todoItems).toHaveCount(0);
  await expect(page.locator('.todo-count')).toBeHidden();
  await expect(page.getByRole('link', { name: 'All' })).toBeHidden();
  await expect(page.getByRole('link', { name: 'Active' })).toBeHidden();
  await expect(page.getByRole('link', { name: 'Completed' })).toBeHidden();

  // Step 11
  await newTodoInput.fill('Купити хліб');
  await newTodoInput.press('Enter');

  // Step 12
  await page.getByRole('link', { name: 'All' }).click();

  // Expected 3
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems.first()).toContainText('Купити хліб');
  await expect(page.locator('.todo-count')).toHaveText(/1 item left!/);
});
```