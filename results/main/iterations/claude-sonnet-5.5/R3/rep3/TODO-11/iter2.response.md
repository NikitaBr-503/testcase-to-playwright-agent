The `listitem` role also matches the three filter links, so the count came out as 6. I now scope the todo items to the `main` list, which excludes the filter list in the footer. The checkbox is located inside the item that contains the matching text.

```ts
import { test, expect } from '@playwright/test';

test('TODO-11: Фільтр виконаних завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const input = page.getByPlaceholder('What needs to be done?');
  await expect(input).toBeVisible();
  const items = page.getByRole('main').getByRole('listitem');
  await expect(items).toHaveCount(0);

  // Step 1
  await input.fill('Купити молоко');
  await input.press('Enter');

  // Step 2
  await input.fill('Написати статтю');
  await input.press('Enter');

  // Step 3
  await input.fill('Подзвонити керівнику');
  await input.press('Enter');
  await expect(items).toHaveCount(3);

  // Step 4
  const article = items.filter({ hasText: 'Написати статтю' });
  await article.getByRole('checkbox').check();

  // Step 5
  await page.getByRole('link', { name: 'Completed' }).click();

  // Expected 1
  await expect(items).toHaveCount(1);
  await expect(items.filter({ hasText: 'Написати статтю' })).toBeVisible();
  await expect(page.getByText('Купити молоко')).toHaveCount(0);
  await expect(page.getByText('Подзвонити керівнику')).toHaveCount(0);

  // Expected 2
  await expect(page).toHaveURL(/#\/completed$/);
});
```