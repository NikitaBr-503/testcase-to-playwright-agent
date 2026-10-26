Convert the following manual test case into a Playwright test.

## Application
Base URL: http://localhost:3000
Start page: /
The welcome dialog and the cookie banner are already dismissed by the test environment.
Registered test user: email qa_user@example.com, password QaPassword123!,
security question "Your eldest siblings middle name?", answer Kyiv.
Prices are shown with the currency sign ¤, for example 1.99¤.

## Manual test case
ID: JS-14
Title: Додавання відгуку до товару
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
7. Натиснути на назву товару «Banana Juice (1000ml)» у каталозі.
8. Ввести в поле «Review» текст «Дуже смачно <унікальне число>» (текст має бути унікальним).
9. Натиснути кнопку «Submit» у вікні товару.
Expected results:
1. Відображається повідомлення «You review has been saved.»
2. У розділі «Reviews» з'явився відгук із введеним текстом.
