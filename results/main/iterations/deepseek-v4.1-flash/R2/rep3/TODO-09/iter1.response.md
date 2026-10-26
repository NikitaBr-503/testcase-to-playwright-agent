```ts
import { test, expect } from '@playwright/test';

test('TODO-09 Видалення завдання через очищення тексту під час редагування', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');

  // Step 3
  await page.getByText('Купити молоко', { exact: true }).dblclick();

  // Step 4
  const editInput = page.locator('input.edit');
  await expect(editInput).toBeVisible();
  await editInput.fill('');

  // Step 5
  await editInput.press('Enter');

  // Expected 1
  await expect(page.getByRole('listitem').filter({ hasText: 'Купити молоко' })).toHaveCount(0);

  // Expected 2
  await expect(page.getByRole('listitem')).toHaveCount(1);
  await expect(page.getByText('Написати статтю', { exact: true })).toBeVisible();
  await expect(page.getByText('1 item left!', { exact: true })).toBeVisible();
});
```