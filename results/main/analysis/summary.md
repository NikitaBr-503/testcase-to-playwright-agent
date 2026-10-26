# Results of experiment 'main'

> ESTIMATED: fix time of 117 fixed test(s) taken as the mean of 12 timed fix(es) of the same complexity class (complex: 25.0 min, medium: 7.8 min, simple: 8.0 min).

Test cases: 45; steps S = 326; expected results: 96; applications: 2; models: claude-sonnet-5.5, deepseek-v4.1-flash.

## Table 4 – SR, % (mean ± SD over repetitions)

| model | R1 | R2 | R3 |
| --- | --- | --- | --- |
| claude-sonnet-5.5 | 34.1 ± 2.6 | 45.9 ± 2.6 | 96.3 ± 1.3 |
| deepseek-v4.1-flash | 20.7 ± 4.6 | 28.9 ± 2.2 | 88.9 ± 3.8 |

## Table 5 – McNemar, R1 vs R3

| model | pairs | b | c | chi2 | p_chi2 | p_exact | significant_0.05 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| claude-sonnet-5.5 | 45 | 29 | 0 | 27.03 | 0.00 | 0.00 | True |
| deepseek-v4.1-flash | 45 | 28 | 0 | 26.04 | 0.00 | 0.00 | True |

## Table 6 – fixes and time (repetition 1); baseline t_manual = 159.80 min

| model | mode | MFR_% | fixed_expected_% | t_gen_min | t_fix_min | t_prep_min | E_% | baseline_cases | tokens_k |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| claude-sonnet-5.5 | R1 | 23.62 | 15.62 | 0.25 | 7.89 | 8.14 | 93.04 | 10 | 2.11 |
| claude-sonnet-5.5 | R2 | 12.58 | 12.50 | 0.19 | 6.29 | 6.48 | 94.19 | 10 | 2.74 |
| claude-sonnet-5.5 | R3 | 0.00 | 2.08 | 0.37 | 0.73 | 1.10 | 99.72 | 10 | 7.68 |
| deepseek-v4.1-flash | R1 | 33.13 | 28.12 | 0.32 | 8.61 | 8.93 | 92.64 | 10 | 3.80 |
| deepseek-v4.1-flash | R2 | 29.45 | 29.17 | 0.49 | 8.47 | 8.96 | 93.13 | 10 | 5.26 |
| deepseek-v4.1-flash | R3 | 5.52 | 4.17 | 1.30 | 2.74 | 4.05 | 97.47 | 10 | 19.31 |

## R3 iterations

| model | combinations | mean_iterations_passed | passed_iter1_% | passed_iter2_% | passed_iter3plus_% | never_passed_% | flagged_for_review | flagged_and_rejected |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| claude-sonnet-5.5 | 135 | 1.77 | 47.41 | 33.33 | 18.52 | 0.74 | 0 | 0 |
| deepseek-v4.1-flash | 135 | 2.27 | 28.89 | 28.89 | 31.11 | 11.11 | 2 | 1 |

## Table 7 – causes of failure after R3

| cause | claude-sonnet-5.5 | deepseek-v4.1-flash |
| --- | --- | --- |
| Неправильний локатор | 0 | 2 |
| Помилка синхронізації | 0 | 1 |
| Вигаданий елемент або крок | 0 | 3 |
| Недостатня перевірка | 2 | 0 |

## Placeholders in the article

- claude-sonnet-5.5: X = 34.1 %, Y = 96.3 %, A = 23.6 %, B = 0.0 %, T = 99.7 %
- deepseek-v4.1-flash: X = 20.7 %, Y = 88.9 %, A = 33.1 %, B = 5.5 %, T = 97.5 %
