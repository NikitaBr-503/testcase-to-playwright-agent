```ts
import { test, expect } from '@playwright/test';

test('TODO-10 Фільтр активних завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByRole('listitem')).toHaveCount(0);

  const newTodo = page.getByPlaceholder('What needs to be done?');

  // Step 1
  await newTodo.fill('Купити молоко');
  await newTodo.press('Enter');

  // Step 2
  await newTodo.fill('Написати статтю');
  await newTodo.press('Enter');

  // Step 3
  await newTodo.fill('Подзвонити керівнику');
  await newTodo.press('Enter');

  const milk = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  const article = page.getByRole('listitem').filter({ hasText: 'Написати статтю' });
  const boss = page.getByRole('listitem').filter({ hasText: 'Подзвонити керівнику' });

  await expect(milk).toBeVisible();
  await expect(article).toBeVisible();
  await expect(boss).toBeVisible();

  // Step 4
  await article.getByRole('checkbox').check();

  // Step 5
  const activeFilter = page.getByRole('link', { name: 'Active' });
  await activeFilter.click();

  // Expected 1
  await expect(milk).toBeVisible();
  await expect(boss).toBeVisible();
  await expect(article).toBeHidden();

  // Expected 2
  await expect(page).toHaveURL(/#\/active$/);
  await expect(activeFilter).toHaveClass(/selected/);
});
```