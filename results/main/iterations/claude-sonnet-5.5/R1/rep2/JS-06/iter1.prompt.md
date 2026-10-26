Convert the following manual test case into a Playwright test.

## Application
Base URL: http://localhost:3000
Start page: /
The welcome dialog and the cookie banner are already dismissed by the test environment.
Registered test user: email qa_user@example.com, password QaPassword123!,
security question "Your eldest siblings middle name?", answer Kyiv.
Prices are shown with the currency sign ¤, for example 1.99¤.

## Manual test case
ID: JS-06
Title: Реєстрація нового користувача
Preconditions:
- Вітальне вікно і банер про cookies уже закриті (налаштування тестового середовища)
- Користувач не увійшов до системи
Steps:
1. Відкрити головну сторінку.
2. Натиснути кнопку «Account» у верхній панелі.
3. Обрати пункт «Login».
4. Натиснути посилання «Not yet a customer?».
5. Ввести в поле «Email» нову адресу виду «new_user_<унікальне число>@example.com» (адреса має бути унікальною).
6. Ввести в поле «Password» значення «NewUser123!».
7. Ввести в поле «Repeat Password» значення «NewUser123!».
8. У списку «Security Question» обрати «Your eldest siblings middle name?».
9. Ввести в поле «Answer» значення «Kyiv».
10. Натиснути кнопку «Register».
Expected results:
1. Відображається повідомлення «Registration completed successfully. You can now log in.»
2. Відкрилася сторінка входу із заголовком «Login».
