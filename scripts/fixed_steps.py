"""Which steps and expected results a manual fix changed (article, formula 2).

Usage:
    python scripts/fixed_steps.py results/main/fixes/<model>/<mode>/rep1/<TC>.spec.ts [...]

The fixed test is compared with the generated test generated/main/<model>/<mode>/rep1/<TC>.spec.ts.
A step counts as fixed when the code in its block changed, or when a shared locator declared outside
the steps was fixed and the step is the first one that uses it. Prints values for the columns
fixed_steps and fixed_expected of manual_eval.csv.
"""

from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from agent.config import ROOT  # noqa: E402
from agent.fixdiff import changed  # noqa: E402


def main(argv=None) -> int:
    paths = argv if argv is not None else sys.argv[1:]
    if not paths:
        print(__doc__)
        return 2
    for p in paths:
        fixed = Path(p).resolve()
        parts = fixed.relative_to(ROOT / "results").parts  # <experiment>/fixes/<model>/<mode>/rep1/<TC>.spec.ts
        exp, model, mode, rep, name = parts[0], parts[2], parts[3], parts[4], parts[5]
        orig = ROOT / "generated" / exp / model / mode / rep / name
        if not orig.exists():
            print(f"{p}: generated test {orig.relative_to(ROOT)} not found")
            continue
        steps, exps, other = changed(orig.read_text(encoding="utf-8"), fixed.read_text(encoding="utf-8"))
        print(f"{model}/{mode}/{rep}/{name}: fixed_steps = {';'.join(map(str, steps)) or '0'}, "
              f"fixed_expected = {';'.join(map(str, exps)) or '0'}" + (f" (also changed: {', '.join(other)})" if other else ""))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
