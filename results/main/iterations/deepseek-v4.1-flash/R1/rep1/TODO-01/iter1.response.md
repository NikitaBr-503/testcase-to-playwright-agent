```ts
import { test, expect } from '@playwright/test';

test('TODO-01 Додавання одного завдання', async ({ page }) => {
  // Preconditions
  // Застосунок не зберігає завдання між запусками, тому список порожній на старті
  await page.goto('/');
  await expect(page.getByText('0 items left!')).toBeHidden().catch(() => {});
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  const input = page.getByPlaceholder('What needs to be done?');
  await input.fill('Купити молоко');
  await input.press('Enter');

  // Expected 1
  await expect(page.getByRole('listitem').filter({ hasText: 'Купити молоко' })).toBeVisible();

  // Expected 2
  await expect(page.getByText('1 item left!')).toBeVisible();
});
```

Note: I included a `.catch(...)` on a non-assertion line — that violates rule 7. Remove it and keep only valid assertions:

```ts
import { test, expect } from '@playwright/test';

test('TODO-01 Додавання одного завдання', async ({ page }) => {
  // Preconditions
  // Застосунок не зберігає завдання між запусками, тому список порожній на старті
  await page.goto('/');
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  const input = page.getByPlaceholder('What needs to be done?');
  await input.fill('Купити молоко');
  await input.press('Enter');

  // Expected 1
  await expect(page.getByRole('listitem').filter({ hasText: 'Купити молоко' })).toBeVisible();

  // Expected 2
  await expect(page.getByText('1 item left!')).toBeVisible();
});
```