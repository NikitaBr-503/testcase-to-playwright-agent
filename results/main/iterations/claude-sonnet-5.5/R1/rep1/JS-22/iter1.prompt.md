Convert the following manual test case into a Playwright test.

## Application
Base URL: http://localhost:3000
Start page: /
The welcome dialog and the cookie banner are already dismissed by the test environment.
Registered test user: email qa_user@example.com, password QaPassword123!,
security question "Your eldest siblings middle name?", answer Kyiv.
Prices are shown with the currency sign ¤, for example 1.99¤.

## Manual test case
ID: JS-22
Title: Зміна пароля новим користувачем
Preconditions:
- Вітальне вікно і банер про cookies уже закриті (налаштування тестового середовища)
- Користувач не увійшов до системи
Steps:
1. Відкрити головну сторінку.
2. Натиснути кнопку «Account» у верхній панелі.
3. Обрати пункт «Login».
4. Натиснути посилання «Not yet a customer?».
5. Ввести в поле «Email» нову адресу виду «pwd_change_<унікальне число>@example.com» (адреса має бути унікальною) і запам'ятати її.
6. Ввести в поле «Password» значення «OldPass123!».
7. Ввести в поле «Repeat Password» значення «OldPass123!».
8. У списку «Security Question» обрати «Your eldest siblings middle name?».
9. Ввести в поле «Answer» значення «Kyiv».
10. Натиснути кнопку «Register».
11. Ввести в поле «Email» сторінки «Login» зареєстровану адресу.
12. Ввести в поле «Password» значення «OldPass123!».
13. Натиснути кнопку «Log in».
14. Натиснути кнопку «Account» у верхній панелі.
15. Обрати пункт «Privacy & Security».
16. Обрати пункт «Change Password».
17. Ввести в поле «Current Password» значення «OldPass123!».
18. Ввести в поле «New Password» значення «NewPass456!».
19. Ввести в поле «Repeat New Password» значення «NewPass456!».
20. Натиснути кнопку «Change».
Expected results:
1. Після реєстрації відображається повідомлення «Registration completed successfully. You can now log in.»
2. Після зміни пароля відображається повідомлення «Your password was successfully changed.»
