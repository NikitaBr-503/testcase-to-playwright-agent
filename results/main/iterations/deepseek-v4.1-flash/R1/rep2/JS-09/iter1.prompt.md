Convert the following manual test case into a Playwright test.

## Application
Base URL: http://localhost:3000
Start page: /
The welcome dialog and the cookie banner are already dismissed by the test environment.
Registered test user: email qa_user@example.com, password QaPassword123!,
security question "Your eldest siblings middle name?", answer Kyiv.
Prices are shown with the currency sign ¤, for example 1.99¤.

## Manual test case
ID: JS-09
Title: Перехід на сторінку «About Us» через бічне меню
Preconditions:
- Вітальне вікно і банер про cookies уже закриті (налаштування тестового середовища)
- Користувач не увійшов до системи
Steps:
1. Відкрити головну сторінку.
2. Натиснути кнопку меню (☰) у лівому верхньому куті.
3. Обрати пункт «About Us».
Expected results:
1. Відкрилася сторінка із заголовком «About Us».
2. На сторінці є розділ «Corporate History & Policy».
