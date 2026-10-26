Convert the following manual test case into a Playwright test.

## Application
Base URL: http://localhost:3000
Start page: /
The welcome dialog and the cookie banner are already dismissed by the test environment.
Registered test user: email qa_user@example.com, password QaPassword123!,
security question "Your eldest siblings middle name?", answer Kyiv.
Prices are shown with the currency sign ¤, for example 1.99¤.

## Manual test case
ID: JS-19
Title: Пошук товару та додавання його до кошика
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
7. Натиснути іконку пошуку (лупа) у верхній панелі.
8. Ввести в поле пошуку текст «banana» і натиснути Enter.
9. Натиснути кнопку «Add to Basket» на картці товару «Banana Juice (1000ml)».
Expected results:
1. Відображається заголовок «Search Results - banana».
2. Відображається повідомлення «Placed Banana Juice (1000ml) into basket.»
3. Лічильник на кнопці кошика показує 1.

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

test('JS-19 Пошук товару та додавання його до кошика', async ({ page }) => {
  // Preconditions
  // The welcome dialog and the cookie banner are already dismissed by the test environment.
  // The registered user qa_user@example.com exists and the user's basket is empty
  // (the empty basket is verified right after the start page has been opened).

  // Step 1
  await page.goto('/');

  // Preconditions: the basket of the registered user is empty
  const basketButton = page.getByRole('button', { name: 'Show the shopping cart' });
  await expect(basketButton).toContainText(/Your Basket\s*0/);

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page
    .getByRole('textbox', { name: 'Text field for the login email' })
    .fill('qa_user@example.com');

  // Step 5
  await page
    .getByRole('textbox', { name: 'Text field for the login password' })
    .fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page).not.toHaveURL(/\/login/);

  // Step 7
  await page.getByRole('button', { name: 'Open search' }).click();

  // Step 8
  const searchInput = page.getByRole('textbox').first();
  await searchInput.fill('banana');
  await searchInput.press('Enter');

  // Expected 1
  await expect(page.getByRole('heading', { name: 'Search Results - banana' })).toBeVisible();

  // Step 9
  const bananaJuiceCard = page
    .locator('article')
    .filter({ hasText: 'Banana Juice (1000ml)' });
  await bananaJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Expected 2
  await expect(
    page.getByText('Placed Banana Juice (1000ml) into basket.', { exact: true }),
  ).toBeVisible();

  // Expected 3
  await expect(basketButton).toContainText(/Your Basket\s*1/);
});
```

## Execution feedback
Failed test case step: Step 6
Line in the test file: 32
Error:
```
TimeoutError: locator.click: Timeout 10000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Log in' })


  30 |
  31 |   // Step 6
> 32 |   await page.getByRole('button', { name: 'Log in' }).click();
     |                                                      ^
  33 |   await expect(page).not.toHaveURL(/\/login/);
  34 |
  35 |   // Step 7
    at /Users/nbryk/Desktop/university/звіт аспірантура/Scopus project/App/testcase-to-playwright-agent/generated/main/deepseek-v4.1-flash/R3/rep3/JS-19.spec.ts:32:54
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
    - text: QaPassword123!
  - button "Show password"
  - link "Forgot your password?":
    - /url: "#/forgot-password"
  - button "Login": Log in
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
