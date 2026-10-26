Convert the following manual test case into a Playwright test.

## Application
Base URL: http://localhost:3000
Start page: /
The welcome dialog and the cookie banner are already dismissed by the test environment.
Registered test user: email qa_user@example.com, password QaPassword123!,
security question "Your eldest siblings middle name?", answer Kyiv.
Prices are shown with the currency sign ¤, for example 1.99¤.

## Manual test case
ID: JS-06
Title: Реєстрація нового користувача
Preconditions:
- Вітальне вікно і банер про cookies уже закриті (налаштування тестового середовища)
- Користувач не увійшов до системи
Steps:
1. Відкрити головну сторінку.
2. Натиснути кнопку «Account» у верхній панелі.
3. Обрати пункт «Login».
4. Натиснути посилання «Not yet a customer?».
5. Ввести в поле «Email» нову адресу виду «new_user_<унікальне число>@example.com» (адреса має бути унікальною).
6. Ввести в поле «Password» значення «NewUser123!».
7. Ввести в поле «Repeat Password» значення «NewUser123!».
8. У списку «Security Question» обрати «Your eldest siblings middle name?».
9. Ввести в поле «Answer» значення «Kyiv».
10. Натиснути кнопку «Register».
Expected results:
1. Відображається повідомлення «Registration completed successfully. You can now log in.»
2. Відкрилася сторінка входу із заголовком «Login».

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

test('JS-06 Реєстрація нового користувача', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // User is not logged in.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByRole('link', { name: 'Not yet a customer?' }).click();

  // Step 5
  const uniqueEmail = `new_user_${Date.now()}@example.com`;
  await page.getByRole('textbox', { name: 'Email' }).fill(uniqueEmail);

  // Step 6
  await page.getByRole('textbox', { name: 'Password', exact: true }).fill('NewUser123!');

  // Step 7
  await page.getByRole('textbox', { name: 'Repeat Password' }).fill('NewUser123!');

  // Step 8
  await page.getByRole('combobox', { name: 'Security Question' }).selectOption({
    label: 'Your eldest siblings middle name?',
  });

  // Step 9
  await page.getByRole('textbox', { name: 'Answer' }).fill('Kyiv');

  // Step 10
  await page.getByRole('button', { name: 'Register' }).click();

  // Expected 1
  await expect(
    page.getByText('Registration completed successfully. You can now log in.')
  ).toBeVisible();

  // Expected 2
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
});
```

## Execution feedback
Failed test case step: Step 6
Line in the test file: 24
Error:
```
TimeoutError: locator.fill: Timeout 10000ms exceeded.
Call log:
  - waiting for getByRole('textbox', { name: 'Password', exact: true })


  22 |
  23 |   // Step 6
> 24 |   await page.getByRole('textbox', { name: 'Password', exact: true }).fill('NewUser123!');
     |                                                                      ^
  25 |
  26 |   // Step 7
  27 |   await page.getByRole('textbox', { name: 'Repeat Password' }).fill('NewUser123!');
    at /Users/nbryk/Desktop/university/звіт аспірантура/Scopus project/App/testcase-to-playwright-agent/generated/main/deepseek-v4.1-flash/R3/rep2/JS-06.spec.ts:24:70
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
  - textbox "Email address field": new_user_1792934293110@example.com
  - text: Password
  - textbox "Field for the password"
  - emphasis: Password must be 5-40 characters long.
  - text: 0/20 Repeat Password
  - textbox "Field to confirm the password"
  - text: 0/40
  - switch "Show password advice"
  - text: Show password advice Security Question
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
