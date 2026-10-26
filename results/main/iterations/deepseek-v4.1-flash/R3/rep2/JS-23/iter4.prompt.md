Convert the following manual test case into a Playwright test.

## Application
Base URL: http://localhost:3000
Start page: /
The welcome dialog and the cookie banner are already dismissed by the test environment.
Registered test user: email qa_user@example.com, password QaPassword123!,
security question "Your eldest siblings middle name?", answer Kyiv.
Prices are shown with the currency sign ¤, for example 1.99¤.

## Manual test case
ID: JS-23
Title: Реєстрація і вхід новим користувачем
Preconditions:
- Вітальне вікно і банер про cookies уже закриті (налаштування тестового середовища)
- Користувач не увійшов до системи
Steps:
1. Відкрити головну сторінку.
2. Натиснути кнопку «Account» у верхній панелі.
3. Обрати пункт «Login».
4. Натиснути посилання «Not yet a customer?».
5. Ввести в поле «Email» нову адресу виду «new_login_<унікальне число>@example.com» (адреса має бути унікальною) і запам'ятати її.
6. Ввести в поле «Password» значення «Login123!».
7. Ввести в поле «Repeat Password» значення «Login123!».
8. У списку «Security Question» обрати «Your eldest siblings middle name?».
9. Ввести в поле «Answer» значення «Kyiv».
10. Натиснути кнопку «Register».
11. Ввести в поле «Email» сторінки «Login» зареєстровану адресу.
12. Ввести в поле «Password» значення «Login123!».
13. Натиснути кнопку «Log in».
14. Натиснути кнопку кошика «Your Basket» у верхній панелі.
Expected results:
1. Сторінка кошика має заголовок «Your Basket (<зареєстрована адреса>)».
2. Кошик порожній: у ньому немає жодного товару.

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
Your previous test (attempt 3 of 5) failed when it was run.

```ts
import { test, expect } from '@playwright/test';

test('JS-23 Реєстрація і вхід новим користувачем', async ({ page }) => {
  const email = `new_login_${Date.now()}@example.com`;
  const password = 'Login123!';

  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // A fresh browser context is used, so the user is not logged in.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByRole('link', { name: 'Not yet a customer?' }).click();

  // Step 5
  await expect(page.getByRole('heading', { name: 'User Registration' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Email address field' }).fill(email);

  // Step 6
  await page.getByRole('textbox', { name: 'Field for the password' }).fill(password);

  // Step 7
  await page.getByRole('textbox', { name: 'Field to confirm the password' }).fill(password);

  // Step 8
  await page.getByRole('combobox', { name: 'Selection list for the security question' }).click();
  await page.getByRole('option', { name: 'Your eldest siblings middle name?' }).click();

  // Step 9
  await page
    .getByRole('textbox', { name: 'Field for the answer to the security question' })
    .fill('Kyiv');

  // Step 10
  await page.getByRole('button', { name: 'Button to complete the registration' }).click();

  // Step 11
  const loginEmailField = page.getByRole('textbox', { name: 'Text field for the login email' });
  await expect(loginEmailField).toBeVisible();
  await loginEmailField.fill(email);

  // Step 12
  await page.getByRole('textbox', { name: 'Text field for the login password' }).fill(password);

  // Step 13
  const loginButton = page.getByRole('button', { name: 'Login', exact: true });
  await expect(loginButton).toBeEnabled();
  await loginButton.click();
  await expect(loginButton).toBeHidden();

  // Step 14
  await page.getByRole('button', { name: 'Show the shopping cart' }).click();

  // Expected 1
  const basketHeading = page.getByRole('heading', { name: /Your Basket/ });
  await expect(basketHeading).toBeVisible();
  await expect(basketHeading).toContainText(email);

  // Expected 2
  await expect(page.getByText(/your basket is empty/i)).toBeVisible();
});
```

## Execution feedback
Failed test case step: Expected 2
Line in the test file: 67
Error:
```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/your basket is empty/i)
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByText(/your basket is empty/i) with timeout 5000ms
  - waiting for getByText(/your basket is empty/i)


  65 |
  66 |   // Expected 2
> 67 |   await expect(page.getByText(/your basket is empty/i)).toBeVisible();
     |                                                         ^
  68 | });
  69 |
    at /Users/nbryk/Desktop/university/звіт аспірантура/Scopus project/App/testcase-to-playwright-agent/generated/main/deepseek-v4.1-flash/R3/rep2/JS-23.spec.ts:67:57
```

Page URL at the moment of failure: http://localhost:3000/#/basket

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
- heading "Your Basket (new_login_1792936641445@example.com)" [level=1]
- table:
  - row
- text: "Total Price: 0¤"
- button "Checkout" [disabled]
- text: You will gain 0 Bonus Points from this order! Registration completed successfully. You can now log in.
- button "X"
```
A screenshot of the page at the moment of failure is attached.

Fix the test so that it passes while still reproducing every step and verifying every expected
result of the test case. You may change how an element is located or how a step is performed,
but never remove or weaken an assertion. Return the complete corrected file.
