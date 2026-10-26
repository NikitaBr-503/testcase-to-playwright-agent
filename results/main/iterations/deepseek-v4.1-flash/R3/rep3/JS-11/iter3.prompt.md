Convert the following manual test case into a Playwright test.

## Application
Base URL: http://localhost:3000
Start page: /
The welcome dialog and the cookie banner are already dismissed by the test environment.
Registered test user: email qa_user@example.com, password QaPassword123!,
security question "Your eldest siblings middle name?", answer Kyiv.
Prices are shown with the currency sign ¤, for example 1.99¤.

## Manual test case
ID: JS-11
Title: Зміна кількості товарів на сторінці
Preconditions:
- Вітальне вікно і банер про cookies уже закриті (налаштування тестового середовища)
- Користувач не увійшов до системи
Steps:
1. Відкрити головну сторінку.
2. У списку «Items per page» під каталогом обрати значення «30».
Expected results:
1. Під каталогом відображається діапазон «1 – 30 of 46».
2. На сторінці відображається 30 карток товарів.

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

test('JS-11 Зміна кількості товарів на сторінці', async ({ page }) => {
  // Preconditions
  // The welcome dialog and the cookie banner are already dismissed by the test environment.
  // The user is not logged in, so no authentication steps are performed.

  // Step 1
  await page.goto('/');
  await expect(page.getByText('All Products')).toBeVisible();

  // Step 2
  const itemsPerPage = page.getByRole('combobox', { name: 'Items per page:' });
  await expect(itemsPerPage).toBeVisible();
  // The paginator's touch-target overlay intercepts pointer clicks on the select,
  // so the dropdown is opened with the keyboard, the way a keyboard user would.
  await itemsPerPage.press('Enter');
  const option30 = page.getByRole('option', { name: '30', exact: true });
  await expect(option30).toBeVisible();
  await option30.click();

  // Expected 1
  const rangeStatus = page.getByRole('status').filter({ hasText: 'of 46' });
  await expect(rangeStatus).toBeVisible();
  await expect(rangeStatus).toHaveText(/^1\s*[–—-]\s*30 of 46$/);

  // Expected 2
  await expect(page.getByRole('article')).toHaveCount(30);
});
```

## Execution feedback
Failed test case step: Expected 1
Line in the test file: 24
Error:
```
Error: expect(locator).toHaveText(expected) failed

Locator: getByRole('status').filter({ hasText: 'of 46' })
Expected pattern: /^1\s*[–—-]\s*30 of 46$/
Received string:  " 1 – 30 of 46 "
Timeout: 5000ms

Call log:
  - Expect "toHaveText" getByRole('status').filter({ hasText: 'of 46' }) with timeout 5000ms
  - waiting for getByRole('status').filter({ hasText: 'of 46' })
    14 × locator resolved to <div role="status" aria-atomic="true" aria-live="polite" class="mat-mdc-paginator-range-label"> 1 – 30 of 46 </div>
       - unexpected value " 1 – 30 of 46 "


  22 |   const rangeStatus = page.getByRole('status').filter({ hasText: 'of 46' });
  23 |   await expect(rangeStatus).toBeVisible();
> 24 |   await expect(rangeStatus).toHaveText(/^1\s*[–—-]\s*30 of 46$/);
     |                             ^
  25 |
  26 |   // Expected 2
  27 |   await expect(page.getByRole('article')).toHaveCount(30);
    at /Users/nbryk/Desktop/university/звіт аспірантура/Scopus project/App/testcase-to-playwright-agent/generated/main/deepseek-v4.1-flash/R3/rep3/JS-11.spec.ts:24:29
```

Page URL at the moment of failure: http://localhost:3000/#/

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
  - article:
    - button "Click for more information about the product":
      - img "Lemon Juice (500ml)"
      - text: Lemon Juice (500ml)
    - text: 2.99¤
    - button "Add to Basket"
  - article:
    - complementary: Only 3 left
    - button "Click for more information about the product":
      - img "Melon Bike (Comeback-Product 2018 Edition)"
      - text: Melon Bike (Comeback-Product 2018 Edition)
    - text: 2999¤
    - button "Add to Basket"
  - article:
    - button "Click for more information about the product":
      - img "Melon Juice (1000ml)"
      - text: Melon Juice (1000ml)
    - text: 2.49¤
    - button "Add to Basket"
  - article:
    - complementary: Sold Out
    - button "Click for more information about the product":
      - img "OWASP Juice Shop \"King of the Hill\" Facemask"
      - text: OWASP Juice Shop "King of the Hill" Facemask
    - text: 13.49¤
    - button "Add to Basket"
  - article:
    - button "Click for more information about the product":
      - img "OWASP Juice Shop CTF Girlie-Shirt"
      - text: OWASP Juice Shop CTF Girlie-Shirt
    - text: 22.49¤
    - button "Add to Basket"
  - article:
    - complementary: Only 3 left
    - button "Click for more information about the product":
      - img "OWASP Juice Shop Card (non-foil)"
      - text: OWASP Juice Shop Card (non-foil)
    - text: 1000¤
    - button "Add to Basket"
  - article:
    - complementary: Sold Out
    - button "Click for more information about the product":
      - img "OWASP Juice Shop Coaster (10pcs)"
      - text: OWASP Juice Shop Coaster (10pcs)
    - text: 19.99¤
    - button "Add to Basket"
  - article:
    - complementary: Sold Out
    - button "Click for more information about the product":
      - img "OWASP Juice Shop Holographic Sticker"
      - text: OWASP Juice Shop Holographic Sticker
    - text: 2¤
    - button "Add to Basket"
  - article:
    - button "Click for more information about the product":
      - img "OWASP Juice Shop Hoodie"
      - text: OWASP Juice Shop Hoodie
    - text: 49.99¤
    - button "Add to Basket"
  - article:
    - button "Click for more information about the product":
      - img "OWASP Juice Shop Iron-Ons (16pcs)"
      - text: OWASP Juice Shop Iron-Ons (16pcs)
    - text: 14.99¤
    - button "Add to Basket"
  - article:
    - complementary: Only 3 left
    - button "Click for more information about the product":
      - img "OWASP Juice Shop LEGO™ Tower"
      - text: OWASP Juice Shop LEGO™ Tower
    - text: 799¤
    - button "Add to Basket"
  - article:
    - button "Click for more information about the product":
      - img "OWASP Juice Shop Logo (3D-printed)"
      - text: OWASP Juice Shop Logo (3D-printed)
    - text: 99.99¤
    - button "Add to Basket"
  - article:
    - button "Click for more information about the product":
      - img "OWASP Juice Shop Magnets (16pcs)"
      - text: OWASP Juice Shop Magnets (16pcs)
    - text: 15.99¤
    - button "Add to Basket"
  - article:
    - button "Click for more information about the product":
      - img "OWASP Juice Shop Mug"
      - text: OWASP Juice Shop Mug
    - text: 21.99¤
    - button "Add to Basket"
  - article:
    - button "Click for more information about the product":
      - img "OWASP Juice Shop Sticker Page"
      - text: OWASP Juice Shop Sticker Page
    - text: 9.99¤
    - button "Add to Basket"
  - group:
    - combobox "Items per page:": "30"
    - status: 1 – 30 of 46
    - button "Previous page" [disabled]
    - button "Next page"
- text: Language has been changed to English
- button "Force page reload"
```
A screenshot of the page at the moment of failure is attached.

Fix the test so that it passes while still reproducing every step and verifying every expected
result of the test case. You may change how an element is located or how a step is performed,
but never remove or weaken an assertion. Return the complete corrected file.
