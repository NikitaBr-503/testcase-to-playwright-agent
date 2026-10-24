"""Manual test cases stored as YAML files (see testcases/TEMPLATE.yaml)."""

from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path
from typing import List, Optional

import yaml

COMPLEXITY_LEVELS = ("simple", "medium", "complex")


@dataclass
class TestCase:
    id: str
    title: str
    app: str
    steps: List[str]
    expected: List[str]
    preconditions: List[str] = field(default_factory=list)
    complexity_override: Optional[str] = None
    path: Optional[Path] = None

    @property
    def n_steps(self) -> int:
        return len(self.steps)

    @property
    def n_expected(self) -> int:
        return len(self.expected)

    @property
    def complexity(self) -> str:
        """Article, section 4.3: ≤5 steps simple, 6–10 medium, >10 complex (override allowed)."""
        if self.complexity_override:
            return self.complexity_override
        if self.n_steps <= 5:
            return "simple"
        if self.n_steps <= 10:
            return "medium"
        return "complex"

    def render(self) -> str:
        """Text of the test case exactly as the model sees it."""
        lines = [f"ID: {self.id}", f"Title: {self.title}"]
        if self.preconditions:
            lines.append("Preconditions:")
            lines += [f"- {p}" for p in self.preconditions]
        lines.append("Steps:")
        lines += [f"{i}. {s}" for i, s in enumerate(self.steps, 1)]
        lines.append("Expected results:")
        lines += [f"{i}. {e}" for i, e in enumerate(self.expected, 1)]
        return "\n".join(lines)


def _as_list(value) -> List[str]:
    if value is None:
        return []
    if isinstance(value, str):
        return [value]
    return [str(v).strip() for v in value if str(v).strip()]


def load_testcase(path: Path) -> TestCase:
    raw = yaml.safe_load(path.read_text(encoding="utf-8")) or {}
    for key in ("id", "title", "steps", "expected"):
        if not raw.get(key):
            raise ValueError(f"{path}: field '{key}' is required")
    complexity = raw.get("complexity")
    if complexity and complexity not in COMPLEXITY_LEVELS:
        raise ValueError(f"{path}: complexity must be one of {COMPLEXITY_LEVELS}")
    return TestCase(
        id=str(raw["id"]).strip(),
        title=str(raw["title"]).strip(),
        app=str(raw.get("app") or path.parent.name).strip(),
        steps=_as_list(raw["steps"]),
        expected=_as_list(raw["expected"]),
        preconditions=_as_list(raw.get("preconditions")),
        complexity_override=complexity,
        path=path,
    )


def load_testcases(directory: Path) -> List[TestCase]:
    cases = []
    for path in sorted(directory.rglob("*.y*ml")):
        if path.name.upper().startswith("TEMPLATE"):
            continue
        cases.append(load_testcase(path))
    ids = [c.id for c in cases]
    dupes = sorted({i for i in ids if ids.count(i) > 1})
    if dupes:
        raise ValueError(f"Duplicate test case IDs: {dupes}")
    return cases
