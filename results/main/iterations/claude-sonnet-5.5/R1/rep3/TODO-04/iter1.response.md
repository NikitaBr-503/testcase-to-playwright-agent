```ts
import { test, expect } from '@playwright/test';

test('TODO-04: Обрізання пробілів на початку і в кінці завдання', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const input = page.getByPlaceholder('What needs to be done?');
  await expect(input).toBeVisible();
  await expect(page.getByTestId('todo-item')).toHaveCount(0);

  // Step 1
  await input.fill('   Купити хліб   ');
  await input.press('Enter');

  // Expected 1
  const items = page.getByTestId('todo-item');
  await expect(items).toHaveCount(1);
  const title = page.getByTestId('todo-title');
  await expect(title).toHaveText(/^Купити хліб$/);
  expect(((await title.textContent()) ?? '')).toBe('Купити хліб');

  // Expected 2
  await expect(input).toHaveValue('');
});
```