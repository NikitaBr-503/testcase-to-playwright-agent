```ts
import { test, expect } from '@playwright/test';

test('TODO-04: Обрізання пробілів на початку і в кінці завдання', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const input = page.getByPlaceholder('What needs to be done?');
  await expect(input).toBeVisible();
  // Todo items live inside the main region; the filter links are also listitems, so scope the locator
  const items = page.getByRole('main').getByRole('listitem');
  await expect(items).toHaveCount(0);

  // Step 1
  await input.fill('   Купити хліб   ');
  await input.press('Enter');

  // Expected 1
  await expect(items).toHaveCount(1);
  // Regex is matched against the raw text, so leading/trailing spaces would fail the assertion
  await expect(items.locator('label')).toHaveText(/^Купити хліб$/);

  // Expected 2
  await expect(input).toHaveValue('');
});
```