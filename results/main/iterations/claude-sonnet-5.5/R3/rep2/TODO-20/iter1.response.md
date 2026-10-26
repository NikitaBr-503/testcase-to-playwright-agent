```ts
import { test, expect } from '@playwright/test';

test('TODO-20: Масове позначення, видалення і додавання завдань', async ({ page }) => {
  const newTodo = page.getByPlaceholder('What needs to be done?');
  const items = page.locator('.todo-list li');
  const toggleAll = page.locator('label[for="toggle-all"]');
  const clearCompleted = page.getByRole('button', { name: 'Clear completed' });
  const counter = page.locator('.todo-count');

  // Preconditions
  await page.goto('/');
  await expect(newTodo).toBeVisible();
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
  await expect(items).toHaveCount(3);

  // Step 4
  await toggleAll.click();
  await expect(items.locator('input.toggle, input[type="checkbox"]')).toHaveCount(3);
  for (const item of await items.all()) {
    await expect(item.getByRole('checkbox')).toBeChecked();
  }

  // Step 5
  const articleItem = items.filter({ hasText: 'Написати статтю' });
  await articleItem.getByRole('checkbox').uncheck();

  // Step 6
  await clearCompleted.click();

  // Expected 1
  await expect(items).toHaveCount(1);
  await expect(items.first()).toContainText('Написати статтю');
  await expect(page.getByText('Купити молоко')).toHaveCount(0);
  await expect(page.getByText('Подзвонити керівнику')).toHaveCount(0);

  // Step 7
  await newTodo.fill('Підготувати презентацію');
  await newTodo.press('Enter');
  await expect(items).toHaveCount(2);

  // Step 8
  await toggleAll.click();
  for (const item of await items.all()) {
    await expect(item.getByRole('checkbox')).toBeChecked();
  }

  // Step 9
  await page.getByRole('link', { name: 'Completed' }).click();
  await expect(items).toHaveCount(2);

  // Step 10
  await clearCompleted.click();

  // Expected 2
  await expect(items).toHaveCount(0);
  await expect(counter).toBeHidden();
  await expect(clearCompleted).toBeHidden();
  await expect(page.getByRole('link', { name: 'All' })).toBeHidden();
  await expect(page.getByRole('link', { name: 'Active' })).toBeHidden();
  await expect(page.getByRole('link', { name: 'Completed' })).toBeHidden();

  // Step 11
  await newTodo.fill('Купити хліб');
  await newTodo.press('Enter');

  // Step 12
  await page.getByRole('link', { name: 'All' }).click();

  // Expected 3
  await expect(items).toHaveCount(1);
  await expect(items.first()).toContainText('Купити хліб');
  await expect(counter).toContainText('1 item left!');
});
```