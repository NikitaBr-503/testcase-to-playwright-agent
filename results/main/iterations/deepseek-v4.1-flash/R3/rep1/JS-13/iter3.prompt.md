Convert the following manual test case into a Playwright test.

## Application
Base URL: http://localhost:3000
Start page: /
The welcome dialog and the cookie banner are already dismissed by the test environment.
Registered test user: email qa_user@example.com, password QaPassword123!,
security question "Your eldest siblings middle name?", answer Kyiv.
Prices are shown with the currency sign ¤, for example 1.99¤.

## Manual test case
ID: JS-13
Title: Реєстрація з паролями, що не збігаються
Preconditions:
- Вітальне вікно і банер про cookies уже закриті (налаштування тестового середовища)
- Користувач не увійшов до системи
Steps:
1. Відкрити головну сторінку.
2. Натиснути кнопку «Account» у верхній панелі.
3. Обрати пункт «Login».
4. Натиснути посилання «Not yet a customer?».
5. Ввести в поле «Email» значення «mismatch@example.com».
6. Ввести в поле «Password» значення «Secret123!».
7. Ввести в поле «Repeat Password» значення «Secret999!».
Expected results:
1. Під полем «Repeat Password» відображається помилка «Passwords do not match».
2. Кнопка «Register» недоступна для натискання.

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
Your previous test (attempt 2 of 5) failed when it was run.

```ts
import { test, expect } from '@playwright/test';

test('JS-13 Реєстрація з паролями, що не збігаються', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user is not logged in (fresh browser context, no session).

  // Step 1
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Show/hide account menu' })).toBeVisible();

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();
  await expect(page.getByRole('link', { name: 'Not yet a customer?' })).toBeVisible();

  // Step 4
  await page.getByRole('link', { name: 'Not yet a customer?' }).click();
  await expect(page.getByRole('heading', { name: 'User Registration' })).toBeVisible();

  // Step 5
  await page.getByRole('textbox', { name: 'Email address field' }).fill('mismatch@example.com');

  // Step 6
  await page.getByRole('textbox', { name: 'Field for the password' }).fill('Secret123!');

  // Step 7
  await page.getByRole('textbox', { name: 'Field to confirm the password' }).fill('Secret999!');

  // Expected 1
  await expect(page.getByText('Passwords do not match')).toBeVisible();

  // Expected 2
  await expect(
    page.getByRole('button', { name: 'Button to complete the registration' })
  ).toBeDisabled();
});
```

## Execution feedback
Failed test case step: Expected 1
Line in the test file: 32
Error:
```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Passwords do not match')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByText('Passwords do not match') with timeout 5000ms
  - waiting for getByText('Passwords do not match')


  30 |
  31 |   // Expected 1
> 32 |   await expect(page.getByText('Passwords do not match')).toBeVisible();
     |                                                          ^
  33 |
  34 |   // Expected 2
  35 |   await expect(
    at /Users/nbryk/Desktop/university/звіт аспірантура/Scopus project/App/testcase-to-playwright-agent/generated/main/deepseek-v4.1-flash/R3/rep1/JS-13.spec.ts:32:58
```

Page URL at the moment of failure: http://localhost:3000/#/register

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
  - heading "User Registration" [level=1]
  - alert
  - text: Email
  - textbox "Email address field": mismatch@example.com
  - text: Password
  - textbox "Field for the password": Secret123!
  - emphasis: Password must be 5-40 characters long.
  - text: 10/20 Repeat Password
  - textbox "Field to confirm the password": Secret999!
  - text: 10/40
  - switch "Show password advice"
  - text: Show password advice
  - progressbar
  - text: Security Question
  - combobox "Selection list for the security question"
  - emphasis: This cannot be changed later!
  - text: Answer
  - textbox "Field for the answer to the security question":
    - /placeholder: Answer to your security question
  - button "Button to complete the registration" [disabled]: Register
  - link "Already a customer?":
    - /url: "#/login"
```
A screenshot of the page at the moment of failure is attached.

Fix the test so that it passes while still reproducing every step and verifying every expected
result of the test case. You may change how an element is located or how a step is performed,
but never remove or weaken an assertion. Return the complete corrected file.
