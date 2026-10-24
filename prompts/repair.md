
## Previous attempt
Your previous test (attempt {iteration} of {max_iterations}) failed when it was run.

```ts
{previous_code}
```

## Execution feedback
Failed test case step: {failed_step}
Line in the test file: {failed_line}
Error:
```
{error}
```

Page URL at the moment of failure: {failure_url}

Accessibility snapshot of the page at the moment of failure:
```yaml
{failure_snapshot}
```
{screenshot_note}

Fix the test so that it passes while still reproducing every step and verifying every expected
result of the test case. You may change how an element is located or how a step is performed,
but never remove or weaken an assertion. Return the complete corrected file.
