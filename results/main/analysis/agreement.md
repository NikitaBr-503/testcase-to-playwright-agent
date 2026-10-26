# Agreement: assistant vs researcher (blind re-assessment)

## random sample

| Label | Pairs | Agreement, % | Cohen's κ | Disagreements |
| --- | --- | --- | --- | --- |
| steps_ok | 40 | 100.0 | n/a (one class only) | 0 |
| asserts_ok | 40 | 100.0 | n/a (one class only) | 0 |
| both (success) | 40 | 100.0 | n/a (one class only) | 0 |

## all rejected by the assistant

| Label | Pairs | Agreement, % | Cohen's κ | Disagreements |
| --- | --- | --- | --- | --- |
| steps_ok | 7 | 100.0 | n/a (one class only) | 0 |
| asserts_ok | 7 | 0.0 | 0.00 | 7 |
| both (success) | 7 | 0.0 | 0.00 | 7 |

## pooled (random sample + rejected)

| Label | Pairs | Agreement, % | Cohen's κ | Disagreements |
| --- | --- | --- | --- | --- |
| steps_ok | 47 | 100.0 | n/a (one class only) | 0 |
| asserts_ok | 47 | 85.1 | 0.00 | 7 |
| both (success) | 47 | 85.1 | 0.00 | 7 |


Disagreements:
- claude-sonnet-5.5/R3/1/JS-25: assistant 1/0, researcher 1/1 – 
- claude-sonnet-5.5/R3/2/JS-05: assistant 1/0, researcher 1/1 – 
- claude-sonnet-5.5/R3/1/JS-05: assistant 1/0, researcher 1/1 – 
- claude-sonnet-5.5/R3/3/JS-25: assistant 1/0, researcher 1/1 – 
- deepseek-v4.1-flash/R1/1/TODO-04: assistant 1/0, researcher 1/1 – 
- deepseek-v4.1-flash/R1/3/TODO-16: assistant 1/0, researcher 1/1 – 
- deepseek-v4.1-flash/R2/2/TODO-04: assistant 1/0, researcher 1/1 – 
