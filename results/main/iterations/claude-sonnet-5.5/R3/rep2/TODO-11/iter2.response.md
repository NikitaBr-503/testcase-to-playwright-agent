The failure came from the `listitem` role also matching the filter links (All, Active, Completed), which are in `<li>` elements. That made 3 todos plus 3 filter items, so the count was 6. I scoped the todo locators to the `main` region (`page.getByRole('main').getByRole('listitem')`), which holds only the todos.

```ts
import { test, expect } from '@playwright/test';

test('TODO-11: Фільтр виконаних завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const input = page.getByPlaceholder('What needs to be done?');
  await expect(input).toBeVisible();
  const todoItems = page.getByRole('main').getByRole('listitem');
  await expect(todoItems).toHaveCount(0);

  // Step 1
  await input.fill('Купити молоко');
  await input.press('Enter');

  // Step 2
  await input.fill('Написати статтю');
  await input.press('Enter');

  // Step 3
  await input.fill('Подзвонити керівнику');
  await input.press('Enter');
  await expect(todoItems).toHaveCount(3);

  // Step 4
  const article = todoItems.filter({ hasText: 'Написати статтю' });
  await article.getByRole('checkbox').check();

  // Step 5
  await page.getByRole('link', { name: 'Completed' }).click();

  // Expected 1
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems.filter({ hasText: 'Написати статтю' })).toBeVisible();
  await expect(page.getByText('Купити молоко')).toHaveCount(0);
  await expect(page.getByText('Подзвонити керівнику')).toHaveCount(0);

  // Expected 2
  await expect(page).toHaveURL(/#\/completed$/);
});
```