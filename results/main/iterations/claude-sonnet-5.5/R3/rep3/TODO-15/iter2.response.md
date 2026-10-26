The toggle-all control is exposed as a checkbox named "❯ Toggle All Input", so `getByLabel('Mark all as complete')` never matched. I switched to `getByRole('checkbox', { name: 'Toggle All Input' })`, which matches by substring. The checkbox may be visually hidden behind the arrow label, so I use `check()` and `uncheck()`, which act on the checkbox state. If the input is not clickable, the arrow label is the fallback, and Playwright's actionability checks may complain about that too. To be safe I click the control itself, as the test case describes.


<parent>
```ts
import { test, expect } from '@playwright/test';

test('TODO-15: Зняття позначки з усіх завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const input = page.getByPlaceholder('What needs to be done?');
  await expect(input).toBeVisible();

  // Step 1
  await input.fill('Купити молоко');
  await input.press('Enter');
  const firstItem = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  await expect(firstItem).toBeVisible();

  // Step 2
  await input.fill('Написати статтю');
  await input.press('Enter');
  const secondItem = page.getByRole('listitem').filter({ hasText: 'Написати статтю' });
  await expect(secondItem).toBeVisible();

  // Step 3
  const toggleAll = page.getByRole('checkbox', { name: 'Toggle All Input' });
  await toggleAll.click();
  await expect(firstItem.getByRole('checkbox')).toBeChecked();
  await expect(secondItem.getByRole('checkbox')).toBeChecked();

  // Step 4
  await toggleAll.click();

  // Expected 1
  await expect(firstItem.getByRole('checkbox')).not.toBeChecked();
  await expect(secondItem.getByRole('checkbox')).not.toBeChecked();

  // Expected 2
  await expect(page.getByText('2 items left!')).toBeVisible();
});
```
</parent>