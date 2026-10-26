Convert the following manual test case into a Playwright test.

## Application
Base URL: http://localhost:3000
Start page: /
The welcome dialog and the cookie banner are already dismissed by the test environment.
Registered test user: email qa_user@example.com, password QaPassword123!,
security question "Your eldest siblings middle name?", answer Kyiv.
Prices are shown with the currency sign ¤, for example 1.99¤.

## Manual test case
ID: JS-16
Title: Видалення товару з кошика
Preconditions:
- Вітальне вікно і банер про cookies уже закриті (налаштування тестового середовища)
- Користувач qa_user@example.com зареєстрований
- Кошик користувача порожній
Steps:
1. Відкрити головну сторінку.
2. Натиснути кнопку «Account» у верхній панелі.
3. Обрати пункт «Login».
4. Ввести в поле «Email» значення «qa_user@example.com».
5. Ввести в поле «Password» значення «QaPassword123!».
6. Натиснути кнопку «Log in».
7. Натиснути кнопку «Add to Basket» на картці товару «Apple Juice (1000ml)».
8. Натиснути кнопку кошика «Your Basket» у верхній панелі.
9. Натиснути кнопку видалення (іконка кошика для сміття) у рядку товару «Apple Juice (1000ml)».
Expected results:
1. Товар «Apple Juice (1000ml)» зник зі списку кошика.
2. Лічильник на кнопці кошика показує 0.

## Accessibility snapshot of the start page (http://localhost:3000/)
This is how the start page looked before the test, in Playwright's ARIA snapshot format
(if the page opens with dialogs, a second snapshot shows the page after they were closed):
```yaml
- button "Open Sidenav"
- button "Back to homepage":
  - img "OWASP Juice Shop"
  - text: OWASP Juice Shop
- button "Open search"
- textbox
- button "Close search"
- button "Show/hide account menu": Account
- button "Show the shopping cart": Your Basket 0
- button "Language selection menu": EN
- main:
  - text: All Products
  - article:
    - button "Click for more information about the product":
      - img "Apple Juice (1000ml)"
      - text: Apple Juice (1000ml)
    - text: 1.99¤
    - button "Add to Basket"
  - article:
    - button "Click for more information about the product":
      - img "Apple Pomace"
      - text: Apple Pomace
    - text: 0.89¤
    - button "Add to Basket"
  - article:
    - button "Click for more information about the product":
      - img "Banana Juice (1000ml)"
      - text: Banana Juice (1000ml)
    - text: 1.99¤
    - button "Add to Basket"
  - article:
    - button "Click for more information about the product":
      - img "Basil Smoothie"
      - text: Basil Smoothie
    - text: 2.99¤
    - button "Add to Basket"
  - article:
    - button "Click for more information about the product":
      - img "Berry Juice (1000ml)"
      - text: Berry Juice (1000ml)
    - text: 3.49¤
    - button "Add to Basket"
  - article:
    - complementary: Only 1 left
    - button "Click for more information about the product":
      - img "Best Juice Shop Salesman Artwork"
      - text: Best Juice Shop Salesman Artwork
    - text: 5000¤
    - button "Add to Basket"
  - article:
    - button "Click for more information about the product":
      - img "Bragă (500ml)"
      - text: Bragă (500ml)
    - text: 2.49¤
    - button "Add to Basket"
  - article:
    - button "Click for more information about the product":
      - img "Carrot Juice (1000ml)"
      - text: Carrot Juice (1000ml)
    - text: 2.99¤
    - button "Add to Basket"
  - article:
    - button "Click for more information about the product":
      - img "Dragonfruit Juice (500ml)"
      - text: Dragonfruit Juice (500ml)
    - text: 3.99¤
    - button "Add to Basket"
  - article:
    - button "Click for more information about the product":
      - img "Eggfruit Juice (500ml)"
      - text: Eggfruit Juice (500ml)
    - text: 8.99¤
    - button "Add to Basket"
  - article:
    - button "Click for more information about the product":
      - img "Elderflower Cordial (500ml)"
      - text: Elderflower Cordial (500ml)
    - text: 3.29¤
    - button "Add to Basket"
  - article:
    - button "Click for more information about the product":
      - img "Fruit Press"
      - text: Fruit Press
    - text: 89.99¤
    - button "Add to Basket"
  - article:
    - button "Click for more information about the product":
      - img "Grape Juice (1000ml)"
      - text: Grape Juice (1000ml)
    - text: 2.99¤
    - button "Add to Basket"
  - article:
    - button "Click for more information about the product":
      - img "Green Smoothie"
      - text: Green Smoothie
    - text: 1.99¤
    - button "Add to Basket"
  - article:
    - complementary: Only 1 left
    - button "Click for more information about the product":
      - img "Juice Shop \"Permafrost\" 2020 Edition"
      - text: Juice Shop "Permafrost" 2020 Edition
    - text: 9999.99¤
    - button "Add to Basket"
  - group:
    - combobox "Items per page:": "15"
    - status: 1 – 15 of 46
    - button "Previous page" [disabled]
    - button "Next page"
- text: Language has been changed to English
- button "Force page reload"
```


## Previous attempt
Your previous test (attempt 4 of 5) failed when it was run.

```ts
import { test, expect } from '@playwright/test';

test('JS-16 Видалення товару з кошика', async ({ page }) => {
  const productName = 'Apple Juice (1000ml)';
  const userEmail = 'qa_user@example.com';
  const userPassword = 'QaPassword123!';

  // The basket button exposes its aria-label "Show the shopping cart"; the visible
  // label and the counter are part of its text content.
  const basketButton = page.getByRole('button', { name: /shopping cart/i });
  const accountButton = page.getByRole('button', { name: /account menu/i });
  const logoutItem = page.getByRole('menuitem', { name: /log\s*out/i });

  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // qa_user@example.com is a registered user and the basket must be empty.

  // Step 1
  await page.goto('/');
  await expect(page.getByRole('img', { name: productName })).toBeVisible();
  // Precondition check: the basket counter shows 0, i.e. the basket is empty
  await expect(basketButton).toBeVisible();
  await expect(basketButton).toContainText(/Your Basket\s*0/);

  // Step 2
  await accountButton.click();
  await expect(accountButton).toHaveAttribute('aria-expanded', 'true');

  // Step 3
  // The menu entry's accessible name is "Go to login page" (visible text "Login").
  await page.getByRole('menuitem', { name: /login/i }).click();
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

  // Step 4
  // The e-mail input has no <label>; its accessible name is
  // "Text field for the login email".
  const emailInput = page.getByRole('textbox', { name: /login email/i });
  await expect(emailInput).toBeVisible();
  await emailInput.fill(userEmail);

  // Step 5
  // The password input's accessible name is "Text field for the login password".
  const passwordInput = page.getByRole('textbox', { name: /login password/i });
  await expect(passwordInput).toBeVisible();
  await passwordInput.fill(userPassword);

  // Step 6
  const loginButton = page.getByRole('button', { name: 'Log in', exact: true });
  await expect(loginButton).toBeEnabled();
  await loginButton.click();
  // Verify the user is logged in: the account menu now offers "Logout".
  await expect(page).not.toHaveURL(/login/);
  await accountButton.click();
  await expect(logoutItem).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(logoutItem).toBeHidden();

  // Step 7
  const productCard = page.locator('article').filter({ hasText: productName });
  await expect(productCard).toBeVisible();
  await productCard.getByRole('button', { name: 'Add to Basket' }).click();
  await expect(basketButton).toContainText(/Your Basket\s*1/);

  // Step 8
  await basketButton.click();
  await expect(page).toHaveURL(/basket/);

  // Step 9
  const basketRow = page.getByRole('row').filter({ hasText: productName });
  await expect(basketRow).toBeVisible();
  // The delete (trash) button is the last button inside the product row.
  await basketRow.getByRole('button').last().click();

  // Expected 1
  await expect(page.getByRole('row').filter({ hasText: productName })).toHaveCount(0);
  await expect(page.getByRole('cell', { name: productName })).toHaveCount(0);

  // Expected 2
  await expect(basketButton).toContainText(/Your Basket\s*0/);
});
```

## Execution feedback
Failed test case step: Step 6
Line in the test file: 48
Error:
```
Error: expect(locator).toBeEnabled() failed

Locator: getByRole('button', { name: 'Log in', exact: true })
Expected: enabled
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeEnabled" getByRole('button', { name: 'Log in', exact: true }) with timeout 5000ms
  - waiting for getByRole('button', { name: 'Log in', exact: true })


  46 |   // Step 6
  47 |   const loginButton = page.getByRole('button', { name: 'Log in', exact: true });
> 48 |   await expect(loginButton).toBeEnabled();
     |                             ^
  49 |   await loginButton.click();
  50 |   // Verify the user is logged in: the account menu now offers "Logout".
  51 |   await expect(page).not.toHaveURL(/login/);
    at /Users/nbryk/Desktop/university/звіт аспірантура/Scopus project/App/testcase-to-playwright-agent/generated/main/deepseek-v4.1-flash/R3/rep1/JS-16.spec.ts:48:29
```

Page URL at the moment of failure: http://localhost:3000/#/login

Accessibility snapshot of the page at the moment of failure:
```yaml
- button "Open Sidenav"
- button "Back to homepage":
  - img "OWASP Juice Shop"
  - text: OWASP Juice Shop
- button "Open search"
- textbox
- button "Close search"
- button "Show/hide account menu": Account
- button "Show the shopping cart": Your Basket 0
- button "Language selection menu": EN
- main:
  - heading "Login" [level=1]
  - text: Email
  - textbox "Text field for the login email":
    - /placeholder: ""
    - text: qa_user@example.com
  - text: Password
  - textbox "Text field for the login password":
    - /placeholder: ""
    - text: QaPassword123!
  - button "Show password"
  - link "Forgot your password?":
    - /url: "#/forgot-password"
  - button "Login": Log in
  - checkbox "Checkbox to stay logged in or not logged in"
  - text: Remember me or
  - button "Login with Google": Log in with Google
  - link "Not yet a customer?":
    - /url: "#/register"
```
A screenshot of the page at the moment of failure is attached.

Fix the test so that it passes while still reproducing every step and verifying every expected
result of the test case. You may change how an element is located or how a step is performed,
but never remove or weaken an assertion. Return the complete corrected file.
