import { test, expect } from '../../../../../support/fixtures';
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
  const title = items.locator('label');
  await expect(title).toHaveCount(1);
  await expect(title).toHaveText(/^Купити хліб$/);
  const text = await title.textContent();
  expect(text).toBe('Купити хліб');

  // Expected 2
  await expect(input).toHaveValue('');
});
