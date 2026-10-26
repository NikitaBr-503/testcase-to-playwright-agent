```ts
import { test, expect } from '@playwright/test';

test('TODO-17: Видалення виконаного завдання у фільтрі «Completed»', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const input = page.getByPlaceholder('What needs to be done?');
  await expect(input).toBeVisible();

  const items = page.getByRole('listitem');
  const milk = items.filter({ hasText: 'Купити молоко' });
  const article = items.filter({ hasText: 'Написати статтю' });

  // Step 1
  await input.fill('Купити молоко');
  await input.press('Enter');
  await expect(milk).toBeVisible();

  // Step 2
  await input.fill('Написати статтю');
  await input.press('Enter');
  await expect(article).toBeVisible();

  // Step 3
  await input.fill('Подзвонити керівнику');
  await input.press('Enter');
  await expect(items.filter({ hasText: 'Подзвонити керівнику' })).toBeVisible();

  // Step 4
  await milk.getByRole('checkbox').check();
  await expect(milk.getByRole('checkbox')).toBeChecked();

  // Step 5
  await article.getByRole('checkbox').check();
  await expect(article.getByRole('checkbox')).toBeChecked();

  // Step 6
  await page.getByRole('link', { name: 'Completed' }).click();
  await expect(milk).toBeVisible();
  await expect(article).toBeVisible();

  // Step 7
  await milk.hover();
  await milk.getByRole('button').click();

  // Expected 1
  await expect(milk).toHaveCount(0);
  await expect(items).toHaveCount(1);
  await expect(items.first()).toContainText('Написати статтю');

  // Expected 2
  await expect(page.getByText('1 item left!')).toBeVisible();
});
```