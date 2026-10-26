Convert the following manual test case into a Playwright test.

## Application
Base URL: http://localhost:3000
Start page: /
The welcome dialog and the cookie banner are already dismissed by the test environment.
Registered test user: email qa_user@example.com, password QaPassword123!,
security question "Your eldest siblings middle name?", answer Kyiv.
Prices are shown with the currency sign ¤, for example 1.99¤.

## Manual test case
ID: JS-24
Title: Оформлення замовлення до вибору способу доставки
Preconditions:
- Вітальне вікно і банер про cookies уже закриті (налаштування тестового середовища)
- Користувач qa_user@example.com зареєстрований
- Користувач не увійшов до системи
- Кошик користувача порожній
- У користувача немає збережених адрес
Steps:
1. Відкрити головну сторінку.
2. Натиснути кнопку «Account» у верхній панелі.
3. Обрати пункт «Login».
4. Ввести в поле «Email» значення «qa_user@example.com».
5. Ввести в поле «Password» значення «QaPassword123!».
6. Натиснути кнопку «Log in».
7. Натиснути кнопку «Add to Basket» на картці товару «Apple Juice (1000ml)».
8. Натиснути кнопку кошика «Your Basket» у верхній панелі.
9. Натиснути кнопку «Checkout».
10. На сторінці «Select an address» натиснути кнопку «Add New Address».
11. Ввести в поле «Country» значення «Ukraine».
12. Ввести в поле «Name» значення «QA User».
13. Ввести в поле «Mobile Number» значення «5012345678».
14. Ввести в поле «ZIP Code» значення «01001».
15. Ввести в поле «Address» значення «Khreshchatyk 1».
16. Ввести в поле «City» значення «Kyiv».
17. Ввести в поле «State» значення «Kyiv».
18. Натиснути кнопку «Submit».
19. Обрати збережену адресу «QA User» у списку адрес.
20. Натиснути кнопку «Continue».
Expected results:
1. Відкрилася сторінка із заголовком «Choose a delivery speed».
2. Доступні три способи доставки: «One Day Delivery» (0.99¤), «Fast Delivery» (0.50¤) і «Standard Delivery» (0.00¤).

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

test('JS-24 Оформлення замовлення до вибору способу доставки', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // User qa_user@example.com is registered, is not logged in, has an empty basket and no saved addresses.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByLabel('Email').fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();

  // Step 7
  const appleJuiceCard = page.locator('article').filter({ hasText: 'Apple Juice (1000ml)' });
  await appleJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Step 8
  await page.getByRole('button', { name: 'Show the shopping cart' }).click();

  // Step 9
  await page.getByRole('button', { name: 'Checkout' }).click();

  // Step 10
  await expect(page.getByRole('heading', { name: 'Select an address' })).toBeVisible();
  await page.getByRole('button', { name: 'Add New Address' }).click();

  // Step 11
  await page.getByLabel('Country').fill('Ukraine');

  // Step 12
  await page.getByLabel('Name', { exact: true }).fill('QA User');

  // Step 13
  await page.getByLabel('Mobile Number').fill('5012345678');

  // Step 14
  await page.getByLabel('ZIP Code').fill('01001');

  // Step 15
  await page.getByLabel('Address', { exact: true }).fill('Khreshchatyk 1');

  // Step 16
  await page.getByLabel('City').fill('Kyiv');

  // Step 17
  await page.getByLabel('State').fill('Kyiv');

  // Step 18
  await page.getByRole('button', { name: 'Submit' }).click();

  // Step 19
  const savedAddressRow = page.getByRole('row').filter({ hasText: 'QA User' });
  await expect(savedAddressRow).toBeVisible();
  await savedAddressRow.getByRole('radio').check();

  // Step 20
  await page.getByRole('button', { name: 'Continue' }).click();

  // Expected 1
  await expect(page.getByRole('heading', { name: 'Choose a delivery speed' })).toBeVisible();

  // Expected 2
  await expect(page.getByText('One Day Delivery', { exact: true })).toBeVisible();
  await expect(page.getByText('0.99¤', { exact: true })).toBeVisible();
  await expect(page.getByText('Fast Delivery', { exact: true })).toBeVisible();
  await expect(page.getByText('0.50¤', { exact: true })).toBeVisible();
  await expect(page.getByText('Standard Delivery', { exact: true })).toBeVisible();
  await expect(page.getByText('0.00¤', { exact: true })).toBeVisible();
});
```

## Execution feedback
Failed test case step: Step 5
Line in the test file: 20
Error:
```
Error: locator.fill: Error: strict mode violation: getByLabel('Password') resolved to 2 elements:
    1) <input matinput="" required="" id="password" minlength="1" placeholder="" type="password" aria-required="true" name="ng.form0.password" _ngcontent-ng-c347502026="" aria-label="Text field for the login password" class="mat-mdc-input-element mat-mdc-form-field-input-control mdc-text-field__input cdk-text-field-autofill-monitored"/> aka getByRole('textbox', { name: 'Text field for the login password' })
    2) <button matsuffix="" type="button" mat-icon-button="" mattooltipposition="right" aria-label="Show password" _ngcontent-ng-c347502026="" mat-ripple-loader-centered="" mat-ripple-loader-uninitialized="" mat-ripple-loader-class-name="mat-mdc-button-ripple" class="mdc-icon-button mat-mdc-icon-button mat-mdc-button-base mat-mdc-tooltip-trigger password-toggle-button mat-unthemed">…</button> aka getByRole('button', { name: 'Show password' })

Call log:
  - waiting for getByLabel('Password')


  18 |
  19 |   // Step 5
> 20 |   await page.getByLabel('Password').fill('QaPassword123!');
     |                                     ^
  21 |
  22 |   // Step 6
  23 |   await page.getByRole('button', { name: 'Log in' }).click();
    at /Users/nbryk/Desktop/university/звіт аспірантура/Scopus project/App/testcase-to-playwright-agent/generated/main/deepseek-v4.1-flash/R3/rep3/JS-24.spec.ts:20:37
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
- text: Language has been changed to English
- button "Force page reload"
- menu:
  - menuitem "Go to login page": Login
```
A screenshot of the page at the moment of failure is attached.

Fix the test so that it passes while still reproducing every step and verifying every expected
result of the test case. You may change how an element is located or how a step is performed,
but never remove or weaken an assertion. Return the complete corrected file.
