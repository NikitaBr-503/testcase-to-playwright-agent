"""Computes everything Section 5 of the article needs from the experiment data.

Usage:
    python analysis/analyze.py --config config/experiment.yaml

Inputs (results/<experiment>/):
    runs.jsonl        – written by `python -m agent run`
    manual_eval.csv   – filled in by the researcher (`python -m agent export-eval` creates it)
    baseline.csv      – manual authoring time per test case (same command creates it)

Outputs (results/<experiment>/analysis/):
    table3_testcases.csv, table4_success_rate.csv, table5_mcnemar.csv,
    table6_fixes_time.csv, table7_failure_causes.csv, r3_iterations.csv,
    fig2_success_by_complexity.png (300 dpi), summary.md (numbers for the abstract and conclusions)

Formulas follow the article: (1) SR, (2) MFR, (3) t_prep = t_gen + t_fix, (4) E, (5) McNemar χ².
"""

from __future__ import annotations

import argparse
import math
import sys
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt  # noqa: E402
import pandas as pd  # noqa: E402

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from agent.config import load_config  # noqa: E402
from agent.store import read_runs  # noqa: E402
from agent.testcase import load_testcases  # noqa: E402

COMPLEXITY = ["simple", "medium", "complex"]
COMPLEXITY_UA = {"simple": "Прості", "medium": "Середні", "complex": "Складні"}
MODES = ["R1", "R2", "R3"]
# Ordinal single-hue ramp: R1 → R3 = lighter → darker (also readable in grayscale print).
MODE_COLORS = {"R1": "#9ec5f4", "R2": "#3987e5", "R3": "#184f95"}
MODEL_TITLES = {"claude-sonnet-5.5": "Claude Sonnet 5.5", "deepseek-v4.1-flash": "DeepSeek V4.1 Flash"}
CAUSES = ["locator", "order", "sync", "ambiguity", "hallucination", "weak_assert", "other"]
CAUSES_UA = {
    "locator": "Неправильний локатор", "order": "Порушення послідовності дій",
    "sync": "Помилка синхронізації", "ambiguity": "Неоднозначність тест-кейсу",
    "hallucination": "Вигаданий елемент або крок", "weak_assert": "Недостатня перевірка",
    "other": "Інше",
}


def _flag(v) -> float:
    """1/0 from a manual cell; NaN when empty."""
    if v is None or (isinstance(v, float) and math.isnan(v)) or str(v).strip() == "":
        return float("nan")
    s = str(v).strip().lower()
    if s in ("1", "y", "yes", "так", "true", "+"):
        return 1.0
    if s in ("0", "n", "no", "ні", "false", "-"):
        return 0.0
    raise ValueError(f"Cannot read '{v}' as 1/0")


def _fixed_steps(v, n_steps: int) -> float:
    if v is None or (isinstance(v, float) and math.isnan(v)) or str(v).strip() == "":
        return float("nan")
    s = str(v).strip().lower()
    if s in ("all", "усі", "всі"):
        return float(n_steps)
    if s in ("0", "none", "-"):
        return 0.0
    parts = [p for p in s.replace(",", ";").split(";") if p.strip()]
    return float(len({p.strip() for p in parts}))


def _num(v) -> float:
    try:
        return float(str(v).replace(",", "."))
    except (TypeError, ValueError):
        return float("nan")


def mcnemar(b: int, c: int):
    """Continuity-corrected χ² (formula 5), its p-value (1 df) and the exact two-sided binomial p."""
    if b + c == 0:
        return 0.0, 1.0, 1.0
    chi2 = (abs(b - c) - 1) ** 2 / (b + c)
    p_chi2 = math.erfc(math.sqrt(chi2 / 2))
    n, k = b + c, min(b, c)
    p_exact = min(1.0, 2 * sum(math.comb(n, i) for i in range(k + 1)) / 2 ** n)
    return chi2, p_chi2, p_exact


def load(cfg):
    runs = pd.DataFrame(read_runs(cfg.results_dir))
    if runs.empty:
        raise SystemExit("No runs: execute `python -m agent run` first")
    runs["rep"] = runs["rep"].astype(int)
    path = cfg.results_dir / "manual_eval.csv"
    if path.exists():
        ev = pd.read_csv(path, dtype=str, keep_default_na=False)
        ev["rep"] = ev["rep"].astype(int)
        for c in ("fixed_expected", "evaluator"):
            if c not in ev.columns:
                ev[c] = ""
        cols = ["model", "mode", "rep", "tc_id", "steps_ok", "asserts_ok", "fixed_steps",
                "fix_time_min", "failure_cause", "fixed_expected", "evaluator"]
        runs = runs.merge(ev[cols], on=["model", "mode", "rep", "tc_id"], how="left")
        for c in cols[4:]:
            runs[c] = runs[c].fillna("")
    else:
        for c in ("steps_ok", "asserts_ok", "fixed_steps", "fix_time_min", "failure_cause",
                  "fixed_expected", "evaluator"):
            runs[c] = ""
    base_path = cfg.results_dir / "baseline.csv"
    baseline = pd.read_csv(base_path, dtype=str, keep_default_na=False) if base_path.exists() else pd.DataFrame(
        columns=["tc_id", "manual_time_min"])
    baseline["manual_time_min"] = baseline["manual_time_min"].map(_num)
    baseline = baseline.dropna(subset=["manual_time_min"])
    return runs, baseline


def add_success(runs: pd.DataFrame):
    """Success criterion (article, 4.7): stable AND every step reproduced AND every expected result verified."""
    steps_ok = runs["steps_ok"].map(_flag)
    asserts_ok = runs["asserts_ok"].map(_flag)
    reviewed = steps_ok.notna() & asserts_ok.notna()
    unreviewed = runs["stable"] & ~reviewed
    runs["success"] = (runs["stable"] & (steps_ok.fillna(1) == 1) & (asserts_ok.fillna(1) == 1)).astype(int)
    return int(unreviewed.sum())


def md(df: pd.DataFrame, index: bool = True) -> str:
    """Markdown table without the optional `tabulate` dependency."""
    d = df.reset_index() if index else df
    cols = [str(c) for c in d.columns]
    cell = lambda v: fmt(v, 2) if isinstance(v, float) else str(v)  # noqa: E731
    rows = ["| " + " | ".join(cols) + " |", "| " + " | ".join("---" for _ in cols) + " |"]
    rows += ["| " + " | ".join(cell(v) for v in r) + " |" for r in d.itertuples(index=False)]
    return "\n".join(rows)


def fmt(x, digits=1):
    return "" if x is None or (isinstance(x, float) and math.isnan(x)) else f"{x:.{digits}f}"


def main(argv=None) -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--config", default="config/experiment.yaml")
    ap.add_argument("--rep", type=int, default=1, help="repetition used for fixes, time and McNemar (article: 1)")
    args = ap.parse_args(argv)
    cfg = load_config(args.config)
    out = cfg.results_dir / "analysis"
    out.mkdir(parents=True, exist_ok=True)

    runs, baseline = load(cfg)
    pending = add_success(runs)
    cases = {c.id: c for c in load_testcases(cfg.testcases_dir)}
    models = list(dict.fromkeys(runs["model"]))
    modes = [m for m in MODES if m in set(runs["mode"])]
    notes = []
    if pending:
        notes.append(f"PROVISIONAL: {pending} stable test(s) have no manual assessment yet "
                     f"(steps_ok / asserts_ok) and are counted as successful.")

    # ---- Table 3: test cases by application and complexity
    tc = pd.DataFrame([{"app": c.app, "complexity": c.complexity, "n_steps": c.n_steps, "n_expected": c.n_expected}
                       for c in cases.values() if c.id in set(runs["tc_id"])])
    t3 = tc.pivot_table(index="app", columns="complexity", values="n_steps", aggfunc="count", fill_value=0)
    t3 = t3.reindex(columns=COMPLEXITY, fill_value=0)
    t3["mean_steps"] = tc.groupby("app")["n_steps"].mean().round(1)
    total = pd.DataFrame([{**{c: int((tc["complexity"] == c).sum()) for c in COMPLEXITY},
                           "mean_steps": round(tc["n_steps"].mean(), 1)}], index=["Разом"])
    t3 = pd.concat([t3, total])
    t3.to_csv(out / "table3_testcases.csv")
    S_total = int(tc["n_steps"].sum())

    # ---- Table 4: SR (formula 1) per repetition, then mean ± SD over repetitions
    per_rep = runs.groupby(["model", "mode", "rep"])["success"].mean().mul(100).rename("SR").reset_index()
    t4 = per_rep.groupby(["model", "mode"])["SR"].agg(["mean", "std", "count"]).reset_index()
    t4["std"] = t4["std"].fillna(0)
    t4.to_csv(out / "table4_success_rate.csv", index=False)
    t4w = t4.assign(cell=lambda d: d["mean"].map(fmt) + " ± " + d["std"].map(fmt)).pivot(
        index="model", columns="mode", values="cell").reindex(columns=modes)

    # ---- Fig. 2: SR by complexity class
    by_cx = runs.groupby(["model", "mode", "complexity"])["success"].mean().mul(100).reset_index()
    present_cx = [c for c in COMPLEXITY if c in set(runs["complexity"])]
    plt.rcParams.update({"font.family": "serif", "font.serif": ["Times New Roman", "Liberation Serif", "DejaVu Serif"],
                         "font.size": 11, "axes.titlesize": 11, "axes.labelsize": 11})
    # 16 cm wide (text width), subfigures side by side with the same height (journal rule).
    fig, axes = plt.subplots(1, len(models), figsize=(6.3, 3.4), sharey=True, squeeze=False)
    width = 0.8 / len(modes)
    for ax, model in zip(axes[0], models):
        for j, mode in enumerate(modes):
            vals = [by_cx.query("model == @model and mode == @mode and complexity == @c")["success"].mean()
                    for c in present_cx]
            xs = [i + (j - (len(modes) - 1) / 2) * width for i in range(len(present_cx))]
            bars = ax.bar(xs, [0 if math.isnan(v) else v for v in vals], width=width * 0.92,
                          color=MODE_COLORS[mode], label=mode, edgecolor="white", linewidth=1)
            for bar, v in zip(bars, vals):
                if not math.isnan(v):
                    ax.text(bar.get_x() + bar.get_width() / 2, bar.get_height() + 1.5, f"{v:.0f}",
                            ha="center", va="bottom", fontsize=9)
        ax.set_xticks(range(len(present_cx)))
        ax.set_xticklabels([COMPLEXITY_UA[c] for c in present_cx])
        ax.set_ylim(0, 108)
        ax.set_yticks(range(0, 101, 20))
        ax.set_xlabel("Клас складності тест-кейсу", labelpad=8)
        if len(models) > 1:
            ax.set_title(MODEL_TITLES.get(model, model))
        ax.spines[["top", "right"]].set_visible(False)
        ax.yaxis.grid(True, color="#e5e5e5", linewidth=0.6)
        ax.set_axisbelow(True)
    axes[0][0].set_ylabel("Частка успішних тестів, %", labelpad=8)
    handles, labels = axes[0][0].get_legend_handles_labels()
    fig.legend(handles, [f"Режим {lb}" for lb in labels], frameon=False, loc="upper center", ncol=len(modes))
    fig.tight_layout(rect=(0, 0, 1, 0.9))
    fig.savefig(out / "fig2_success_by_complexity.png", dpi=300)
    plt.close(fig)

    # ---- Table 5: McNemar R1 vs R3 (repetition args.rep)
    rows5 = []
    if {"R1", "R3"} <= set(modes):
        for model in models:
            r = runs[(runs["model"] == model) & (runs["rep"] == args.rep)]
            piv = r.pivot_table(index="tc_id", columns="mode", values="success", aggfunc="first").dropna(
                subset=["R1", "R3"])
            b = int(((piv["R3"] == 1) & (piv["R1"] == 0)).sum())
            c = int(((piv["R3"] == 0) & (piv["R1"] == 1)).sum())
            chi2, p, p_exact = mcnemar(b, c)
            rows5.append({"model": model, "pairs": len(piv), "b": b, "c": c, "chi2": round(chi2, 2),
                          "p_chi2": round(p, 4), "p_exact": round(p_exact, 4), "significant_0.05": chi2 > 3.84})
    t5 = pd.DataFrame(rows5)
    t5.to_csv(out / "table5_mcnemar.csv", index=False)

    # ---- Table 6: manual fixes (formula 2) and time (formulas 3, 4), repetition args.rep
    r1 = runs[runs["rep"] == args.rep].copy()
    r1["fixed_n"] = [_fixed_steps(v, n) for v, n in zip(r1["fixed_steps"], r1["n_steps"])]
    r1.loc[r1["success"] == 1, "fixed_n"] = r1.loc[r1["success"] == 1, "fixed_n"].fillna(0)
    r1["fixed_exp_n"] = [_fixed_steps(v, n) for v, n in zip(r1["fixed_expected"], r1["n_expected"])]
    r1.loc[r1["success"] == 1, "fixed_exp_n"] = r1.loc[r1["success"] == 1, "fixed_exp_n"].fillna(0)
    r1["t_fix"] = r1["fix_time_min"].map(_num)
    r1.loc[r1["success"] == 1, "t_fix"] = r1.loc[r1["success"] == 1, "t_fix"].fillna(0)
    # Fixes whose time was not measured (e.g. made by the assistant, not timed by the researcher) get the mean
    # time of the researcher's timed fixes of the same complexity class (article, 4.8).
    failed = r1["success"] == 0
    timed = r1[failed & r1["t_fix"].notna()]
    untimed = failed & r1["t_fix"].isna() & r1["fixed_n"].notna()
    if len(timed) and untimed.any():
        by_cx = timed.groupby("complexity")["t_fix"].mean()
        r1.loc[untimed, "t_fix"] = r1.loc[untimed, "complexity"].map(by_cx).fillna(timed["t_fix"].mean())
        notes.append(f"ESTIMATED: fix time of {int(untimed.sum())} fixed test(s) taken as the mean of "
                     f"{len(timed)} timed fix(es) of the same complexity class "
                     f"({', '.join(f'{k}: {v:.1f} min' for k, v in by_cx.items())}).")
    r1["t_gen"] = r1["agent_seconds"] / 60
    r1["t_prep"] = r1["t_gen"] + r1["t_fix"]
    missing_fix = int(r1["fixed_n"].isna().sum() + r1["t_fix"].isna().sum())
    if missing_fix:
        notes.append(f"INCOMPLETE: {missing_fix} cell(s) of fixed_steps / fix_time_min are empty for failed tests "
                     f"in repetition {args.rep}.")
    base_ids = set(baseline["tc_id"])
    t_manual = baseline["manual_time_min"].mean() if len(baseline) else float("nan")
    rows6 = []
    for (model, mode), g in r1.groupby(["model", "mode"]):
        gb = g[g["tc_id"].isin(base_ids)]
        t_prep_b = gb["t_prep"].mean() if len(gb) else float("nan")
        t_man_b = baseline[baseline["tc_id"].isin(set(gb["tc_id"]))]["manual_time_min"].mean() if len(gb) else float("nan")
        rows6.append({
            "model": model, "mode": mode,
            "MFR_%": 100 * g["fixed_n"].sum() / g["n_steps"].sum(),
            "fixed_expected_%": 100 * g["fixed_exp_n"].sum() / g["n_expected"].sum(),
            "t_gen_min": g["t_gen"].mean(), "t_fix_min": g["t_fix"].mean(), "t_prep_min": g["t_prep"].mean(),
            "E_%": 100 * (t_man_b - t_prep_b) / t_man_b if t_man_b and not math.isnan(t_man_b) else float("nan"),
            "baseline_cases": len(gb), "tokens_k": (g["input_tokens"] + g["output_tokens"]).mean() / 1000,
        })
    t6 = pd.DataFrame(rows6)
    t6["mode"] = pd.Categorical(t6["mode"], MODES)
    t6 = t6.sort_values(["model", "mode"])
    t6.round(2).to_csv(out / "table6_fixes_time.csv", index=False)

    # ---- R3 iterations
    rows_it = []
    for model in models:
        g = runs[(runs["model"] == model) & (runs["mode"] == "R3")]
        if g.empty:
            continue
        p = g[g["passed"]]
        n = len(g)
        rows_it.append({
            "model": model, "combinations": n,
            "mean_iterations_passed": p["iterations"].mean(),
            "passed_iter1_%": 100 * (p["iterations"] == 1).sum() / n,
            "passed_iter2_%": 100 * (p["iterations"] == 2).sum() / n,
            "passed_iter3plus_%": 100 * (p["iterations"] >= 3).sum() / n,
            "never_passed_%": 100 * (~g["passed"]).sum() / n,
            "flagged_for_review": int(g["needs_review"].sum()),
            "flagged_and_rejected": int((g["needs_review"] & (g["success"] == 0)).sum()),
        })
    t_it = pd.DataFrame(rows_it)
    t_it.round(2).to_csv(out / "r3_iterations.csv", index=False)

    # ---- Table 7: causes of failure after R3 (repetition args.rep)
    f = r1[(r1["mode"] == "R3") & (r1["success"] == 0)]
    t7 = f.assign(cause=f["failure_cause"].replace("", "unclassified")).groupby(["model", "cause"]).size().unstack(
        "model", fill_value=0)
    t7 = t7.reindex([c for c in CAUSES + ["unclassified"] if c in t7.index])
    t7.to_csv(out / "table7_failure_causes.csv")
    if "unclassified" in t7.index:
        notes.append(f"INCOMPLETE: {int(t7.loc['unclassified'].sum())} failed R3 test(s) have no failure_cause.")

    # ---- summary.md: the numbers the text of the article needs
    lines = [f"# Results of experiment '{cfg.name}'", ""]
    lines += [f"> {n}" for n in notes] + ([""] if notes else [])
    lines += [f"Test cases: {len(tc)}; steps S = {S_total}; expected results: {int(tc['n_expected'].sum())}; "
              f"applications: {tc['app'].nunique()}; models: {', '.join(models)}.", ""]
    lines += ["## Table 4 – SR, % (mean ± SD over repetitions)", "", md(t4w), ""]
    if not t5.empty:
        lines += ["## Table 5 – McNemar, R1 vs R3", "", md(t5, index=False), ""]
    lines += [f"## Table 6 – fixes and time (repetition {args.rep}); baseline t_manual = {fmt(t_manual, 2)} min",
              "", md(t6, index=False), ""]
    if not t_it.empty:
        lines += ["## R3 iterations", "", md(t_it, index=False), ""]
    if not t7.empty:
        lines += ["## Table 7 – causes of failure after R3", "",
                  md(t7.rename(index=CAUSES_UA)), ""]
    lines += ["## Placeholders in the article", ""]
    for model in models:
        def sr(mode):
            v = t4[(t4["model"] == model) & (t4["mode"] == mode)]["mean"]
            return fmt(v.iloc[0]) if len(v) else "?"

        def t6v(mode, col):
            v = t6[(t6["model"] == model) & (t6["mode"] == mode)][col]
            return fmt(v.iloc[0]) if len(v) else "?"

        lines.append(f"- {model}: X = {sr('R1')} %, Y = {sr('R3')} %, A = {t6v('R1', 'MFR_%')} %, "
                     f"B = {t6v('R3', 'MFR_%')} %, T = {t6v('R3', 'E_%')} %")
    (out / "summary.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    print("\n".join(lines))
    print(f"\nTables and Fig. 2 written to {out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
