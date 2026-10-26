Convert the following manual test case into a Playwright test.

## Application
Base URL: http://localhost:7002
Start page: /
The application does not persist todos, so every test starts with an empty list.

## Manual test case
ID: TODO-20
Title: Масове позначення, видалення і додавання завдань
Preconditions:
- Список завдань порожній (застосунок не зберігає завдання між запусками)
Steps:
1. Ввести в поле «What needs to be done?» текст «Купити молоко» і натиснути Enter.
2. Ввести в поле «What needs to be done?» текст «Написати статтю» і натиснути Enter.
3. Ввести в поле «What needs to be done?» текст «Подзвонити керівнику» і натиснути Enter.
4. Натиснути кнопку позначення всіх завдань (стрілка ліворуч від поля «What needs to be done?»).
5. Натиснути прапорець ліворуч від завдання «Написати статтю».
6. Натиснути кнопку «Clear completed» внизу списку.
7. Ввести в поле «What needs to be done?» текст «Підготувати презентацію» і натиснути Enter.
8. Натиснути кнопку позначення всіх завдань (стрілка ліворуч від поля «What needs to be done?»).
9. Натиснути фільтр «Completed» внизу списку.
10. Натиснути кнопку «Clear completed» внизу списку.
11. Ввести в поле «What needs to be done?» текст «Купити хліб» і натиснути Enter.
12. Натиснути фільтр «All» внизу списку.
Expected results:
1. Після кроку 6 у списку залишилося лише завдання «Написати статтю».
2. Після кроку 10 список порожній, а нижня панель з лічильником і фільтрами не відображається.
3. Після кроку 12 у списку лише завдання «Купити хліб», лічильник показує «1 item left!».
