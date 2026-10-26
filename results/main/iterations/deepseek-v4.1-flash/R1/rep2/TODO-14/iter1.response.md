```ts
import { test, expect } from '@playwright/test';

test('TODO-14: Позначення всіх завдань виконаними', async ({ page }) => {
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

  const todoItems = page.getByRole('listitem');
  await expect(todoItems).toHaveCount(3);

  // Step 4
  // The "toggle all" control is the arrow to the left of the input. In TodoMVC it is an
  // unlabeled checkbox, so no accessible name exists and its stable class is used.
  await page.locator('.toggle-all').click({ force: true });

  // Expected 1
  for (const title of ['Купити молоко', 'Написати статтю', 'Подзвонити керівнику']) {
    const item = todoItems.filter({ hasText: title });
    await expect(item).toHaveCount(1);
    await expect(item).toHaveClass(/completed/);
    await expect(item.getByRole('checkbox')).toBeChecked();
  }

  // Expected 2
  await expect(page.getByText('0 items left!')).toBeVisible();
});
```