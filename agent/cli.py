"""Command line interface: python -m agent <command> --config config/experiment.yaml"""

from __future__ import annotations

import argparse
import csv
import urllib.request
from pathlib import Path
from typing import List

from .config import ROOT, Config, load_config, load_dotenv
from .llm import LLMError, make_client
from .loop import run_combination
from .runner import npx, run_spec, start_page_snapshot
from .store import append_run, done_keys, read_runs, write_summary
from .testcase import TestCase, load_testcases

EVAL_FIELDS = ["model", "mode", "rep", "tc_id", "app", "complexity", "n_steps", "n_expected",
               "auto_passed", "auto_stable", "needs_review", "final_flags", "final_spec",
               # filled in by the researcher (article, section 4.7):
               "steps_ok", "asserts_ok", "fixed_steps", "fix_time_min", "failure_cause",
               # who made the assessment / fix (researcher | claude) and where the fixed test is
               "fixed_expected", "evaluator", "fixed_spec", "notes"]
MANUAL_FIELDS = EVAL_FIELDS[EVAL_FIELDS.index("steps_ok"):]
FAILURE_CAUSES = "locator | order | sync | ambiguity | hallucination | weak_assert | other"


def _split(value: str) -> List[str]:
    return [v.strip() for v in value.split(",") if v.strip()] if value else []


def _select_testcases(cfg: Config, args) -> List[TestCase]:
    cases = load_testcases(cfg.testcases_dir)
    if getattr(args, "testcases", None):
        wanted = set(_split(args.testcases))
        cases = [c for c in cases if c.id in wanted]
    if getattr(args, "apps", None):
        wanted = set(_split(args.apps))
        cases = [c for c in cases if c.app in wanted]
    unknown = sorted({c.app for c in cases if c.app not in cfg.apps})
    if unknown:
        raise SystemExit(f"Test cases refer to apps not defined in {cfg.path.name}: {unknown}")
    return cases


def _snapshot(cfg: Config, app_id: str, refresh: bool) -> str:
    path = cfg.results_dir / "snapshots" / f"{app_id}.yml"
    if path.exists() and not refresh:
        return path.read_text(encoding="utf-8")
    text = start_page_snapshot(cfg.apps[app_id])
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")
    return text


# ---------------------------------------------------------------- commands

def cmd_list(cfg: Config, args) -> int:
    cases = _select_testcases(cfg, args)
    print(f"{'ID':<12} {'app':<12} {'complexity':<10} steps expected  title")
    for c in cases:
        print(f"{c.id:<12} {c.app:<12} {c.complexity:<10} {c.n_steps:>5} {c.n_expected:>8}  {c.title}")
    print(f"\n{len(cases)} test cases, {sum(c.n_steps for c in cases)} steps, "
          f"{sum(c.n_expected for c in cases)} expected results")
    return 0


def cmd_check(cfg: Config, args) -> int:
    ok = True

    def report(good: bool, text: str):
        nonlocal ok
        ok &= good
        print(("[ok]   " if good else "[FAIL] ") + text)

    try:
        npx()
        report(True, "Node.js / npx found")
    except RuntimeError as e:
        report(False, str(e))
    report((ROOT / "node_modules" / "@playwright" / "test").exists(), "@playwright/test installed (npm install)")
    try:
        cases = _select_testcases(cfg, args)
        report(bool(cases), f"{len(cases)} test cases parsed from {cfg.testcases_dir.relative_to(ROOT)}")
    except (Exception, SystemExit) as e:  # noqa: BLE001
        cases = []
        report(False, f"test cases: {e}")
    for app_id in sorted({c.app for c in cases}):
        app = cfg.apps[app_id]
        try:
            urllib.request.urlopen(app.start_url, timeout=10)
            report(True, f"app '{app_id}' answers at {app.start_url}")
        except Exception as e:  # noqa: BLE001
            report(False, f"app '{app_id}' is not reachable at {app.start_url}: {e}")
    for m in cfg.models:
        if m.provider == "fake":
            report(True, f"model '{m.id}': fake provider")
            continue
        if "TODO" in (m.model or "TODO"):
            report(False, f"model '{m.id}': set the model name in {cfg.path.name}")
        if m.api_key_env and not m.api_key:
            report(False, f"model '{m.id}': {m.api_key_env} is empty in .env")
        elif m.api_key_env:
            report(True, f"model '{m.id}': API key {m.api_key_env} is set")
    print("\nAll checks passed." if ok else "\nFix the items marked [FAIL].")
    return 0 if ok else 1


def cmd_snapshot(cfg: Config, args) -> int:
    for app_id in sorted({c.app for c in _select_testcases(cfg, args)}):
        text = _snapshot(cfg, app_id, refresh=True)
        print(f"--- {app_id}: {cfg.apps[app_id].start_url} ({len(text)} chars)")
        print(text[:3000])
    return 0


def cmd_run(cfg: Config, args) -> int:
    cases = _select_testcases(cfg, args)
    models = [cfg.model(m) for m in _split(args.models)] if args.models else cfg.models
    modes = [m.upper() for m in _split(args.modes)] if args.modes else cfg.modes
    repeats = args.repeats or cfg.repeats
    done = set() if args.force else done_keys(cfg.results_dir)

    plan = [(rep, model, mode, tc)
            for rep in range(1, repeats + 1) for model in models for mode in modes for tc in cases
            if (model.id, mode, rep, tc.id) not in done]
    print(f"Experiment '{cfg.name}': {len(plan)} combinations to run "
          f"({len(cases)} test cases × {len(modes)} modes × {len(models)} models × {repeats} repeats, "
          f"{len(done)} already done)")
    if args.dry_run or not plan:
        return 0

    snapshots = {}
    if any(mode in ("R2", "R3") for _, _, mode, _ in plan):
        for app_id in sorted({tc.app for *_, tc in plan}):
            snapshots[app_id] = _snapshot(cfg, app_id, refresh=args.refresh_snapshots)
    clients = {m.id: make_client(m) for m in models}

    for n, (rep, model, mode, tc) in enumerate(plan, 1):
        print(f"[{n}/{len(plan)}] {model.id} {mode} rep{rep} {tc.id}")
        try:
            rec = run_combination(cfg, model, clients[model.id], mode, rep, tc, cfg.apps[tc.app],
                                  snapshots.get(tc.app))
        except LLMError as e:
            print(f"\nModel '{model.id}' did not answer: {e}\n"
                  "Nothing was recorded for this combination. Fix the problem and run the same command again.")
            write_summary(cfg.results_dir, read_runs(cfg.results_dir))
            return 2
        append_run(cfg.results_dir, rec)
        verdict = "stable" if rec["stable"] else ("passed" if rec["passed"] else "failed")
        review = ", needs review" if rec["needs_review"] else ""
        print(f"    → {verdict} after {rec['iterations']} iteration(s){review}")
    path = write_summary(cfg.results_dir, read_runs(cfg.results_dir))
    print(f"\nSummary: {path.relative_to(ROOT)}")
    return 0


def cmd_exec(cfg: Config, args) -> int:
    """Run one spec against its application (used while fixing tests by hand)."""
    spec = Path(args.spec).resolve()
    app_id = args.app
    if not app_id:
        tc_id = spec.name.replace(".spec.ts", "")
        match = [c for c in load_testcases(cfg.testcases_dir) if c.id == tc_id]
        if not match:
            raise SystemExit("Cannot infer the application: pass --app")
        app_id = match[0].app
    res = run_spec(spec, cfg.apps[app_id], cfg, cfg.results_dir / "work" / "exec" / spec.stem,
                   repeat_each=args.repeat)
    print(f"{res.status} in {res.seconds:.1f}s ({', '.join(res.statuses)})")
    if not res.passed:
        print(res.error)
    return 0 if res.passed else 1


def cmd_export_eval(cfg: Config, args) -> int:
    """Create or update the tables the researcher fills in by hand."""
    runs = read_runs(cfg.results_dir)
    if not runs:
        raise SystemExit("No runs yet: execute `python -m agent run` first")
    path = cfg.results_dir / "manual_eval.csv"
    existing = {}
    if path.exists():
        with path.open(encoding="utf-8") as f:
            for row in csv.DictReader(f):
                existing[(row["model"], row["mode"], row["rep"], row["tc_id"])] = row
    rows = []
    for r in sorted(runs, key=lambda r: (r["model"], r["mode"], r["rep"], r["tc_id"])):
        row = {
            "model": r["model"], "mode": r["mode"], "rep": str(r["rep"]), "tc_id": r["tc_id"], "app": r["app"],
            "complexity": r["complexity"], "n_steps": r["n_steps"], "n_expected": r["n_expected"],
            "auto_passed": int(r["passed"]), "auto_stable": int(r["stable"]),
            "needs_review": int(r["needs_review"]), "final_flags": ";".join(r.get("final_flags") or []),
            "final_spec": r.get("final_spec") or "",
        }
        old = existing.get((row["model"], row["mode"], row["rep"], row["tc_id"]), {})
        for k in MANUAL_FIELDS:
            row[k] = old.get(k, "")
        rows.append(row)
    with path.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=EVAL_FIELDS)
        w.writeheader()
        w.writerows(rows)

    base = cfg.results_dir / "baseline.csv"
    known = {}
    if base.exists():
        with base.open(encoding="utf-8") as f:
            known = {row["tc_id"]: row for row in csv.DictReader(f)}
    cases = {c.id: c for c in load_testcases(cfg.testcases_dir)}
    with base.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=["tc_id", "app", "complexity", "n_steps", "manual_time_min"])
        w.writeheader()
        for tc_id, c in sorted(cases.items()):
            w.writerow({"tc_id": tc_id, "app": c.app, "complexity": c.complexity, "n_steps": c.n_steps,
                        "manual_time_min": known.get(tc_id, {}).get("manual_time_min", "")})
    print(f"Updated {path.relative_to(ROOT)} ({len(rows)} rows) and {base.relative_to(ROOT)}")
    print("Columns to fill in: steps_ok, asserts_ok (1/0); fixed_steps (e.g. 2;5); fix_time_min; "
          f"failure_cause ({FAILURE_CAUSES}).")
    return 0


# ---------------------------------------------------------------- entry point

def main(argv=None) -> int:
    load_dotenv()
    p = argparse.ArgumentParser(prog="python -m agent",
                                description="Convert manual test cases into Playwright tests with an LLM agent.")
    p.add_argument("--config", default="config/experiment.yaml", help="experiment configuration (YAML)")
    sub = p.add_subparsers(dest="command", required=True)

    def filters(sp):
        sp.add_argument("--testcases", help="comma-separated test case IDs")
        sp.add_argument("--apps", help="comma-separated application IDs")

    filters(sub.add_parser("list", help="list test cases and their complexity"))
    filters(sub.add_parser("check", help="check that everything is ready for the experiment"))
    filters(sub.add_parser("snapshot", help="take accessibility snapshots of the start pages"))
    r = sub.add_parser("run", help="run the experiment (already finished combinations are skipped)")
    filters(r)
    r.add_argument("--models", help="comma-separated model IDs from the config")
    r.add_argument("--modes", help="comma-separated modes: R1,R2,R3")
    r.add_argument("--repeats", type=int, help="override the number of repetitions")
    r.add_argument("--force", action="store_true", help="re-run combinations that are already done")
    r.add_argument("--refresh-snapshots", action="store_true", help="take start page snapshots again")
    r.add_argument("--dry-run", action="store_true", help="only show how many combinations would run")
    e = sub.add_parser("exec", help="run one spec file against its application")
    e.add_argument("spec")
    e.add_argument("--app")
    e.add_argument("--repeat", type=int, default=1)
    sub.add_parser("export-eval", help="create manual_eval.csv and baseline.csv for manual assessment")

    args = p.parse_args(argv)
    cfg = load_config(args.config)
    commands = {"list": cmd_list, "check": cmd_check, "snapshot": cmd_snapshot, "run": cmd_run,
                "exec": cmd_exec, "export-eval": cmd_export_eval}
    return commands[args.command](cfg, args)
