# Застосунки для експерименту

Обидва застосунки запускаються локально з вихідного коду у фіксованих версіях (стаття, п. 4.2, табл. 2).
Потрібен Node.js 22 або новіший (перевірка: `node -v`). Клонуйте застосунки поза цим репозиторієм.

## OWASP Juice Shop 20.3.0 – http://localhost:3000

```bash
git clone --depth 1 --branch v20.3.0 https://github.com/juice-shop/juice-shop.git
cd juice-shop
npm install          # 5–15 хвилин, лише перший раз
npm start            # вікно не закривати, поки йде експеримент
```

Juice Shop очищає базу даних під час кожного запуску. Перед кожним запуском тесту агент виконує
`python3 apps/juice_shop_reset.py` (`reset_cmd` у `config/experiment.yaml`): скрипт створює тестового
користувача, якщо його немає, і очищає його кошик, збережені адреси та картки через REST API.

## TodoMVC (React, коміт ff43b02) – http://localhost:7002

```bash
git clone https://github.com/tastejs/todomvc.git
cd todomvc && git checkout ff43b02
cd examples/react
npm install
npm run serve
```

Застосунок не зберігає завдання між запусками, тому скидання даних не потрібне.
