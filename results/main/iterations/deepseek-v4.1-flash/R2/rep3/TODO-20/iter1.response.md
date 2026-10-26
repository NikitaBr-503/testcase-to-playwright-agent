```ts
import { test, expect } from '@playwright/test';

test('TODO-20 Масове позначення, видалення і додавання завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();

  // Todo entries are the list items that contain a completion checkbox
  // (the filter bar at the bottom is also built from list items).
  const todoItems = page.getByRole('listitem').filter({ has: page.getByRole('checkbox') });
  const toggleAll = page
    .getByRole('checkbox', { name: /all/i })
    .or(page.getByRole('button', { name: /all/i }))
    .or(page.locator('.toggle-all'));
  const itemsLeft = page.getByText(/^\d+ items? left!?$/i);

  await expect(todoItems).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');
  await expect(todoItems.filter({ hasText: 'Купити молоко' })).toBeVisible();

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');
  await expect(todoItems.filter({ hasText: 'Написати статтю' })).toBeVisible();

  // Step 3
  await newTodoInput.fill('Подзвонити керівнику');
  await newTodoInput.press('Enter');
  await expect(todoItems.filter({ hasText: 'Подзвонити керівнику' })).toBeVisible();
  await expect(todoItems).toHaveCount(3);

  // Step 4
  await toggleAll.click();
  await expect(todoItems.getByRole('checkbox').first()).toBeChecked();

  // Step 5
  const articleItem = todoItems.filter({ hasText: 'Написати статтю' });
  await articleItem.getByRole('checkbox').click();
  await expect(articleItem.getByRole('checkbox')).not.toBeChecked();

  // Step 6
  await page.getByRole('button', { name: 'Clear completed' }).click();

  // Expected 1
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems.filter({ hasText: 'Написати статтю' })).toBeVisible();
  await expect(todoItems.filter({ hasText: 'Купити молоко' })).toHaveCount(0);
  await expect(todoItems.filter({ hasText: 'Подзвонити керівнику' })).toHaveCount(0);

  // Step 7
  await newTodoInput.fill('Підготувати презентацію');
  await newTodoInput.press('Enter');
  await expect(todoItems.filter({ hasText: 'Підготувати презентацію' })).toBeVisible();

  // Step 8
  await toggleAll.click();
  await expect(todoItems.getByRole('checkbox').first()).toBeChecked();

  // Step 9
  await page.getByRole('link', { name: 'Completed', exact: true }).click();

  // Step 10
  await page.getByRole('button', { name: 'Clear completed' }).click();

  // Expected 2
  await expect(todoItems).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Clear completed' })).toBeHidden();
  await expect(page.getByRole('link', { name: 'All', exact: true })).toBeHidden();
  await expect(page.getByRole('link', { name: 'Completed', exact: true })).toBeHidden();
  await expect(itemsLeft).toBeHidden();

  // Step 11
  await newTodoInput.fill('Купити хліб');
  await newTodoInput.press('Enter');

  // Step 12
  await page.getByRole('link', { name: 'All', exact: true }).click();

  // Expected 3
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems.filter({ hasText: 'Купити хліб' })).toBeVisible();
  await expect(itemsLeft).toHaveText(/^1 item left!?$/i);
});
```