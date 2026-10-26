```ts
import { test, expect } from '@playwright/test';

test('TODO-14 Позначення всіх завдань виконаними', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();
  await expect(page.getByPlaceholder('What needs to be done?')).toBeVisible();
  await expect(page.getByRole('main').getByRole('listitem')).toHaveCount(0);

  const newTodo = page.getByPlaceholder('What needs to be done?');

  // Step 1
  await newTodo.fill('Купити молоко');
  await newTodo.press('Enter');
  await expect(
    page.getByRole('main').getByRole('listitem').filter({ hasText: 'Купити молоко' })
  ).toBeVisible();

  // Step 2
  await newTodo.fill('Написати статтю');
  await newTodo.press('Enter');
  await expect(
    page.getByRole('main').getByRole('listitem').filter({ hasText: 'Написати статтю' })
  ).toBeVisible();

  // Step 3
  await newTodo.fill('Подзвонити керівнику');
  await newTodo.press('Enter');
  await expect(
    page.getByRole('main').getByRole('listitem').filter({ hasText: 'Подзвонити керівнику' })
  ).toBeVisible();

  // Step 4
  // The "toggle all" control is the arrow to the left of the "What needs to be done?" input.
  await page.getByRole('main').getByRole('checkbox', { name: /Toggle All/ }).click();

  // Expected 1
  const items = page.getByRole('main').getByRole('listitem');
  await expect(items).toHaveCount(3);
  for (const text of ['Купити молоко', 'Написати статтю', 'Подзвонити керівнику']) {
    const item = items.filter({ hasText: text });
    await expect(item).toHaveClass(/completed/);
    await expect(item.getByRole('checkbox')).toBeChecked();
  }

  // Expected 2
  await expect(page.getByText('0 items left!')).toBeVisible();
});
```