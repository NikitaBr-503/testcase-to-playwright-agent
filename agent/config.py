"""Loading the experiment configuration and the .env file."""

from __future__ import annotations

import os
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Dict, List, Optional

import yaml

ROOT = Path(__file__).resolve().parent.parent
MODES = ("R1", "R2", "R3")


@dataclass
class ModelConfig:
    id: str
    provider: str
    model: str = ""
    api_key_env: Optional[str] = None
    base_url: Optional[str] = None
    temperature: Optional[float] = 0
    max_tokens: int = 8000
    vision: bool = False
    responses_dir: Optional[str] = None  # provider "fake" only
    extra: Dict[str, Any] = field(default_factory=dict)

    @property
    def api_key(self) -> Optional[str]:
        return os.environ.get(self.api_key_env) if self.api_key_env else None


@dataclass
class AppConfig:
    id: str
    base_url: str
    start_path: str = "/"
    reset_cmd: Optional[str] = None
    context: str = ""

    @property
    def start_url(self) -> str:
        return self.base_url.rstrip("/") + "/" + self.start_path.lstrip("/")


@dataclass
class Config:
    path: Path
    name: str
    modes: List[str]
    max_iterations: int
    repeats: int
    stability_runs: int
    testcases_dir: Path
    test_timeout_ms: int
    action_timeout_ms: int
    expect_timeout_ms: int
    models: List[ModelConfig]
    apps: Dict[str, AppConfig]

    @property
    def results_dir(self) -> Path:
        return ROOT / "results" / self.name

    @property
    def generated_dir(self) -> Path:
        return ROOT / "generated" / self.name

    def model(self, model_id: str) -> ModelConfig:
        for m in self.models:
            if m.id == model_id:
                return m
        raise KeyError(f"Model '{model_id}' is not defined in {self.path}")


def load_dotenv(path: Path = ROOT / ".env") -> None:
    """Minimal .env reader (KEY=VALUE lines); existing environment variables win."""
    if not path.exists():
        return
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key, value = key.strip(), value.strip().strip('"').strip("'")
        if key and value and key not in os.environ:
            os.environ[key] = value


def load_config(path: str | Path) -> Config:
    path = Path(path)
    if not path.is_absolute():
        path = ROOT / path
    raw = yaml.safe_load(path.read_text(encoding="utf-8")) or {}
    exp = raw.get("experiment", {})
    pw = raw.get("playwright", {})

    modes = [m.upper() for m in exp.get("modes", list(MODES))]
    bad = [m for m in modes if m not in MODES]
    if bad:
        raise ValueError(f"Unknown modes {bad}; allowed: {MODES}")

    known = {f for f in ModelConfig.__dataclass_fields__ if f != "extra"}
    models = []
    for m in raw.get("models", []):
        m = dict(m)
        extra = {k: m.pop(k) for k in list(m) if k not in known}
        models.append(ModelConfig(**m, extra=extra))
    if not models:
        raise ValueError(f"No models defined in {path}")

    apps = {}
    for app_id, a in (raw.get("apps") or {}).items():
        apps[app_id] = AppConfig(
            id=app_id,
            base_url=a["base_url"],
            start_path=a.get("start_path", "/"),
            reset_cmd=a.get("reset_cmd"),
            context=(a.get("context") or "").strip(),
        )

    tc_dir = Path(exp.get("testcases_dir", "testcases"))
    return Config(
        path=path,
        name=exp.get("name", path.stem),
        modes=modes,
        max_iterations=int(exp.get("max_iterations", 5)),
        repeats=int(exp.get("repeats", 3)),
        stability_runs=int(exp.get("stability_runs", 3)),
        testcases_dir=tc_dir if tc_dir.is_absolute() else ROOT / tc_dir,
        test_timeout_ms=int(pw.get("test_timeout_ms", 60000)),
        action_timeout_ms=int(pw.get("action_timeout_ms", 10000)),
        expect_timeout_ms=int(pw.get("expect_timeout_ms", 5000)),
        models=models,
        apps=apps,
    )
