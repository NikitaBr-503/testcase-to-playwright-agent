```ts
import { test, expect } from '@playwright/test';

test('TODO-14 Позначення всіх завдань виконаними', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const input = page.getByPlaceholder('What needs to be done?');
  await expect(input).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  await input.fill('Купити молоко');
  await input.press('Enter');

  // Step 2
  await input.fill('Написати статтю');
  await input.press('Enter');

  // Step 3
  await input.fill('Подзвонити керівнику');
  await input.press('Enter');

  await expect(page.getByRole('listitem').filter({ hasText: 'Купити молоко' })).toBeVisible();
  await expect(page.getByRole('listitem').filter({ hasText: 'Написати статтю' })).toBeVisible();
  await expect(page.getByRole('listitem').filter({ hasText: 'Подзвонити керівнику' })).toBeVisible();

  // Step 4
  await page.locator('label[for="toggle-all"]').click();

  // Expected 1
  await expect(page.getByRole('listitem').filter({ hasText: 'Купити молоко' })).toHaveClass(/completed/);
  await expect(page.getByRole('listitem').filter({ hasText: 'Написати статтю' })).toHaveClass(/completed/);
  await expect(page.getByRole('listitem').filter({ hasText: 'Подзвонити керівнику' })).toHaveClass(/completed/);

  // Expected 2
  await expect(page.getByText('0 items left!')).toBeVisible();
});
```