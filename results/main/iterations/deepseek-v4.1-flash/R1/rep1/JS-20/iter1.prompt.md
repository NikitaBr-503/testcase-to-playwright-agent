Convert the following manual test case into a Playwright test.

## Application
Base URL: http://localhost:3000
Start page: /
The welcome dialog and the cookie banner are already dismissed by the test environment.
Registered test user: email qa_user@example.com, password QaPassword123!,
security question "Your eldest siblings middle name?", answer Kyiv.
Prices are shown with the currency sign ¤, for example 1.99¤.

## Manual test case
ID: JS-20
Title: Зміна кількості товару в кошику
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
7. Натиснути кнопку «Add to Basket» на картці товару «Apple Juice (1000ml)».
8. Натиснути кнопку кошика «Your Basket» у верхній панелі.
9. У рядку товару «Apple Juice (1000ml)» натиснути кнопку збільшення кількості (іконка «+»).
10. У рядку товару натиснути кнопку зменшення кількості (іконка «−»).
Expected results:
1. Після кроку 9 кількість товару дорівнює 2, а загальна сума становить «Total Price: 3.98¤».
2. Після кроку 10 кількість товару дорівнює 1, а загальна сума становить «Total Price: 1.99¤».
