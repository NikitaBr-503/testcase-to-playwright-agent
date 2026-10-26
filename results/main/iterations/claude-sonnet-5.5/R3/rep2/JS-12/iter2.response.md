The failure came from the button locator. The accessible name of the login button is "Login", not "Log in", even though its visible text is "Log in". The snapshot shows `button "Login" [disabled]: Log in`, which means the name comes from an aria-label. The "Log in with Google" button is named "Login with Google", so a name match on "Login" would also match it. I'm using `exact: true` to avoid that.

```ts
import { test, expect } from '@playwright/test';

test('JS-12: Кнопка входу недоступна без пароля', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are already dismissed; the user is not logged in.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByLabel('Email').fill('qa_user@example.com');

  // Expected 1
  await expect(page.getByRole('button', { name: 'Login', exact: true })).toBeDisabled();

  // Expected 2
  await expect(page).toHaveURL(/\/#\/login/);
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
});
```