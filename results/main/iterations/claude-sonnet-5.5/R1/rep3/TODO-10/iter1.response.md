```ts
import { test, expect } from '@playwright/test';

test('TODO-10 Фільтр активних завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const input = page.getByPlaceholder('What needs to be done?');
  await expect(input).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  await input.fill('Купити молоко');
  await input.press('Enter');
  await expect(page.getByText('Купити молоко')).toBeVisible();

  // Step 2
  await input.fill('Написати статтю');
  await input.press('Enter');
  await expect(page.getByText('Написати статтю')).toBeVisible();

  // Step 3
  await input.fill('Подзвонити керівнику');
  await input.press('Enter');
  await expect(page.getByText('Подзвонити керівнику')).toBeVisible();

  // Step 4
  const articleItem = page.getByRole('listitem').filter({ hasText: 'Написати статтю' });
  await articleItem.getByRole('checkbox').check();
  await expect(articleItem.getByRole('checkbox')).toBeChecked();

  // Step 5
  const activeFilter = page.getByRole('link', { name: 'Active' });
  await activeFilter.click();

  // Expected 1
  await expect(page.getByRole('listitem')).toHaveCount(2);
  await expect(page.getByRole('listitem').filter({ hasText: 'Купити молоко' })).toBeVisible();
  await expect(page.getByRole('listitem').filter({ hasText: 'Подзвонити керівнику' })).toBeVisible();
  await expect(page.getByText('Написати статтю')).toHaveCount(0);

  // Expected 2
  await expect(page).toHaveURL(/#\/active$/);
  await expect(activeFilter).toHaveClass(/selected/);
});
```