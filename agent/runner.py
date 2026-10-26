"""Running generated tests with Playwright Test and collecting execution feedback."""

from __future__ import annotations

import json
import os
import re
import shutil
import subprocess
import time
from dataclasses import dataclass, field
from pathlib import Path
from typing import List, Optional

from .config import ROOT, AppConfig, Config

_ANSI = re.compile(r"\x1b\[[0-9;]*[A-Za-z]")
MAX_ERROR_CHARS = 4000


@dataclass
class RunResult:
    passed: bool
    status: str                      # passed | failed | timedOut | error | no_tests
    seconds: float
    error: str = ""
    line: Optional[int] = None       # line in the spec file where the error happened
    screenshot: Optional[Path] = None
    aria_snapshot: str = ""
    url: str = ""
    stdout_tail: str = ""
    statuses: List[str] = field(default_factory=list)


def strip_ansi(text: str) -> str:
    return _ANSI.sub("", text or "")


def npx() -> str:
    exe = shutil.which("npx") or shutil.which("npx.cmd")
    if not exe:
        raise RuntimeError("npx not found: install Node.js 18+ and run `npm install` in the repository")
    return exe


def reset_app(app: AppConfig) -> None:
    if app.reset_cmd:
        proc = subprocess.run(app.reset_cmd, shell=True, cwd=ROOT, capture_output=True, text=True)
        if proc.returncode != 0:
            raise RuntimeError(f"reset_cmd for '{app.id}' failed:\n{proc.stdout}\n{proc.stderr}")


def _walk_tests(suite: dict):
    for spec in suite.get("specs", []):
        for test in spec.get("tests", []):
            yield spec, test
    for child in suite.get("suites", []):
        yield from _walk_tests(child)


def _line_from(error: dict, spec_name: str) -> Optional[int]:
    loc = error.get("location") or {}
    if loc.get("file", "").endswith(spec_name) and loc.get("line"):
        return int(loc["line"])
    m = re.search(re.escape(spec_name) + r":(\d+):\d+", strip_ansi(error.get("stack", "") + error.get("message", "")))
    return int(m.group(1)) if m else None


def run_spec(spec: Path, app: AppConfig, cfg: Config, out_dir: Path, repeat_each: int = 1) -> RunResult:
    """Run one spec file and return pass/fail plus the failure context saved by support/fixtures.ts."""
    if out_dir.exists():
        shutil.rmtree(out_dir)
    out_dir.mkdir(parents=True)
    report = out_dir / "report.json"
    env = {
        **os.environ,
        "AGENT_BASE_URL": app.base_url,
        "AGENT_OUTPUT_DIR": str(out_dir / "artifacts"),
        "AGENT_TEST_TIMEOUT_MS": str(cfg.test_timeout_ms),
        "AGENT_ACTION_TIMEOUT_MS": str(cfg.action_timeout_ms),
        "AGENT_EXPECT_TIMEOUT_MS": str(cfg.expect_timeout_ms),
        "AGENT_INIT_COOKIES": json.dumps(app.init_cookies),
        "PLAYWRIGHT_JSON_OUTPUT_FILE": str(report),
        "PLAYWRIGHT_JSON_OUTPUT_NAME": str(report),
        "FORCE_COLOR": "0",
    }
    rel = spec.resolve().relative_to(ROOT).as_posix()
    cmd = [npx(), "playwright", "test", rel, "--reporter=json", "--workers=1",
           f"--repeat-each={repeat_each}", "--retries=0"]
    t0 = time.monotonic()
    proc = subprocess.run(cmd, cwd=ROOT, env=env, capture_output=True, text=True,
                          timeout=max(120, repeat_each * cfg.test_timeout_ms / 1000 * 2 + 60))
    seconds = time.monotonic() - t0
    tail = strip_ansi((proc.stdout or "")[-1500:] + (proc.stderr or "")[-1500:])

    if not report.exists():
        return RunResult(False, "error", seconds, error=tail[-MAX_ERROR_CHARS:] or "Playwright produced no report",
                         stdout_tail=tail)
    data = json.loads(report.read_text(encoding="utf-8"))

    statuses, first_error, line = [], None, None
    for suite in data.get("suites", []):
        for _spec, test in _walk_tests(suite):
            for res in test.get("results", []):
                statuses.append(res.get("status", "unknown"))
                errors = res.get("errors") or ([res["error"]] if res.get("error") else [])
                if errors and first_error is None:
                    first_error = errors[0]
                    line = _line_from(errors[0], spec.name)

    # Errors outside tests: TypeScript syntax errors, import errors, no tests found.
    top_errors = data.get("errors") or []
    if not statuses:
        msg = "\n".join(strip_ansi(e.get("message", "")) for e in top_errors) or "No tests were found in the file"
        ln = _line_from(top_errors[0], spec.name) if top_errors else None
        return RunResult(False, "no_tests" if not top_errors else "error", seconds,
                         error=msg[:MAX_ERROR_CHARS], line=ln, stdout_tail=tail)

    passed = all(s == "passed" for s in statuses) and not top_errors
    failing = [s for s in statuses if s != "passed"]
    status = "passed" if passed else (failing[0] if failing else "error")
    result = RunResult(passed, status, seconds, statuses=statuses, stdout_tail=tail)
    if first_error:
        result.error = strip_ansi(first_error.get("message", "") or first_error.get("value", ""))[:MAX_ERROR_CHARS]
        result.line = line
    elif top_errors:
        result.error = strip_ansi(top_errors[0].get("message", ""))[:MAX_ERROR_CHARS]

    artifacts = out_dir / "artifacts"
    if not passed and artifacts.exists():
        shot = next(iter(sorted(artifacts.rglob("failure.png"))), None)
        snap = next(iter(sorted(artifacts.rglob("aria-snapshot.yml"))), None)
        url = next(iter(sorted(artifacts.rglob("url.txt"))), None)
        result.screenshot = shot
        result.aria_snapshot = snap.read_text(encoding="utf-8") if snap else ""
        result.url = url.read_text(encoding="utf-8").strip() if url else ""
    return result


def start_page_snapshot(app: AppConfig) -> str:
    """Accessibility snapshot of the application's start page (context for modes R2 and R3)."""
    node = shutil.which("node")
    if not node:
        raise RuntimeError("node not found: install Node.js 18+")
    env = {**os.environ, "AGENT_INIT_COOKIES": json.dumps(app.init_cookies)}
    proc = subprocess.run([node, "scripts/aria_snapshot.mjs", app.start_url, *app.snapshot_dismiss],
                          cwd=ROOT, env=env, capture_output=True, text=True, timeout=120)
    if proc.returncode != 0:
        raise RuntimeError(f"Cannot take a snapshot of {app.start_url}:\n{strip_ansi(proc.stderr)[-2000:]}")
    return proc.stdout
