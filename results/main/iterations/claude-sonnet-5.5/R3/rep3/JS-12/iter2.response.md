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
  await page.getByRole('menuitem', { name: /login/i }).click();

  // Step 4
  await page.getByRole('textbox', { name: /email/i }).fill('qa_user@example.com');

  // Expected 1
  await expect(page.getByRole('button', { name: 'Login', exact: true })).toBeDisabled();

  // Expected 2
  await expect(page).toHaveURL(/\/#\/login/);
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
});
```

The failure was in Step 3: the menu item's accessible name is "Go to login page", with lowercase "login", so the case-sensitive `/Login/` never matched. I changed the locator to `/login/i`.

I also changed the "Log in" button locator, which the earlier run never reached. I believe its accessible name comes from `aria-label="Login"`, so I used `{ name: 'Login', exact: true }`. I'm working from memory of the Juice Shop markup here, not from a snapshot of the login page. The Email field is now found with `getByRole('textbox', { name: /email/i })`, and I have not run this version.