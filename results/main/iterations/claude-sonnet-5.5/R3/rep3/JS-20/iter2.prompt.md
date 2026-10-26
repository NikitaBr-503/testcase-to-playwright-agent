Convert the following manual test case into a Playwright test.

## Application
Base URL: http://localhost:3000
Start page: /
The welcome dialog and the cookie banner are already dismissed by the test environment.
Registered test user: email qa_user@example.com, password QaPassword123!,
security question "Your eldest siblings middle name?", answer Kyiv.
Prices are shown with the currency sign ¤, for example 1.99¤.

## Manual test case
ID: JS-20
Title: Зміна кількості товару в кошику
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
9. У рядку товару «Apple Juice (1000ml)» натиснути кнопку збільшення кількості (іконка «+»).
10. У рядку товару натиснути кнопку зменшення кількості (іконка «−»).
Expected results:
1. Після кроку 9 кількість товару дорівнює 2, а загальна сума становить «Total Price: 3.98¤».
2. Після кроку 10 кількість товару дорівнює 1, а загальна сума становить «Total Price: 1.99¤».

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
Your previous test (attempt 1 of 5) failed when it was run.

```ts
import { test, expect } from '@playwright/test';

test('JS-20 Зміна кількості товару в кошику', async ({ page }) => {
  // Preconditions
  // User qa_user@example.com is registered, basket is empty (new session), dialogs are dismissed.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByLabel('Email').fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Password', { exact: true }).fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByRole('button', { name: 'Show the shopping cart' })).toBeVisible();

  // Step 7
  const productCard = page.locator('mat-card', { hasText: 'Apple Juice (1000ml)' });
  await productCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Step 8
  await page.getByRole('button', { name: 'Show the shopping cart' }).click();

  // Step 9
  const row = page.getByRole('row', { name: /Apple Juice \(1000ml\)/ });
  await expect(row).toBeVisible();
  await row.locator('button').filter({ has: page.locator('svg[data-icon="plus-square"], .fa-plus-square') }).click();

  // Expected 1
  await expect(row.locator('.mat-column-quantity')).toContainText('2');
  await expect(page.getByText('Total Price: 3.98¤')).toBeVisible();

  // Step 10
  await row.locator('button').filter({ has: page.locator('svg[data-icon="minus-square"], .fa-minus-square') }).click();

  // Expected 2
  await expect(row.locator('.mat-column-quantity')).toContainText('1');
  await expect(page.getByText('Total Price: 1.99¤')).toBeVisible();
});
```

## Execution feedback
Failed test case step: Step 5
Line in the test file: 19
Error:
```
TimeoutError: locator.fill: Timeout 10000ms exceeded.
Call log:
  - waiting for getByLabel('Password', { exact: true })


  17 |
  18 |   // Step 5
> 19 |   await page.getByLabel('Password', { exact: true }).fill('QaPassword123!');
     |                                                      ^
  20 |
  21 |   // Step 6
  22 |   await page.getByRole('button', { name: 'Log in' }).click();
    at /Users/nbryk/Desktop/university/звіт аспірантура/Scopus project/App/testcase-to-playwright-agent/generated/main/claude-sonnet-5.5/R3/rep3/JS-20.spec.ts:19:54
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
  - button "Show password"
  - link "Forgot your password?":
    - /url: "#/forgot-password"
  - button "Login" [disabled]: Log in
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
