```ts
import { test, expect } from '@playwright/test';

test('TODO-16 Кнопка очищення відсутня без виконаних завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');
  await expect(page.getByText('Купити молоко')).toBeVisible();

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');
  await expect(page.getByText('Написати статтю')).toBeVisible();

  // Expected 1
  await expect(page.getByRole('button', { name: 'Clear completed' })).toBeHidden();

  // Expected 2
  const itemsLeftCounter = page.getByText(/items left/);
  await expect(itemsLeftCounter).toBeVisible();
  await expect(itemsLeftCounter).toHaveText(/2 items left!?/);
});
```