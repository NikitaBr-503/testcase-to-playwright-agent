```ts
import { test, expect } from '@playwright/test';

test('TODO-03: Порожнє завдання не додається', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const input = page.getByPlaceholder('What needs to be done?');
  await expect(input).toBeVisible();
  await expect(page.getByTestId('todo-item')).toHaveCount(0);

  // Step 1
  await input.fill('   ');
  await input.press('Enter');

  // Expected 1
  await expect(page.getByRole('listitem').filter({ has: page.getByRole('checkbox') })).toHaveCount(0);
  await expect(page.getByTestId('todo-item')).toHaveCount(0);

  // Expected 2
  // The footer may remain in the DOM but hidden, so verify it is not visible to the user.
  await expect(page.getByText(/\d+ items? left/)).toBeHidden();
  await expect(page.getByRole('link', { name: 'All' })).toBeHidden();
  await expect(page.getByRole('link', { name: 'Active' })).toBeHidden();
  await expect(page.getByRole('link', { name: 'Completed' })).toBeHidden();
});
```