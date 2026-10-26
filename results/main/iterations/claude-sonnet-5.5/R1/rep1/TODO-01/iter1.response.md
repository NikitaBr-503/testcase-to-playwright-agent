```ts
import { test, expect } from '@playwright/test';

test('TODO-01 Додавання одного завдання', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByTestId('todo-item')).toHaveCount(0);

  // Step 1
  const input = page.getByPlaceholder('What needs to be done?');
  await input.fill('Купити молоко');
  await input.press('Enter');

  // Expected 1
  await expect(page.getByText('Купити молоко')).toBeVisible();
  await expect(page.getByTestId('todo-item')).toHaveCount(1);

  // Expected 2
  await expect(page.getByText('1 item left!')).toBeVisible();
});
```