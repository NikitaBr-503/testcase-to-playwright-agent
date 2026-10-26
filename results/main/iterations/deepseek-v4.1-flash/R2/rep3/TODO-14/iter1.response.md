```ts
import { test, expect } from '@playwright/test';

test('TODO-14 Позначення всіх завдань виконаними', async ({ page }) => {
  const todos = ['Купити молоко', 'Написати статтю', 'Подзвонити керівнику'];

  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');

  // Step 3
  await newTodoInput.fill('Подзвонити керівнику');
  await newTodoInput.press('Enter');

  await expect(page.getByRole('listitem')).toHaveCount(3);

  // Step 4
  await page.locator('label[for="toggle-all"]').click();

  // Expected 1
  for (const title of todos) {
    await expect(
      page.getByRole('listitem').filter({ hasText: title })
    ).toHaveClass(/completed/);
  }
  await expect(page.locator('.toggle-all')).toBeChecked();

  // Expected 2
  await expect(page.getByText(/0 items left/)).toBeVisible();
});
```