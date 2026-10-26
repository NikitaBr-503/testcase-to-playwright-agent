```ts
import { test, expect } from '@playwright/test';

test('TODO-20 Масове позначення, видалення і додавання завдань', async ({ page }) => {
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  const todoItems = page.getByRole('listitem');
  const toggleAllButton = page.locator('.toggle-all');
  const clearCompletedButton = page.getByRole('button', { name: 'Clear completed' });
  const footer = page.locator('footer, .footer');

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

  // Step 3
  await newTodoInput.fill('Подзвонити керівнику');
  await newTodoInput.press('Enter');
  await expect(page.getByText('Подзвонити керівнику')).toBeVisible();
  await expect(todoItems).toHaveCount(3);

  // Step 4
  await toggleAllButton.click();
  await expect(todoItems.getByRole('checkbox').nth(0)).toBeChecked();
  await expect(todoItems.getByRole('checkbox').nth(1)).toBeChecked();
  await expect(todoItems.getByRole('checkbox').nth(2)).toBeChecked();

  // Step 5
  const articleItem = todoItems.filter({ hasText: 'Написати статтю' });
  await articleItem.getByRole('checkbox').click();
  await expect(articleItem.getByRole('checkbox')).not.toBeChecked();

  // Step 6
  await clearCompletedButton.click();

  // Expected 1
  await expect(todoItems).toHaveCount(1);
  await expect(page.getByText('Написати статтю')).toBeVisible();
  await expect(page.getByText('Купити молоко')).toHaveCount(0);
  await expect(page.getByText('Подзвонити керівнику')).toHaveCount(0);

  // Step 7
  await newTodoInput.fill('Підготувати презентацію');
  await newTodoInput.press('Enter');
  await expect(page.getByText('Підготувати презентацію')).toBeVisible();

  // Step 8
  await toggleAllButton.click();
  await expect(todoItems.getByRole('checkbox').nth(0)).toBeChecked();
  await expect(todoItems.getByRole('checkbox').nth(1)).toBeChecked();

  // Step 9
  await page.getByText('Completed', { exact: true }).click();

  // Step 10
  await clearCompletedButton.click();

  // Expected 2
  await expect(todoItems).toHaveCount(0);
  await expect(footer).not.toBeVisible();

  // Step 11
  await newTodoInput.fill('Купити хліб');
  await newTodoInput.press('Enter');

  // Step 12
  await page.getByText('All', { exact: true }).click();

  // Expected 3
  await expect(todoItems).toHaveCount(1);
  await expect(page.getByText('Купити хліб')).toBeVisible();
  await expect(page.getByText('1 item left')).toBeVisible();
});
```