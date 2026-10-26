Convert the following manual test case into a Playwright test.

## Application
Base URL: http://localhost:3000
Start page: /
The welcome dialog and the cookie banner are already dismissed by the test environment.
Registered test user: email qa_user@example.com, password QaPassword123!,
security question "Your eldest siblings middle name?", answer Kyiv.
Prices are shown with the currency sign ¤, for example 1.99¤.

## Manual test case
ID: JS-15
Title: Додавання двох різних товарів до кошика
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
8. Натиснути кнопку «Add to Basket» на картці товару «Banana Juice (1000ml)».
9. Натиснути кнопку кошика «Your Basket» у верхній панелі.
Expected results:
1. Лічильник на кнопці кошика показує 2.
2. У кошику є товари «Apple Juice (1000ml)» і «Banana Juice (1000ml)», кожен у кількості 1.
3. Загальна сума становить «Total Price: 3.98¤».

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

test('JS-15 Додавання двох різних товарів до кошика', async ({ page }) => {
  // Preconditions
  // The welcome dialog and the cookie banner are already dismissed by the test environment.
  // The user qa_user@example.com is registered and the basket is expected to be empty.
  await page.goto('/');
  const basketButton = page.getByRole('button', { name: 'Show the shopping cart' });
  await expect(basketButton).toBeVisible();
  await expect(basketButton).toHaveText(/Your Basket\s*0/);

  // Step 1
  await expect(page.getByText('All Products')).toBeVisible();

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

  // Step 4
  const emailField = page.getByRole('textbox', { name: 'Text field for the login email' });
  await emailField.fill('qa_user@example.com');

  // Step 5
  const passwordField = page.getByRole('textbox', { name: 'Text field for the login password' });
  await passwordField.fill('QaPassword123!');

  // Step 6
  const loginButton = page.getByRole('button', { name: 'Login', exact: true });
  await expect(loginButton).toBeEnabled();
  await loginButton.click();
  await expect(page.getByRole('heading', { name: 'Login' })).toBeHidden();

  // Step 7
  const appleJuiceCard = page.locator('article').filter({ hasText: 'Apple Juice (1000ml)' });
  await expect(appleJuiceCard).toHaveCount(1);
  await appleJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Step 8
  const bananaJuiceCard = page.locator('article').filter({ hasText: 'Banana Juice (1000ml)' });
  await expect(bananaJuiceCard).toHaveCount(1);
  await bananaJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Step 9
  await page.getByRole('button', { name: 'Show the shopping cart' }).click();

  // Expected 1
  await expect(page.getByRole('button', { name: 'Show the shopping cart' })).toHaveText(
    /Your Basket\s*2/
  );

  // Expected 2
  await expect(page.getByText('Apple Juice (1000ml)', { exact: true })).toBeVisible();
  await expect(page.getByText('Banana Juice (1000ml)', { exact: true })).toBeVisible();
  const quantities = page.getByRole('spinbutton');
  await expect(quantities).toHaveCount(2);
  await expect(quantities.nth(0)).toHaveValue('1');
  await expect(quantities.nth(1)).toHaveValue('1');

  // Expected 3
  await expect(page.getByText(/Total Price:\s*3\.98\s*¤/)).toBeVisible();
});
```

## Execution feedback
Failed test case step: Expected 2
Line in the test file: 57
Error:
```
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByRole('spinbutton')
Expected: 2
Received: 0
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" getByRole('spinbutton') with timeout 5000ms
  - waiting for getByRole('spinbutton')
    14 × locator resolved to 0 elements
       - unexpected value "0"


  55 |   await expect(page.getByText('Banana Juice (1000ml)', { exact: true })).toBeVisible();
  56 |   const quantities = page.getByRole('spinbutton');
> 57 |   await expect(quantities).toHaveCount(2);
     |                            ^
  58 |   await expect(quantities.nth(0)).toHaveValue('1');
  59 |   await expect(quantities.nth(1)).toHaveValue('1');
  60 |
    at /Users/nbryk/Desktop/university/звіт аспірантура/Scopus project/App/testcase-to-playwright-agent/generated/main/deepseek-v4.1-flash/R3/rep1/JS-15.spec.ts:57:28
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
- button "Show the shopping cart": Your Basket 2
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
  - row "Banana Juice (1000ml) Banana Juice (1000ml) 1 1.99¤":
    - cell "Banana Juice (1000ml)":
      - img "Banana Juice (1000ml)"
    - cell "Banana Juice (1000ml)"
    - cell "1":
      - button
      - text: "1"
      - button
    - cell "1.99¤"
    - cell:
      - button
- text: "Total Price: 3.98¤"
- button "Checkout"
- text: You will gain 0 Bonus Points from this order! Placed Banana Juice (1000ml) into basket.
- button "X"
```
A screenshot of the page at the moment of failure is attached.

Fix the test so that it passes while still reproducing every step and verifying every expected
result of the test case. You may change how an element is located or how a step is performed,
but never remove or weaken an assertion. Return the complete corrected file.
