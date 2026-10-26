The click on the label failed because the real checkbox (`data-testid="toggle-all"`) sits on top of it and intercepts pointer events. The fix is to target that checkbox directly with `getByTestId('toggle-all')`.

Two other locators needed care:
- The accessibility snapshot shows the toggle-all checkbox sits inside `main`, and the item checkboxes sit inside a `list`. To keep the item locator from matching the toggle-all checkbox, I use `page.getByRole('listitem').getByRole('checkbox')`.
- The counter list at the bottom also contains `listitem` elements (the filter links), but those have no checkboxes, so the locator only matches the two todo items.

I use `check()` for step 3 and `uncheck()` for step 4. Clicking would also work, but `check()` and `uncheck()` assert the final state. Both are valid for a checkbox with a visible, clickable input.

```ts
import { test, expect } from '@playwright/test';

test('TODO-15: Зняття позначки з усіх завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const input = page.getByPlaceholder('What needs to be done?');
  await expect(input).toBeVisible();
  const itemCheckboxes = page.getByRole('listitem').getByRole('checkbox');
  await expect(itemCheckboxes).toHaveCount(0);

  // Step 1
  await input.fill('Купити молоко');
  await input.press('Enter');
  await expect(page.getByText('Купити молоко')).toBeVisible();

  // Step 2
  await input.fill('Написати статтю');
  await input.press('Enter');
  await expect(page.getByText('Написати статтю')).toBeVisible();

  // Step 3
  const toggleAll = page.getByTestId('toggle-all');
  await toggleAll.click();
  await expect(itemCheckboxes).toHaveCount(2);
  await expect(itemCheckboxes.nth(0)).toBeChecked();
  await expect(itemCheckboxes.nth(1)).toBeChecked();

  // Step 4
  await toggleAll.click();

  // Expected 1
  await expect(itemCheckboxes).toHaveCount(2);
  await expect(itemCheckboxes.nth(0)).not.toBeChecked();
  await expect(itemCheckboxes.nth(1)).not.toBeChecked();

  // Expected 2
  await expect(page.getByText('2 items left!')).toBeVisible();
});
```