Convert the following manual test case into a Playwright test.

## Application
Base URL: http://localhost:3000
Start page: /
The welcome dialog and the cookie banner are already dismissed by the test environment.
Registered test user: email qa_user@example.com, password QaPassword123!,
security question "Your eldest siblings middle name?", answer Kyiv.
Prices are shown with the currency sign ¤, for example 1.99¤.

## Manual test case
ID: JS-04
Title: Пошук товару, якого немає в каталозі
Preconditions:
- Вітальне вікно і банер про cookies уже закриті (налаштування тестового середовища)
- Користувач не увійшов до системи
Steps:
1. Відкрити головну сторінку.
2. Натиснути іконку пошуку (лупа) у верхній панелі.
3. Ввести в поле пошуку текст «zzzz» і натиснути Enter.
Expected results:
1. Відображається повідомлення «No results found».
2. Жодної картки товару не відображається.
