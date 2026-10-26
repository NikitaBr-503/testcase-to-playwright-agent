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
