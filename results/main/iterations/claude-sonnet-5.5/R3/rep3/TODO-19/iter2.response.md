The failure came from the `listitem` locator in the assertions. The filter links at the bottom are also `<li>` elements, so `getByRole('listitem')` matched 4 elements instead of 1. The fix is to scope the todo items to the todo list inside `main`.

The page, as shown by the failure snapshot, already matches the expected result: only «Написати статтю» is shown with "1 item left!". I did not need to change the step logic, only how the items are located.

The snapshot also shows that the todo list sits inside `main`, so `page.getByRole('main').getByRole('listitem')` selects only todos. The edit field is likely labelled "Edit", as before, but to be safe I locate it as the textbox within the item being edited.

```ts
import { test, expect } from '@playwright/test';

test('TODO-19: Редагування завдання у фільтрі «Active»', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodo = page.getByPlaceholder('What needs to be done?');
  await expect(newTodo).toBeVisible();

  const items = page.getByRole('main').getByRole('listitem');

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
  await items
    .filter({ hasText: 'Купити молоко' })
    .getByRole('checkbox')
    .click();

  // Step 5
  await page.getByRole('link', { name: 'Active' }).click();

  // Step 6
  await page.getByText('Подзвонити керівнику').dblclick();

  // Step 7
  const editInput = items.getByRole('textbox');
  await expect(editInput).toBeVisible();
  await editInput.fill('Подзвонити науковому керівнику');

  // Step 8
  await editInput.press('Enter');

  // Step 9
  await items
    .filter({ hasText: 'Подзвонити науковому керівнику' })
    .getByRole('checkbox')
    .click();

  // Expected 1
  await expect(items).toHaveCount(1);
  await expect(items.first()).toContainText('Написати статтю');

  // Step 10
  await page.getByRole('link', { name: 'Completed' }).click();

  // Expected 2
  await expect(items).toHaveCount(2);
  await expect(items.filter({ hasText: 'Купити молоко' })).toHaveCount(1);
  await expect(items.filter({ hasText: 'Подзвонити науковому керівнику' })).toHaveCount(1);

  // Step 11
  await page.getByRole('link', { name: 'All' }).click();

  // Expected 3
  await expect(page.getByText('1 item left!')).toBeVisible();
});
```