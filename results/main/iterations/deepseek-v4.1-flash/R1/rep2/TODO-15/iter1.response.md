```ts
import { test, expect } from '@playwright/test';

test('TODO-15 Зняття позначки з усіх завдань', async ({ page }) => {
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  const toggleAll = page.locator('label[for="toggle-all"]');
  const todoItems = page.locator('.todo-list li');
  const completedItems = page.locator('.todo-list li.completed');
  const itemToggles = page.locator('.todo-list li .toggle');

  // Preconditions
  await page.goto('/');
  await expect(newTodoInput).toBeVisible();
  await expect(todoItems).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');
  await expect(page.getByText('Купити молоко')).toBeVisible();

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');
  await expect(page.getByText('Написати статтю')).toBeVisible();
  await expect(todoItems).toHaveCount(2);

  // Step 3
  await toggleAll.click();
  await expect(completedItems).toHaveCount(2);

  // Step 4
  await toggleAll.click();

  // Expected 1
  await expect(completedItems).toHaveCount(0);
  await expect(itemToggles).toHaveCount(2);
  await expect(itemToggles.nth(0)).not.toBeChecked();
  await expect(itemToggles.nth(1)).not.toBeChecked();

  // Expected 2
  await expect(page.getByText(/^2 items left!?$/)).toBeVisible();
});
```