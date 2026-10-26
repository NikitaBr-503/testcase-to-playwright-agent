```ts
import { test, expect } from '@playwright/test';

test('TODO-16: Кнопка очищення відсутня без виконаних завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByPlaceholder('What needs to be done?')).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  const input = page.getByPlaceholder('What needs to be done?');

  // Step 1
  await input.fill('Купити молоко');
  await input.press('Enter');

  // Expected 1
  await expect(page.getByText('Купити молоко')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Clear completed' })).toHaveCount(0);

  // Step 2
  await input.fill('Написати статтю');
  await input.press('Enter');

  // Expected 2
  await expect(page.getByText('Написати статтю')).toBeVisible();
  await expect(page.getByText('2 items left!')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Clear completed' })).toHaveCount(0);
});
```