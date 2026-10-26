"""Run every manually fixed test three times against its application (article, 4.8, step 5).

The fixed tests are kept in results/<experiment>/fixes/<model>/<mode>/rep1/<TC>.spec.ts (published with the data).
Playwright only runs files under generated/, so they are copied to generated/fixes/ first.

Usage (both applications must be running):
    python scripts/verify_fixes.py [--config config/experiment.yaml] [--repeat 3] [--only JS-05,TODO-03]

Writes results/<experiment>/fixes/verify_report.csv: one line per fixed test with the status of each run.
"""

from __future__ import annotations

import argparse
import csv
import shutil
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from agent.config import ROOT, load_config, load_dotenv  # noqa: E402
from agent.runner import reset_app, run_spec  # noqa: E402
from agent.testcase import load_testcases  # noqa: E402


def main(argv=None) -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--config", default="config/experiment.yaml")
    ap.add_argument("--repeat", type=int, default=3)
    ap.add_argument("--only", help="comma-separated test case IDs")
    args = ap.parse_args(argv)
    load_dotenv()
    cfg = load_config(args.config)
    src = cfg.results_dir / "fixes"
    if not src.exists():
        raise SystemExit(f"No fixed tests in {src}")
    apps = {c.id: c.app for c in load_testcases(cfg.testcases_dir)}
    only = {x.strip() for x in args.only.split(",")} if args.only else None
    dst_root = ROOT / "generated" / "fixes"
    rows, failed = [], 0
    specs = sorted(src.rglob("*.spec.ts"))
    for i, spec in enumerate(specs, 1):
        tc_id = spec.name.replace(".spec.ts", "")
        if only and tc_id not in only:
            continue
        rel = spec.relative_to(src)
        dst = dst_root / rel
        dst.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy(spec, dst)
        app = cfg.apps[apps[tc_id]]
        statuses = []
        for _ in range(args.repeat):
            reset_app(app)
            res = run_spec(dst, app, cfg, cfg.results_dir / "work" / "verify" / tc_id)
            statuses.append(res.status)
            if not res.passed:
                break
        ok = len(statuses) == args.repeat and all(s == "passed" for s in statuses)
        failed += not ok
        model, mode = rel.parts[0], rel.parts[1]
        rows.append({"model": model, "mode": mode, "tc_id": tc_id, "stable": int(ok), "statuses": ";".join(statuses),
                     "error": "" if ok else res.error.splitlines()[0][:200] if res.error else res.status})
        print(f"[{i}/{len(specs)}] {model}/{mode}/{tc_id}: {'OK' if ok else 'FAIL'} ({', '.join(statuses)})", flush=True)
    out = src / "verify_report.csv"
    with out.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=["model", "mode", "tc_id", "stable", "statuses", "error"])
        w.writeheader()
        w.writerows(rows)
    print(f"\n{len(rows) - failed} of {len(rows)} fixed tests passed {args.repeat} runs in a row. Report: {out}")
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
