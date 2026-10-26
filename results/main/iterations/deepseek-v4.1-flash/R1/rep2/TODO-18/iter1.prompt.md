Convert the following manual test case into a Playwright test.

## Application
Base URL: http://localhost:7002
Start page: /
The application does not persist todos, so every test starts with an empty list.

## Manual test case
ID: TODO-18
Title: Повний сценарій роботи зі списком
Preconditions:
- Список завдань порожній (застосунок не зберігає завдання між запусками)
Steps:
1. Ввести в поле «What needs to be done?» текст «Купити молоко» і натиснути Enter.
2. Ввести в поле «What needs to be done?» текст «Написати статтю» і натиснути Enter.
3. Ввести в поле «What needs to be done?» текст «Подзвонити керівнику» і натиснути Enter.
4. Ввести в поле «What needs to be done?» текст «Забронювати квиток» і натиснути Enter.
5. Натиснути прапорець ліворуч від завдання «Купити молоко».
6. Натиснути прапорець ліворуч від завдання «Забронювати квиток».
7. Двічі клацнути на тексті завдання «Написати статтю».
8. Замінити текст завдання на «Написати статтю для Scopus».
9. Натиснути Enter.
10. Натиснути фільтр «Active» внизу списку.
11. Натиснути кнопку «Clear completed» внизу списку.
12. Натиснути фільтр «All» внизу списку.
Expected results:
1. Після кроку 10 у фільтрі «Active» відображаються лише «Написати статтю для Scopus» і «Подзвонити керівнику».
2. Після кроку 12 у списку залишилися лише ці два завдання, лічильник показує «2 items left!».
