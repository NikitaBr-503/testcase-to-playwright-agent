Convert the following manual test case into a Playwright test.

## Application
Base URL: http://localhost:3000
Start page: /
The welcome dialog and the cookie banner are already dismissed by the test environment.
Registered test user: email qa_user@example.com, password QaPassword123!,
security question "Your eldest siblings middle name?", answer Kyiv.
Prices are shown with the currency sign ¤, for example 1.99¤.

## Manual test case
ID: JS-18
Title: Подання скарги
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
7. Натиснути кнопку меню (☰) у лівому верхньому куті.
8. Обрати пункт «Complaint».
9. Ввести в поле «Message» текст «Замовлення доставлено пошкодженим».
10. Натиснути кнопку «Submit».
Expected results:
1. Поле «Customer» заповнене адресою «qa_user@example.com».
2. Відображається повідомлення, що починається словами «Customer support will get in touch with you soon! Your complaint reference is #».
