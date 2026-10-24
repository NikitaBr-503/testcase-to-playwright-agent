"""Results storage: one JSON line per combination in results/<experiment>/runs.jsonl."""

from __future__ import annotations

import csv
import json
from pathlib import Path
from typing import Dict, Iterable, List, Set, Tuple

Key = Tuple[str, str, int, str]  # model, mode, rep, tc_id

SUMMARY_FIELDS = ["model", "model_name", "mode", "rep", "tc_id", "app", "complexity", "n_steps", "n_expected",
                  "iterations", "passed", "stable", "stable_passes", "needs_review", "agent_seconds",
                  "llm_seconds", "input_tokens", "output_tokens", "final_assertions", "final_flags", "final_spec"]


def key_of(rec: Dict) -> Key:
    return rec["model"], rec["mode"], int(rec["rep"]), rec["tc_id"]


def read_runs(results_dir: Path) -> List[Dict]:
    path = results_dir / "runs.jsonl"
    if not path.exists():
        return []
    latest: Dict[Key, Dict] = {}
    for line in path.read_text(encoding="utf-8").splitlines():
        if line.strip():
            rec = json.loads(line)
            latest[key_of(rec)] = rec  # a re-run of the same combination replaces the old record
    return list(latest.values())


def done_keys(results_dir: Path) -> Set[Key]:
    return {key_of(r) for r in read_runs(results_dir)}


def append_run(results_dir: Path, rec: Dict) -> None:
    results_dir.mkdir(parents=True, exist_ok=True)
    with (results_dir / "runs.jsonl").open("a", encoding="utf-8") as f:
        f.write(json.dumps(rec, ensure_ascii=False) + "\n")


def write_summary(results_dir: Path, runs: Iterable[Dict]) -> Path:
    path = results_dir / "summary.csv"
    rows = sorted(runs, key=lambda r: (r["model"], r["mode"], r["rep"], r["tc_id"]))
    with path.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=SUMMARY_FIELDS, extrasaction="ignore")
        w.writeheader()
        for r in rows:
            r = dict(r)
            r["final_flags"] = ";".join(r.get("final_flags") or [])
            w.writerow(r)
    return path
