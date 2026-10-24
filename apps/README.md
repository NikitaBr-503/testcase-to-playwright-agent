# Застосунки для експерименту

Усі застосунки запускаються локально у фіксованій версії (стаття, п. 4.1–4.2).
Версії, які ви фактично використали, внесіть у табл. 2 статті та в `config/experiment.yaml`.

## OWASP Juice Shop

Репозиторій: https://github.com/juice-shop/juice-shop

```bash
docker compose -f apps/docker-compose.yml up -d juice-shop
# відкрити http://localhost:3000
```

Перед експериментом один раз зареєструйте тестового користувача з даними з `config/experiment.yaml`.
Після перезапуску контейнера база Juice Shop повертається до початкового стану, тому
`reset_cmd` перезапускає контейнер і реєстрацію тестового користувача доведеться
виконувати в передумовах тест-кейсу або окремим скриптом. TODO: вирішити, який варіант використати.

## TodoMVC

Репозиторій реалізацій: https://github.com/tastejs/todomvc

1. Оберіть одну реалізацію в каталозі `examples/` (наприклад, `examples/react`) і зафіксуйте коміт.
2. Зберіть і запустіть її: `cd examples/react && npm install && npm run build && npm run serve`.
3. Вкажіть адресу в `apps.todomvc.base_url`.

## RealWorld (Conduit)

Репозиторій: https://github.com/realworld-apps/realworld
Перелік реалізацій: https://codebase.show/projects/realworld
Демо (лише щоб подивитися, для експерименту не використовувати): https://demo.realworld.show

1. Оберіть фронтенд і бекенд, які запускаються локально, і зафіксуйте коміти.
2. Підготуйте скрипт, що відновлює початкову базу даних, і вкажіть його в `apps.conduit.reset_cmd`.
3. Зареєструйте тестового користувача.
