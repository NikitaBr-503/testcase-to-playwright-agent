```ts
import { test, expect } from '@playwright/test';

test('TODO-01 Додавання одного завдання', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByRole('textbox', { name: 'New Todo Input' })).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  const newTodoInput = page.getByRole('textbox', { name: 'New Todo Input' });
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');

  // Expected 1
  await expect(page.getByRole('listitem').filter({ hasText: 'Купити молоко' })).toBeVisible();

  // Expected 2
  await expect(page.getByText('1 item left!')).toBeVisible();
});
```