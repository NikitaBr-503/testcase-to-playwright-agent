Convert the following manual test case into a Playwright test.

## Application
Base URL: http://localhost:3000
Start page: /
The welcome dialog and the cookie banner are already dismissed by the test environment.
Registered test user: email qa_user@example.com, password QaPassword123!,
security question "Your eldest siblings middle name?", answer Kyiv.
Prices are shown with the currency sign ¤, for example 1.99¤.

## Manual test case
ID: JS-13
Title: Реєстрація з паролями, що не збігаються
Preconditions:
- Вітальне вікно і банер про cookies уже закриті (налаштування тестового середовища)
- Користувач не увійшов до системи
Steps:
1. Відкрити головну сторінку.
2. Натиснути кнопку «Account» у верхній панелі.
3. Обрати пункт «Login».
4. Натиснути посилання «Not yet a customer?».
5. Ввести в поле «Email» значення «mismatch@example.com».
6. Ввести в поле «Password» значення «Secret123!».
7. Ввести в поле «Repeat Password» значення «Secret999!».
Expected results:
1. Під полем «Repeat Password» відображається помилка «Passwords do not match».
2. Кнопка «Register» недоступна для натискання.
