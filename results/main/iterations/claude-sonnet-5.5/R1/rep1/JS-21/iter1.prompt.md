Convert the following manual test case into a Playwright test.

## Application
Base URL: http://localhost:3000
Start page: /
The welcome dialog and the cookie banner are already dismissed by the test environment.
Registered test user: email qa_user@example.com, password QaPassword123!,
security question "Your eldest siblings middle name?", answer Kyiv.
Prices are shown with the currency sign ¤, for example 1.99¤.

## Manual test case
ID: JS-21
Title: Додавання нової адреси доставки
Preconditions:
- Вітальне вікно і банер про cookies уже закриті (налаштування тестового середовища)
- Користувач qa_user@example.com зареєстрований
- Користувач не увійшов до системи
- У користувача немає збережених адрес
Steps:
1. Відкрити головну сторінку.
2. Натиснути кнопку «Account» у верхній панелі.
3. Обрати пункт «Login».
4. Ввести в поле «Email» значення «qa_user@example.com».
5. Ввести в поле «Password» значення «QaPassword123!».
6. Натиснути кнопку «Log in».
7. Натиснути кнопку «Account» у верхній панелі.
8. Обрати пункт «Orders & Payment».
9. Обрати пункт «My saved addresses».
10. Натиснути кнопку «Add New Address».
11. Ввести в поле «Country» значення «Ukraine».
12. Ввести в поле «Name» значення «QA User».
13. Ввести в поле «Mobile Number» значення «5012345678».
14. Ввести в поле «ZIP Code» значення «01001».
15. Ввести в поле «Address» значення «Khreshchatyk 1».
16. Ввести в поле «City» значення «Kyiv».
17. Ввести в поле «State» значення «Kyiv».
18. Натиснути кнопку «Submit».
Expected results:
1. Відображається повідомлення «The address at Kyiv has been successfully added to your addresses.»
2. На сторінці «My saved addresses» відображається адреса з іменем «QA User» і містом «Kyiv».
