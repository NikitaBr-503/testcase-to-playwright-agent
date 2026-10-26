Convert the following manual test case into a Playwright test.

## Application
Base URL: http://localhost:3000
Start page: /
The welcome dialog and the cookie banner are already dismissed by the test environment.
Registered test user: email qa_user@example.com, password QaPassword123!,
security question "Your eldest siblings middle name?", answer Kyiv.
Prices are shown with the currency sign ¤, for example 1.99¤.

## Manual test case
ID: JS-02
Title: Успішний вхід зареєстрованого користувача
Preconditions:
- Вітальне вікно і банер про cookies уже закриті (налаштування тестового середовища)
- Користувач qa_user@example.com зареєстрований
- Користувач не увійшов до системи
Steps:
1. Відкрити головну сторінку.
2. Натиснути кнопку «Account» у верхній панелі.
3. Обрати пункт «Login».
4. Ввести в поле «Email» значення «qa_user@example.com».
5. Ввести в поле «Password» значення «QaPassword123!».
6. Натиснути кнопку «Log in».
7. Натиснути кнопку «Account» у верхній панелі.
Expected results:
1. Сторінка входу закрилася, відображається каталог товарів.
2. У меню «Account» відображається адреса «qa_user@example.com» і пункт «Logout».

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
