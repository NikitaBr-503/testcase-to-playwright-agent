# testcase-to-playwright-agent

Агент на основі великої мовної моделі (ВММ), який перетворює ручний тест-кейс, записаний природною
мовою, на виконуваний тест [Playwright](https://playwright.dev). Репозиторій містить код агента,
тест-кейси, інструкції для моделей і скрипт аналізу до статті
«Автоматизоване перетворення ручних тест-кейсів на виконувані тести інтерфейсу вебзастосунків
за допомогою агентів на основі великих мовних моделей».

*An LLM agent that converts manual natural-language test cases into executable Playwright tests,
with a self-correction loop driven by execution feedback. English summary at the end.*

## Що робить агент

Порівнюються три режими (стаття, п. 4.5):

| Режим | Що отримує модель | Скільки запусків тесту |
| --- | --- | --- |
| R1 | лише текст тест-кейсу | 1 |
| R2 | тест-кейс + дерево доступності стартової сторінки | 1 |
| R3 | як R2, а після невдачі ще й текст помилки, крок тест-кейсу, на якому вона сталася, знімок екрана та дерево доступності сторінки в момент помилки | до K (за замовчуванням 5) |

Агент також перевіряє, чи не «досяг» він проходження тесту, видаливши перевірки. Такі тести
позначаються `needs_review` і мають бути перевірені вручну.

## Структура

```
agent/              код агента (Python, лише стандартна бібліотека + PyYAML)
  cli.py            команди: list, check, snapshot, run, exec, export-eval
  loop.py           цикл «генерація – запуск – виправлення» для режимів R1–R3
  llm.py            клієнти моделей: anthropic, openai_compatible, fake
  runner.py         запуск Playwright і збирання зворотного зв'язку
  code.py           вилучення коду, контроль перевірок, прив'язка помилки до кроку
  prompts.py        складання запитів із шаблонів у prompts/
  fixdiff.py        які кроки й очікувані результати змінено під час ручного виправлення
analysis/analyze.py розрахунок табл. 3–7 і рис. 2 статті
analysis/agreement.py узгодженість первинної оцінки і сліпої перевірки (п. 5.3)
baseline/           еталонна реалізація 10 тест-кейсів базової лінії (Page Object)
config/             experiment.yaml (основний експеримент), selftest.yaml (самоперевірка)
scripts/            знімок дерева доступності, перевірка і дебаг виправлених тестів
prompts/            тексти інструкцій для моделей (додаток до статті)
support/fixtures.ts фікстура, що зберігає знімок екрана і дерево доступності при невдачі
testcases/          ручні тест-кейси у форматі YAML (див. TEMPLATE.yaml)
apps/               як запустити застосунки, що тестуються
selftest/           маленька сторінка і заготовлені відповіді для самоперевірки
generated/main/     остаточний код кожного згенерованого тесту (810 файлів)
results/main/       дані експерименту: журнали, ітерації, ручна оцінка, виправлені тести, таблиці
```

## Встановлення

Потрібні Node.js 22+ і Python 3.9+ (у експерименті: Node.js 24, Python 3.12, Playwright 1.64.1).

```bash
npm install
npx playwright install chromium
python3 -m venv .venv               # віртуальне середовище Python для проєкту
source .venv/bin/activate           # у Windows: .venv\Scripts\activate
python -m pip install -r requirements.txt
cp .env.example .env                # впишіть API-ключі у файл .env
```

Команду `source .venv/bin/activate` треба виконувати в кожному новому вікні терміналу перед роботою
з агентом. Ознака активного середовища – `(.venv)` на початку рядка.

Файл `.env` з ключами не потрапляє в git. Не надсилайте ключі нікому і не вставляйте їх у код.

## Самоперевірка (без витрат на API)

Перевіряє, що все встановлено правильно: фейкова модель повертає заготовлені відповіді, тести
запускаються на локальній сторінці. В одному терміналі:

```bash
python3 -m http.server 8765 -d selftest/app
```

В іншому (з активним віртуальним середовищем):

```bash
source .venv/bin/activate
python -m agent --config config/selftest.yaml check
python -m agent --config config/selftest.yaml run
```

Очікуваний результат: у режимах R1 і R2 обидва тести падають, у режимі R3 обидва проходять з
другої ітерації, а ST-02 позначено `needs review`, бо на другій ітерації «модель» видалила перевірку.

## Проведення експерименту

1. Запустіть застосунки (`apps/README.md`) і за потреби змініть їхні адреси в `config/experiment.yaml`.
2. Вкажіть моделі в розділі `models` того самого файлу.
3. Опишіть тест-кейси в `testcases/<застосунок>/<ID>.yaml` за шаблоном `testcases/TEMPLATE.yaml`
   і перевірте кожен вручну на застосунку.
4. Перевірте готовність:

   ```bash
   python -m agent list
   python -m agent check
   ```

5. Спершу пілот на кількох тест-кейсах і одній моделі:

   ```bash
   python -m agent run --testcases JS-01,TODO-01 --models claude-sonnet-5.5 --repeats 1
   ```

6. Повний експеримент. Уже виконані комбінації пропускаються, тому запуск можна переривати й
   продовжувати:

   ```bash
   python -m agent run
   ```

Що зберігається в `results/<назва>/`:

- `runs.jsonl` – запис на кожну комбінацію «тест-кейс – режим – модель – повторення»;
- `summary.csv` – та сама інформація у вигляді таблиці;
- `iterations/…/` – запит, відповідь моделі, код і знімок екрана кожної ітерації;
- `snapshots/` – дерева доступності стартових сторінок, що передавалися моделям.

## Ручна оцінка (стаття, п. 4.7–4.8)

```bash
python -m agent export-eval
```

Команда створює (або доповнює, не стираючи вже введене) два файли:

`results/<назва>/manual_eval.csv` – для кожного згенерованого тесту заповніть:

| Стовпець | Що вписати |
| --- | --- |
| `steps_ok` | 1, якщо кожен крок тест-кейсу відтворено відповідною дією, інакше 0 |
| `asserts_ok` | 1, якщо кожен очікуваний результат перевірено твердженням, інакше 0 |
| `fixed_steps` | номери кроків, код яких довелося змінити, через `;` (наприклад `2;5`), `all` або `0` |
| `fix_time_min` | скільки хвилин зайняло виправлення |
| `failure_cause` | основна причина невдачі: `locator`, `order`, `sync`, `ambiguity`, `hallucination`, `weak_assert`, `other` |
| `fixed_expected` | номери очікуваних результатів, перевірку яких довелося змінити, через `;`, або `0` |
| `evaluator` | хто оцінив або виправив тест: `researcher` або `claude` |
| `fixed_spec` | шлях до виправленого тесту в `results/<назва>/fixes/` |

Успіх і `steps_ok`/`asserts_ok` оцінюються для всіх повторень. Виправлення, час і причину
невдачі заповнюйте лише для повторення 1 (`rep = 1`).

### Як оцінено експеримент `main`

- `manual_eval.csv` уже заповнено: первинну оцінку всіх стабільних тестів і виправлення
  неуспішних тестів повторення 1 виконав Claude Opus 5.5 (`evaluator = claude`).
  Виправлені тести лежать у `results/main/fixes/<модель>/<режим>/rep1/`, а змінені кроки
  (`fixed_steps`, `fixed_expected`) обчислено за різницею з початковим кодом.
- `blind_check.csv` – незалежна перевірка дослідником: 40 випадково обраних стабільних тестів
  (вибірку зроблено до оцінювання) і всі тести, які Claude визнав неуспішними. Рядки перемішано.
  Заповніть `steps_ok`, `asserts_ok` (1/0) і за потреби `comment`, **не відкриваючи**
  `manual_eval.csv`. Потім:

  ```bash
  python analysis/agreement.py
  ```

- `timed_fixes.csv` – 12 неуспішних тестів, які дослідник виправляє сам із секундоміром.
  Початковий код уже скопійовано у файли зі стовпця `copy_to_fix`. Виправте файл, перевірте
  його командою нижче і впишіть `fixed_steps`, `fixed_expected`, `fix_time_min` і
  `failure_cause` у відповідний рядок `manual_eval.csv` (`evaluator = researcher`).
  Для решти виправлень час оцінюється як середній час виправлень дослідника того самого класу складності.
- `baseline.csv` – час ручної автоматизації (`manual_time_min`) для 10 тест-кейсів з
  позначкою `in_baseline = 1`; це експертна оцінка автора (`time_source = expert_estimate`), див. нижче.

- `adjudication.csv` – остаточне рішення щодо 7 розбіжностей між первинною оцінкою і сліпою перевіркою
  (після обговорення дослідник погодився з відхиленнями; сліпі оцінки в `blind_check.csv` не змінювались).

Запустити один виправлений тест у режимі дебагу (той самий набір cookies і скидання даних, що й в агента):

```bash
python scripts/debug_fix.py results/main/fixes/<модель>/<режим>/rep1/<TC>.spec.ts [--headed | --slow 500 | --ui]
```

Перевірити виправлені тести (кожен запускається тричі, обидва застосунки мають працювати):

```bash
python scripts/verify_fixes.py                 # усі виправлені тести
python scripts/verify_fixes.py --only JS-24    # лише один тест-кейс
```

Результат – `results/main/fixes/verify_report.csv`.

## Аналіз

```bash
python analysis/analyze.py
```

У `results/<назва>/analysis/` з'являються таблиці 3–7 статті (CSV), рис. 2 (PNG, 300 dpi)
і `summary.md` з числами для анотації та висновків (X, Y, A, B, T). Якщо ручну оцінку ще не
завершено, `summary.md` починається з попередження PROVISIONAL або INCOMPLETE.

## Ліцензія

Код поширюється за ліцензією MIT (див. `LICENSE`). Тест-кейси та дані експерименту в
`testcases/` і `results/` поширюються за ліцензією CC BY 4.0.

---

## English summary

The agent converts a manual test case (YAML: preconditions, steps, expected results) into a
Playwright Test file. Mode R1 gives the model the test case only, R2 adds the accessibility
snapshot of the start page, and R3 adds a self-correction loop of up to K runs. After each failed
run the model receives the error, the failed test case step, a screenshot and the accessibility
snapshot of the page at the moment of failure. Static checks flag tests in which assertions were
removed or weakened. Model clients use only the Python standard library (Anthropic Messages API and
any OpenAI-compatible endpoint). Run `python -m agent --help` for commands and
`python analysis/analyze.py` to compute the article's tables and figure.

## Базова лінія (t_руч)

* `results/main/baseline.csv`, колонка `manual_time_min` – час ручної автоматизації для 10 тест-кейсів
  базової лінії (`in_baseline = 1`). Колонка `time_source = expert_estimate`: це експертна оцінка автора
  (середній час за досвідом автоматизації подібних вебзастосунків для тестів з Page Object, даними в
  окремих файлах і підготовкою даних через API), а не вимірювання. Значення округлено до хвилин.
* `baseline/` – еталонна реалізація цих 10 тест-кейсів за тими самими практиками. Її написав
  ШІ-асистент (Claude) і перевірив автор; час її написання не є джерелом t_руч. Запуск:
  `npx playwright test -c baseline/playwright.config.ts --repeat-each 3`.
