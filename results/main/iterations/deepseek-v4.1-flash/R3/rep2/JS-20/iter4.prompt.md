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
Your previous test (attempt 3 of 5) failed when it was run.

```ts
import { test, expect } from '@playwright/test';

test('JS-20 Change the quantity of a product in the basket', async ({ page }) => {
  // Preconditions
  // - The welcome dialog and the cookie banner are already dismissed by the test environment.
  // - The user qa_user@example.com is registered.
  // - The basket of the user is empty.

  // Step 1
  await page.goto('/');

  // Preconditions (verified): product list is shown and the basket is empty
  const basketButton = page.getByRole('button', { name: 'Show the shopping cart' });
  await expect(page.getByRole('button', { name: 'Add to Basket' }).first()).toBeVisible();
  await expect(basketButton).toContainText(/Your Basket\s*0/);

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: /login/i }).click();

  // Step 4
  await page
    .getByRole('textbox', { name: 'Text field for the login email' })
    .fill('qa_user@example.com');

  // Step 5
  await page
    .getByRole('textbox', { name: 'Text field for the login password' })
    .fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Add to Basket' }).first()).toBeVisible();
  await expect(
    page.getByRole('textbox', { name: 'Text field for the login password' })
  ).toBeHidden();

  // Step 7
  const appleJuiceCard = page.getByRole('article').filter({ hasText: 'Apple Juice (1000ml)' });
  await appleJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();
  await expect(basketButton).toContainText(/Your Basket\s*1/);

  // Step 8
  await basketButton.click();

  const basketRow = page.getByRole('row').filter({ hasText: 'Apple Juice (1000ml)' });
  await expect(basketRow).toBeVisible();

  // The quantity cell is the one that holds the +/- buttons
  const quantityCell = basketRow
    .getByRole('cell')
    .filter({ has: page.getByRole('button') })
    .first();
  const increaseButton = quantityCell.getByRole('button').first();
  const decreaseButton = quantityCell.getByRole('button').last();

  // Step 9
  await expect(quantityCell).toHaveText(/^\s*1\s*$/);
  await increaseButton.click();

  // Expected 1
  await expect(quantityCell).toHaveText(/^\s*2\s*$/);
  await expect(page.getByText(/Total Price:\s*3\.98\s*¤/).first()).toBeVisible();

  // Step 10
  await decreaseButton.click();

  // Expected 2
  await expect(quantityCell).toHaveText(/^\s*1\s*$/);
  await expect(page.getByText(/Total Price:\s*1\.99\s*¤/).first()).toBeVisible();
});
```

## Execution feedback
Failed test case step: Expected 1
Line in the test file: 63
Error:
```
Error: expect(locator).toHaveText(expected) failed

Locator: getByRole('row').filter({ hasText: 'Apple Juice (1000ml)' }).getByRole('cell').filter({ has: getByRole('button') }).first()
Expected pattern: /^\s*2\s*$/
Received string:  " 1"
Timeout: 5000ms

Call log:
  - Expect "toHaveText" getByRole('row').filter({ hasText: 'Apple Juice (1000ml)' }).getByRole('cell').filter({ has: getByRole('button') }).first() with timeout 5000ms
  - waiting for getByRole('row').filter({ hasText: 'Apple Juice (1000ml)' }).getByRole('cell').filter({ has: getByRole('button') }).first()
    14 × locator resolved to <mat-cell role="cell" _ngcontent-ng-c125060177="" class="mat-mdc-cell mdc-data-table__cell cdk-cell content-align cdk-column-quantity mat-column-quantity">…</mat-cell>
       - unexpected value " 1"


  61 |
  62 |   // Expected 1
> 63 |   await expect(quantityCell).toHaveText(/^\s*2\s*$/);
     |                              ^
  64 |   await expect(page.getByText(/Total Price:\s*3\.98\s*¤/).first()).toBeVisible();
  65 |
  66 |   // Step 10
    at /Users/nbryk/Desktop/university/звіт аспірантура/Scopus project/App/testcase-to-playwright-agent/generated/main/deepseek-v4.1-flash/R3/rep2/JS-20.spec.ts:63:30
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
- button "Show the shopping cart": Your Basket 1
- button "Language selection menu": EN
- heading "Your Basket (qa_user@example.com)" [level=1]
- table:
  - row
  - row "Apple Juice (1000ml) Apple Juice (1000ml) 1 1.99¤":
    - cell "Apple Juice (1000ml)":
      - img "Apple Juice (1000ml)"
    - cell "Apple Juice (1000ml)"
    - cell "1":
      - button
      - text: "1"
      - button
    - cell "1.99¤"
    - cell:
      - button
- text: "Total Price: 1.99¤"
- button "Checkout"
- text: You will gain 0 Bonus Points from this order! Placed Apple Juice (1000ml) into basket.
- button "X"
```
A screenshot of the page at the moment of failure is attached.

Fix the test so that it passes while still reproducing every step and verifying every expected
result of the test case. You may change how an element is located or how a step is performed,
but never remove or weaken an assertion. Return the complete corrected file.
