"""Building model requests for modes R1, R2 and R3 from the templates in prompts/."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional

from .config import ROOT, AppConfig
from .runner import RunResult
from .testcase import TestCase

PROMPTS = ROOT / "prompts"
MAX_SNAPSHOT_CHARS = 15000


def _template(name: str) -> str:
    return (PROMPTS / name).read_text(encoding="utf-8")


def _cap(text: str, limit: int = MAX_SNAPSHOT_CHARS) -> str:
    text = (text or "").strip()
    if len(text) <= limit:
        return text
    return text[:limit] + f"\n# … truncated, {len(text) - limit} more characters"


def _fill(template: str, **values) -> str:
    # str.format would break on the braces inside code and YAML, so placeholders are replaced one by one.
    for key, value in values.items():
        template = template.replace("{" + key + "}", str(value))
    return template


@dataclass
class Feedback:
    """Execution feedback F_i passed to the model in mode R3 (article, section 4.5)."""
    previous_code: str
    run: Optional[RunResult]
    failed_marker: Optional[str]
    note: str = ""  # used when the answer contained no code block


def system_prompt() -> str:
    return _template("system.md").strip()


def user_prompt(tc: TestCase, app: AppConfig, start_snapshot: Optional[str],
                feedback: Optional[Feedback], iteration: int, max_iterations: int,
                with_screenshot: bool) -> str:
    page_context = ""
    if start_snapshot is not None:
        page_context = _fill(_template("page_context.md"), start_url=app.start_url,
                             snapshot=_cap(start_snapshot))
    text = _fill(_template("generate.md"), base_url=app.base_url, start_path=app.start_path,
                 app_context=app.context or "", testcase=tc.render(), page_context=page_context)
    if feedback is not None:
        run = feedback.run
        error = feedback.note or (run.error if run else "") or "(no error message)"
        text += _fill(
            _template("repair.md"),
            iteration=iteration - 1,
            max_iterations=max_iterations,
            previous_code=feedback.previous_code.strip(),
            failed_step=feedback.failed_marker or "unknown",
            failed_line=(run.line if run and run.line else "unknown"),
            error=error.strip(),
            failure_url=(run.url if run and run.url else "unknown"),
            failure_snapshot=_cap(run.aria_snapshot if run else "") or "(not available)",
            screenshot_note=("A screenshot of the page at the moment of failure is attached."
                             if with_screenshot else ""),
        )
    return text.strip() + "\n"
