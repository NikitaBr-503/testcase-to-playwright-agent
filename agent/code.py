"""Working with generated test code: extraction, import rewriting and static checks.

The static checks implement the assertion control from the article (section 4.5):
the agent must not reach a passing test by deleting or weakening assertions.
"""

from __future__ import annotations

import os
import re
from pathlib import Path
from typing import Dict, List, Optional

from .testcase import TestCase

_FENCE = re.compile(r"```(?:ts|typescript|js|javascript)?[ \t]*\n(.*?)```", re.S | re.I)
_IMPORT = re.compile(r"""^\s*import\s*\{[^}]*\}\s*from\s*['"]@playwright/test['"]\s*;?\s*$""", re.M)
_STEP = re.compile(r"//\s*Step\s+(\d+)", re.I)
_EXPECTED = re.compile(r"//\s*Expected\s+(\d+)", re.I)
_MARKER = re.compile(r"//\s*(Preconditions|Step\s+\d+|Expected\s+\d+)", re.I)

FORBIDDEN = {
    "waitForTimeout": re.compile(r"\.waitForTimeout\s*\("),
    "setTimeout": re.compile(r"\bsetTimeout\s*\("),
    "test.skip": re.compile(r"\btest\.skip\s*\("),
    "test.fixme": re.compile(r"\btest\.fixme\s*\("),
    "expect.soft": re.compile(r"\bexpect\.soft\s*\("),
    "try/catch": re.compile(r"\btry\s*\{"),
    ".catch()": re.compile(r"\.catch\s*\("),
}


def extract_code(text: str) -> Optional[str]:
    """Return the longest fenced code block, or None if the answer has no code block."""
    blocks = _FENCE.findall(text or "")
    if not blocks:
        return None
    code = max(blocks, key=len).strip()
    return code + "\n" if code else None


def rewrite_import(code: str, spec_path: Path, fixtures_path: Path) -> str:
    """Make the test import `test`/`expect` from support/fixtures.ts (failure context fixture)."""
    rel = os.path.relpath(fixtures_path.with_suffix(""), spec_path.parent).replace(os.sep, "/")
    if not rel.startswith("."):
        rel = "./" + rel
    line = f"import {{ test, expect }} from '{rel}';"
    if _IMPORT.search(code):
        return _IMPORT.sub(line, code, count=1)
    return line + "\n" + code


def _strip_comments(code: str) -> str:
    code = re.sub(r"/\*.*?\*/", "", code, flags=re.S)
    return re.sub(r"//[^\n]*", "", code)


def count_assertions(code: str) -> int:
    return len(re.findall(r"\bexpect\s*(?:\.\w+\s*)?\(", _strip_comments(code)))


def analyze(code: str, tc: TestCase) -> Dict:
    steps = sorted({int(n) for n in _STEP.findall(code)})
    expected = sorted({int(n) for n in _EXPECTED.findall(code)})
    no_comments = _strip_comments(code)
    return {
        "assertions": count_assertions(code),
        "missing_steps": [i for i in range(1, tc.n_steps + 1) if i not in steps],
        "missing_expected": [i for i in range(1, tc.n_expected + 1) if i not in expected],
        "forbidden": [name for name, rx in FORBIDDEN.items() if rx.search(no_comments)],
        "tests": len(re.findall(r"\btest\s*\(", no_comments)),
    }


def flags_for(info: Dict, tc: TestCase, first_assertions: Optional[int]) -> List[str]:
    flags = []
    if info["missing_steps"]:
        flags.append("missing_step_markers")
    if info["missing_expected"]:
        flags.append("missing_expected_markers")
    if info["assertions"] < tc.n_expected:
        flags.append("fewer_assertions_than_expected")
    if first_assertions is not None and info["assertions"] < first_assertions:
        flags.append("assertions_decreased")
    if info["tests"] != 1:
        flags.append("not_exactly_one_test")
    flags += [f"forbidden:{name}" for name in info["forbidden"]]
    return flags


REVIEW_FLAGS = ("missing_expected_markers", "fewer_assertions_than_expected", "assertions_decreased",
                "forbidden:test.skip", "forbidden:test.fixme", "forbidden:expect.soft",
                "forbidden:try/catch", "forbidden:.catch()")


def needs_review(flags: List[str]) -> bool:
    """True when an assertion may have been removed or weakened – the test must be checked by hand."""
    return any(f in REVIEW_FLAGS for f in flags)


def marker_at_line(code: str, line: Optional[int]) -> Optional[str]:
    """Name of the closest marker (`Step 3`, `Expected 1`, `Preconditions`) at or above a code line."""
    if not line:
        return None
    lines = code.splitlines()
    for idx in range(min(line, len(lines)) - 1, -1, -1):
        m = _MARKER.search(lines[idx])
        if m:
            return re.sub(r"\s+", " ", m.group(1)).strip().capitalize()
    return None
