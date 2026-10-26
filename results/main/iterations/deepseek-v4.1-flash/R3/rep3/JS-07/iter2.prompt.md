Convert the following manual test case into a Playwright test.

## Application
Base URL: http://localhost:3000
Start page: /
The welcome dialog and the cookie banner are already dismissed by the test environment.
Registered test user: email qa_user@example.com, password QaPassword123!,
security question "Your eldest siblings middle name?", answer Kyiv.
Prices are shown with the currency sign ¤, for example 1.99¤.

## Manual test case
ID: JS-07
Title: Перегляд картки товару
Preconditions:
- Вітальне вікно і банер про cookies уже закриті (налаштування тестового середовища)
- Користувач не увійшов до системи
Steps:
1. Відкрити головну сторінку.
2. Натиснути на назву товару «Banana Juice (1000ml)» у каталозі.
Expected results:
1. Відкрилося вікно з заголовком «Banana Juice (1000ml)».
2. У вікні відображається ціна «1.99¤» і розділ «Reviews».

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

test('JS-07: Перегляд картки товару', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user is not logged in (no login performed in this test).

  // Step 1
  await page.goto('/');

  // Step 2
  const bananaJuiceCard = page
    .locator('article')
    .filter({ hasText: 'Banana Juice (1000ml)' });
  await bananaJuiceCard
    .getByRole('button', { name: 'Click for more information about the product' })
    .click();

  // Expected 1
  const productDialog = page.getByRole('dialog', { name: 'Banana Juice (1000ml)' });
  await expect(productDialog).toBeVisible();
  await expect(
    productDialog.getByRole('heading', { name: 'Banana Juice (1000ml)' })
  ).toBeVisible();

  // Expected 2
  await expect(productDialog.getByText('1.99¤', { exact: true })).toBeVisible();
  await expect(productDialog.getByText('Reviews').first()).toBeVisible();
});
```

## Execution feedback
Failed test case step: Expected 1
Line in the test file: 20
Error:
```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('dialog', { name: 'Banana Juice (1000ml)' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('dialog', { name: 'Banana Juice (1000ml)' }) with timeout 5000ms
  - waiting for getByRole('dialog', { name: 'Banana Juice (1000ml)' })


  18 |   // Expected 1
  19 |   const productDialog = page.getByRole('dialog', { name: 'Banana Juice (1000ml)' });
> 20 |   await expect(productDialog).toBeVisible();
     |                               ^
  21 |   await expect(
  22 |     productDialog.getByRole('heading', { name: 'Banana Juice (1000ml)' })
  23 |   ).toBeVisible();
    at /Users/nbryk/Desktop/university/звіт аспірантура/Scopus project/App/testcase-to-playwright-agent/generated/main/deepseek-v4.1-flash/R3/rep3/JS-07.spec.ts:20:31
```

Page URL at the moment of failure: http://localhost:3000/#/

Accessibility snapshot of the page at the moment of failure:
```yaml
- text: Language has been changed to English
- button "Force page reload"
- dialog:
  - img "Banana Juice (1000ml)"
  - heading "Banana Juice (1000ml)" [level=1]
  - text: Monkeys love it the most.
  - paragraph: 1.99¤
  - separator
  - button
  - button "Reviews (13)"
  - separator
  - button "Close Dialog": Close
```
A screenshot of the page at the moment of failure is attached.

Fix the test so that it passes while still reproducing every step and verifying every expected
result of the test case. You may change how an element is located or how a step is performed,
but never remove or weaken an assertion. Return the complete corrected file.
