# Baseline: reference Playwright tests for the ten baseline test cases

The folder holds a hand-style, production-quality implementation of the ten test cases used as the
manual baseline in the article (section 4.8, table 6): JS-04, JS-07, JS-17, JS-20, JS-21, JS-22,
TODO-10, TODO-16, TODO-17, TODO-20.

* **Who wrote it.** The code was written by an AI assistant (Claude) at the researcher's request and
  reviewed by the researcher. It is **not** the source of the baseline time.
* **Where the baseline time comes from.** `results/main/baseline.csv`, column `manual_time_min`,
  `time_source = expert_estimate`: the researcher's estimate, from years of industrial practice with
  similar web applications, of how long a QA engineer needs to automate each test case to the same
  standard as this folder (Page Object, test data in separate files, API-based data set-up). The
  times were not measured while writing these files.
* **Why it is published.** It shows the quality level the estimate refers to and lets a reader compare
  it with the agent's output (flat single-file specs).

Structure:

```
baseline/
  playwright.config.ts     projects juice-shop (http://localhost:3000) and todomvc (http://localhost:7002)
  fixtures.ts              page objects as fixtures; dismissed welcome/cookie banners; API reset of the test user
  pages/juice-shop/*.ts    NavBar, LoginPage, RegistrationPage, CatalogPage, BasketPage, AddressPage, ChangePasswordPage
  pages/todomvc/TodoPage.ts
  data/**/*.json           test data and expected messages
  helpers/                 data access, Juice Shop REST API client (same steps as apps/juice_shop_reset.py)
  tests/<app>/<TC>.spec.ts one test per test case, steps as test.step('Step N …')
```

Run from the repository root with both applications running:

```bash
npx playwright test -c baseline/playwright.config.ts --repeat-each 3
```

Checked on OWASP Juice Shop 20.3.0 and TodoMVC React (ff43b02): 30 of 30 runs passed.
