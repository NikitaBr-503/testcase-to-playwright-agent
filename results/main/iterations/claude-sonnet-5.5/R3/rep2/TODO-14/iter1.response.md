```ts
import { test, expect } from '@playwright/test';

test('TODO-14: Позначення всіх завдань виконаними', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodo = page.getByPlaceholder('What needs to be done?');
  await expect(newTodo).toBeVisible();

  const titles = ['Купити молоко', 'Написати статтю', 'Подзвонити керівнику'];

  // Step 1
  await newTodo.fill(titles[0]);
  await newTodo.press('Enter');
  await expect(page.getByRole('listitem').filter({ hasText: titles[0] })).toBeVisible();

  // Step 2
  await newTodo.fill(titles[1]);
  await newTodo.press('Enter');
  await expect(page.getByRole('listitem').filter({ hasText: titles[1] })).toBeVisible();

  // Step 3
  await newTodo.fill(titles[2]);
  await newTodo.press('Enter');
  await expect(page.getByRole('listitem').filter({ hasText: titles[2] })).toBeVisible();

  // Step 4
  await page.getByLabel(/Toggle All Input|Mark all as complete/).check();

  // Expected 1
  for (const title of titles) {
    await expect(page.getByRole('listitem').filter({ hasText: title })).toHaveClass(/completed/);
  }

  // Expected 2
  await expect(page.getByText('0 items left!')).toBeVisible();
});
```