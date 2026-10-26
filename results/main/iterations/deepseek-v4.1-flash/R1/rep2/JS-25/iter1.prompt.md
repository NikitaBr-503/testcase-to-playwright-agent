Convert the following manual test case into a Playwright test.

## Application
Base URL: http://localhost:3000
Start page: /
The welcome dialog and the cookie banner are already dismissed by the test environment.
Registered test user: email qa_user@example.com, password QaPassword123!,
security question "Your eldest siblings middle name?", answer Kyiv.
Prices are shown with the currency sign ¤, for example 1.99¤.

## Manual test case
ID: JS-25
Title: Повне оформлення замовлення з оплатою карткою
Preconditions:
- Вітальне вікно і банер про cookies уже закриті (налаштування тестового середовища)
- Користувач qa_user@example.com зареєстрований
- Користувач не увійшов до системи
- Кошик користувача порожній
- У користувача немає збережених адрес і карток
Steps:
1. Відкрити головну сторінку.
2. Натиснути кнопку «Account» у верхній панелі.
3. Обрати пункт «Login».
4. Ввести в поле «Email» значення «qa_user@example.com».
5. Ввести в поле «Password» значення «QaPassword123!».
6. Натиснути кнопку «Log in».
7. Натиснути кнопку «Add to Basket» на картці товару «Apple Juice (1000ml)».
8. Натиснути кнопку кошика «Your Basket» у верхній панелі.
9. Натиснути кнопку «Checkout».
10. На сторінці «Select an address» натиснути кнопку «Add New Address».
11. Ввести в поле «Country» значення «Ukraine».
12. Ввести в поле «Name» значення «QA User».
13. Ввести в поле «Mobile Number» значення «5012345678».
14. Ввести в поле «ZIP Code» значення «01001».
15. Ввести в поле «Address» значення «Khreshchatyk 1».
16. Ввести в поле «City» значення «Kyiv».
17. Ввести в поле «State» значення «Kyiv».
18. Натиснути кнопку «Submit».
19. Обрати збережену адресу «QA User» у списку адрес.
20. Натиснути кнопку «Continue».
21. Обрати спосіб доставки «Standard Delivery».
22. Натиснути кнопку «Continue».
23. Розгорнути розділ «Add new card».
24. Ввести в поле «Name» значення «QA User».
25. Ввести в поле «Card Number» тестовий номер «4111111111111111».
26. У списку «Expiry Month» обрати «12».
27. У списку «Expiry Year» обрати «2090».
28. Натиснути кнопку «Submit» у розділі картки.
29. Обрати збережену картку, що закінчується на «1111».
30. Натиснути кнопку «Continue».
31. Натиснути кнопку «Place your order and pay».
32. Натиснути кнопку «Account» у верхній панелі.
33. Обрати пункт «Orders & Payment».
34. Обрати пункт «Order History».
Expected results:
1. Відображається повідомлення «Thank you for your purchase!»
2. На сторінці підтвердження зазначено товар «Apple Juice (1000ml)».
3. На сторінці «Order History» перше (найновіше) замовлення містить товар «Apple Juice (1000ml)» і має статус «In Transit».
