"""Agreement between the assistant's assessment and the researcher's blind re-assessment (article, 4.8).

Usage:
    python analysis/agreement.py --config config/experiment.yaml

Inputs (results/<experiment>/):
    manual_eval.csv   – assessment of every stable test (steps_ok, asserts_ok; column evaluator)
    blind_check.csv   – the same columns filled in by the researcher, without seeing manual_eval.csv,
                        for a random sample of stable tests plus every test the assistant rejected
    blind_sample.json – which rows of blind_check.csv form the random sample and which were rejected
Output: results/<experiment>/analysis/agreement.md (percent agreement and Cohen's kappa).
"""

from __future__ import annotations

import argparse
import csv
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from agent.config import load_config  # noqa: E402

KEY = ("model", "mode", "rep", "tc_id")


def read(path: Path) -> dict:
    with path.open(encoding="utf-8") as f:
        return {tuple(r[k] for k in KEY): r for r in csv.DictReader(f)}


def flag(v: str):
    v = (v or "").strip().lower()
    return 1 if v in ("1", "так", "yes", "y") else 0 if v in ("0", "ні", "no", "n") else None


def kappa(pairs):
    """Cohen's kappa for two raters and binary labels; None when undefined."""
    n = len(pairs)
    if n == 0:
        return None, None
    po = sum(a == b for a, b in pairs) / n
    pa = sum(a for a, _ in pairs) / n
    pb = sum(b for _, b in pairs) / n
    pe = pa * pb + (1 - pa) * (1 - pb)
    return po, (None if pe == 1 else (po - pe) / (1 - pe))


def main(argv=None) -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--config", default="config/experiment.yaml")
    args = ap.parse_args(argv)
    cfg = load_config(args.config)
    ev = read(cfg.results_dir / "manual_eval.csv")
    blind = read(cfg.results_dir / "blind_check.csv")
    sample = json.loads((cfg.results_dir / "blind_sample.json").read_text(encoding="utf-8"))
    subsets = {"random sample": {tuple(k.split("|")) for k in sample["random"]},
               "all rejected by the assistant": {tuple(k.split("|")) for k in sample["rejected"]}}
    # Labels are mostly 1 in the random sample, so kappa is unstable there; the pooled set has both classes.
    subsets["pooled (random sample + rejected)"] = subsets["random sample"] | subsets["all rejected by the assistant"]
    lines = ["# Agreement: assistant vs researcher (blind re-assessment)", ""]
    for title, keys in subsets.items():
        rows = []
        for name, get in (("steps_ok", lambda r: flag(r["steps_ok"])),
                          ("asserts_ok", lambda r: flag(r["asserts_ok"])),
                          ("both (success)", lambda r: None if flag(r["steps_ok"]) is None
                           or flag(r["asserts_ok"]) is None else flag(r["steps_ok"]) * flag(r["asserts_ok"]))):
            pairs = [(get(ev[k]), get(b)) for k, b in blind.items() if k in ev and k in keys]
            pairs = [(a, b) for a, b in pairs if a is not None and b is not None]
            po, k = kappa(pairs)
            rows.append((name, len(pairs), po, k, sum(a != b for a, b in pairs)))
        lines += [f"## {title}", "", "| Label | Pairs | Agreement, % | Cohen's κ | Disagreements |",
                  "| --- | --- | --- | --- | --- |"]
        for name, n, po, k, d in rows:
            lines.append(f"| {name} | {n} | {'' if po is None else f'{100 * po:.1f}'} | "
                         f"{'n/a (one class only)' if k is None else f'{k:.2f}'} | {d} |")
        lines.append("")
    lines += ["", "Disagreements:"]
    for k, b in blind.items():
        if k in ev and (flag(ev[k]["steps_ok"]), flag(ev[k]["asserts_ok"])) != (flag(b["steps_ok"]), flag(b["asserts_ok"])):
            lines.append(f"- {'/'.join(k)}: assistant {ev[k]['steps_ok']}/{ev[k]['asserts_ok']}, "
                         f"researcher {b['steps_ok']}/{b['asserts_ok']} – {b.get('comment', '')}")
    out = cfg.results_dir / "analysis"
    out.mkdir(parents=True, exist_ok=True)
    (out / "agreement.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    print("\n".join(lines))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
