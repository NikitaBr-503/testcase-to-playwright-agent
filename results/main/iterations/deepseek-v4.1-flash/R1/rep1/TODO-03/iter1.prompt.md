Convert the following manual test case into a Playwright test.

## Application
Base URL: http://localhost:7002
Start page: /
The application does not persist todos, so every test starts with an empty list.

## Manual test case
ID: TODO-03
Title: Порожнє завдання не додається
Preconditions:
- Список завдань порожній (застосунок не зберігає завдання між запусками)
Steps:
1. Ввести в поле «What needs to be done?» лише кілька пробілів і натиснути Enter.
Expected results:
1. Список завдань залишається порожнім.
2. Нижня панель з лічильником і фільтрами не відображається.
