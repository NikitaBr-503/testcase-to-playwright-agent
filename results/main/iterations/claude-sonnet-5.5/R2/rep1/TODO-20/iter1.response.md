```ts
import { test, expect } from '@playwright/test';

test('TODO-20 Масове позначення, видалення і додавання завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodo = page.getByPlaceholder('What needs to be done?');
  const items = page.locator('.todo-list li');
  const clearCompleted = page.getByRole('button', { name: 'Clear completed' });
  const toggleAll = page.getByLabel('Mark all as complete');
  await expect(newTodo).toBeVisible();
  await expect(items).toHaveCount(0);

  // Step 1
  await newTodo.fill('Купити молоко');
  await newTodo.press('Enter');
  await expect(items).toHaveCount(1);

  // Step 2
  await newTodo.fill('Написати статтю');
  await newTodo.press('Enter');
  await expect(items).toHaveCount(2);

  // Step 3
  await newTodo.fill('Подзвонити керівнику');
  await newTodo.press('Enter');
  await expect(items).toHaveCount(3);

  // Step 4
  await toggleAll.check();
  await expect(items.first().getByRole('checkbox')).toBeChecked();

  // Step 5
  await items.filter({ hasText: 'Написати статтю' }).getByRole('checkbox').uncheck();

  // Step 6
  await clearCompleted.click();

  // Expected 1
  await expect(items).toHaveCount(1);
  await expect(items.first()).toContainText('Написати статтю');
  await expect(page.getByText('Купити молоко')).toBeHidden();
  await expect(page.getByText('Подзвонити керівнику')).toBeHidden();

  // Step 7
  await newTodo.fill('Підготувати презентацію');
  await newTodo.press('Enter');
  await expect(items).toHaveCount(2);

  // Step 8
  await toggleAll.check();
  await expect(items.nth(0).getByRole('checkbox')).toBeChecked();
  await expect(items.nth(1).getByRole('checkbox')).toBeChecked();

  // Step 9
  await page.getByRole('link', { name: 'Completed' }).click();
  await expect(items).toHaveCount(2);

  // Step 10
  await clearCompleted.click();

  // Expected 2
  await expect(items).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'All' })).toBeHidden();
  await expect(page.getByRole('link', { name: 'Completed' })).toBeHidden();
  await expect(page.getByText(/items? left/)).toBeHidden();
  await expect(clearCompleted).toBeHidden();

  // Step 11
  await newTodo.fill('Купити хліб');
  await newTodo.press('Enter');

  // Step 12
  await page.getByRole('link', { name: 'All' }).click();

  // Expected 3
  await expect(items).toHaveCount(1);
  await expect(items.first()).toContainText('Купити хліб');
  await expect(page.getByText('1 item left!')).toBeVisible();
});
```