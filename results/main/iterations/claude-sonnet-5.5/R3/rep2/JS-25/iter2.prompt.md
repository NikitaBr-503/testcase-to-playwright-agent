Convert the following manual test case into a Playwright test.

## Application
Base URL: http://localhost:3000
Start page: /
The welcome dialog and the cookie banner are already dismissed by the test environment.
Registered test user: email qa_user@example.com, password QaPassword123!,
security question "Your eldest siblings middle name?", answer Kyiv.
Prices are shown with the currency sign ¤, for example 1.99¤.

## Manual test case
ID: JS-25
Title: Повне оформлення замовлення з оплатою карткою
Preconditions:
- Вітальне вікно і банер про cookies уже закриті (налаштування тестового середовища)
- Користувач qa_user@example.com зареєстрований
- Користувач не увійшов до системи
- Кошик користувача порожній
- У користувача немає збережених адрес і карток
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
21. Обрати спосіб доставки «Standard Delivery».
22. Натиснути кнопку «Continue».
23. Розгорнути розділ «Add new card».
24. Ввести в поле «Name» значення «QA User».
25. Ввести в поле «Card Number» тестовий номер «4111111111111111».
26. У списку «Expiry Month» обрати «12».
27. У списку «Expiry Year» обрати «2090».
28. Натиснути кнопку «Submit» у розділі картки.
29. Обрати збережену картку, що закінчується на «1111».
30. Натиснути кнопку «Continue».
31. Натиснути кнопку «Place your order and pay».
32. Натиснути кнопку «Account» у верхній панелі.
33. Обрати пункт «Orders & Payment».
34. Обрати пункт «Order History».
Expected results:
1. Відображається повідомлення «Thank you for your purchase!»
2. На сторінці підтвердження зазначено товар «Apple Juice (1000ml)».
3. На сторінці «Order History» перше (найновіше) замовлення містить товар «Apple Juice (1000ml)» і має статус «In Transit».

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

test('JS-25 Повне оформлення замовлення з оплатою карткою', async ({ page }) => {
  // Preconditions
  // Registered user, empty basket, no saved addresses/cards and dialogs already dismissed by the environment.
  await page.context().clearCookies();

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: /Login/ }).click();

  // Step 4
  await page.getByRole('textbox', { name: 'Email' }).fill('qa_user@example.com');

  // Step 5
  await page.locator('#password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();

  // Step 7
  const appleJuiceCard = page
    .getByRole('article')
    .filter({ hasText: 'Apple Juice (1000ml)' });
  await appleJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Step 8
  await page.getByRole('button', { name: 'Show the shopping cart' }).click();

  // Step 9
  await page.getByRole('button', { name: 'Checkout' }).click();

  // Step 10
  await expect(page.getByText('Select an address')).toBeVisible();
  await page.getByRole('button', { name: 'Add New Address' }).click();

  // Step 11
  await page.getByPlaceholder('Please provide a country.').fill('Ukraine');

  // Step 12
  await page.getByPlaceholder('Please provide a name.').fill('QA User');

  // Step 13
  await page.getByPlaceholder('Please provide a mobile number.').fill('5012345678');

  // Step 14
  await page.getByPlaceholder('Please provide a ZIP code.').fill('01001');

  // Step 15
  await page.getByPlaceholder('Please provide an address.').fill('Khreshchatyk 1');

  // Step 16
  await page.getByPlaceholder('Please provide a city.').fill('Kyiv');

  // Step 17
  await page.getByPlaceholder('Please provide a state.').fill('Kyiv');

  // Step 18
  await page.getByRole('button', { name: 'Submit' }).click();

  // Step 19
  const addressRow = page.getByRole('row').filter({ hasText: 'QA User' });
  await addressRow.click();

  // Step 20
  await page.getByRole('button').filter({ hasText: 'Continue' }).click();

  // Step 21
  await page.getByRole('row').filter({ hasText: 'Standard Delivery' }).click();

  // Step 22
  await page.getByRole('button').filter({ hasText: 'Continue' }).click();

  // Step 23
  await page.getByText('Add new card').click();

  // Step 24
  await page.getByLabel('Name', { exact: true }).fill('QA User');

  // Step 25
  await page.getByLabel('Card Number').fill('4111111111111111');

  // Step 26
  await page.getByLabel('Expiry Month').selectOption('12');

  // Step 27
  await page.getByLabel('Expiry Year').selectOption('2090');

  // Step 28
  await page.getByRole('button', { name: 'Submit' }).click();

  // Step 29
  await page.getByRole('row').filter({ hasText: '1111' }).click();

  // Step 30
  await page.getByRole('button').filter({ hasText: 'Continue' }).click();

  // Step 31
  await page.getByRole('button').filter({ hasText: 'Place your order and pay' }).click();

  // Expected 1
  await expect(page.getByText('Thank you for your purchase!')).toBeVisible();

  // Expected 2
  await expect(
    page.getByRole('cell', { name: /Apple Juice \(1000ml\)/ }).first()
  ).toBeVisible();

  // Step 32
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 33
  await page.getByRole('menuitem', { name: /Orders & Payment/ }).click();

  // Step 34
  await page.getByRole('menuitem', { name: /Order History/ }).click();

  // Expected 3
  await expect(page).toHaveURL(/order-history/);
  const firstOrder = page.locator('mat-card').filter({ hasText: 'Order ID' }).first();
  await expect(firstOrder).toBeVisible();
  await expect(firstOrder).toContainText('Apple Juice (1000ml)');
  await expect(firstOrder).toContainText('In Transit');
});
```

## Execution feedback
Failed test case step: Step 2
Line in the test file: 11
Error:
```
TimeoutError: locator.click: Timeout 10000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Show/hide account menu' })
    - locator resolved to <button mat-button="" id="navbarAccount" aria-haspopup="menu" aria-expanded="false" _ngcontent-ng-c1731522247="" mat-ripple-loader-uninitialized="" aria-label="Show/hide account menu" mat-ripple-loader-class-name="mat-mdc-button-ripple" class="mdc-button mat-mdc-button-base mat-mdc-menu-trigger buttons hide-lt-md nav-button nav-account-button mat-mdc-button mat-unthemed">…</button>
  - attempting click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="cdk-overlay-backdrop cdk-overlay-dark-backdrop"></div> from <div class="cdk-overlay-container">…</div> subtree intercepts pointer events
  - retrying click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="cdk-overlay-backdrop cdk-overlay-dark-backdrop cdk-overlay-backdrop-showing"></div> from <div class="cdk-overlay-container">…</div> subtree intercepts pointer events
  - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="cdk-overlay-backdrop cdk-overlay-dark-backdrop cdk-overlay-backdrop-showing"></div> from <div class="cdk-overlay-container">…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 100ms
    19 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div class="cdk-overlay-backdrop cdk-overlay-dark-backdrop cdk-overlay-backdrop-showing"></div> from <div class="cdk-overlay-container">…</div> subtree intercepts pointer events
     - retrying click action
       - waiting 500ms


   9 |
  10 |   // Step 2
> 11 |   await page.getByRole('button', { name: 'Show/hide account menu' }).click();
     |                                                                      ^
  12 |
  13 |   // Step 3
  14 |   await page.getByRole('menuitem', { name: /Login/ }).click();
    at /Users/nbryk/Desktop/university/звіт аспірантура/Scopus project/App/testcase-to-playwright-agent/generated/main/claude-sonnet-5.5/R3/rep2/JS-25.spec.ts:11:70
```

Page URL at the moment of failure: http://localhost:3000/#/

Accessibility snapshot of the page at the moment of failure:
```yaml
- dialog "cookieconsent":
  - text: This website uses fruit cookies to ensure you get the juiciest tracking experience.
  - button "learn more about cookies": But me wait!
  - button "dismiss cookie message": Me want it!
- dialog:
  - heading "Welcome to OWASP Juice Shop!" [level=1]
  - paragraph:
    - text: Being a web application with a vast number of intended security vulnerabilities, the
    - strong: OWASP Juice Shop
    - text: "is supposed to be the opposite of a best practice or template application for web developers: It is an awareness, training, demonstration and exercise tool for security risks in modern web applications. The"
    - strong: OWASP Juice Shop
    - text: is an open-source project hosted by the non-profit
    - link "Open Worldwide Application Security Project (OWASP)":
      - /url: https://owasp.org
    - text: and is developed and maintained by volunteers. Check out the link below for more information and documentation on the project.
  - heading "https://owasp-juice.shop" [level=1]:
    - link "https://owasp-juice.shop":
      - /url: https://owasp-juice.shop
  - button "Help getting started"
  - button "Close Welcome Banner": Dismiss
```
A screenshot of the page at the moment of failure is attached.

Fix the test so that it passes while still reproducing every step and verifying every expected
result of the test case. You may change how an element is located or how a step is performed,
but never remove or weaken an assertion. Return the complete corrected file.
