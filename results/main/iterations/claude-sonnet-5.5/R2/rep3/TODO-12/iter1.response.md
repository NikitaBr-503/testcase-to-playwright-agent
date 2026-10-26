```ts
import { test, expect } from '@playwright/test';

test('TODO-12 Повернення до перегляду всіх завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByPlaceholder('What needs to be done?')).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  const input = page.getByPlaceholder('What needs to be done?');

  // Step 1
  await input.fill('Купити молоко');
  await input.press('Enter');

  // Step 2
  await input.fill('Написати статтю');
  await input.press('Enter');

  // Step 3
  await page
    .getByRole('listitem')
    .filter({ hasText: 'Купити молоко' })
    .getByRole('checkbox')
    .check();

  // Step 4
  await page.getByRole('link', { name: 'Completed' }).click();

  // Step 5
  await page.getByRole('link', { name: 'All' }).click();

  // Expected 1
  await expect(page.getByText('Купити молоко')).toBeVisible();
  await expect(page.getByText('Написати статтю')).toBeVisible();
  await expect(page.getByRole('listitem').filter({ hasText: 'Купити молоко' })).toBeVisible();
  await expect(page.getByRole('listitem').filter({ hasText: 'Написати статтю' })).toBeVisible();

  // Expected 2
  await expect(page.getByText('1 item left!')).toBeVisible();
});
```