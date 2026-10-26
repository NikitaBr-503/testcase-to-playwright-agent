"""The generation loop for one combination «test case – mode – model – repetition».

R1 – one attempt, the model sees only the test case.
R2 – one attempt, plus the accessibility snapshot of the start page.
R3 – as R2, then up to K runs with self-correction based on execution feedback (Fig. 1 in the article).
"""

from __future__ import annotations

import json
import shutil
import time
from pathlib import Path
from typing import Dict, Optional

from . import code as codeutil
from .config import ROOT, AppConfig, Config, ModelConfig
from .llm import LLMClient, LLMError, load_image  # noqa: F401
from .prompts import Feedback, system_prompt, user_prompt
from .runner import reset_app, run_spec
from .testcase import TestCase

FIXTURES = ROOT / "support" / "fixtures.ts"


def _log(msg: str) -> None:
    print(msg, flush=True)


def run_combination(cfg: Config, model: ModelConfig, client: LLMClient, mode: str, rep: int,
                    tc: TestCase, app: AppConfig, start_snapshot: Optional[str]) -> Dict:
    key = f"{model.id}/{mode}/rep{rep}/{tc.id}"
    spec = cfg.generated_dir / model.id / mode / f"rep{rep}" / f"{tc.id}.spec.ts"
    work = cfg.results_dir / "work" / model.id / mode / f"rep{rep}" / tc.id
    archive = cfg.results_dir / "iterations" / model.id / mode / f"rep{rep}" / tc.id
    for d in (spec.parent, archive):
        d.mkdir(parents=True, exist_ok=True)
    if archive.exists():
        for old in archive.iterdir():
            old.unlink()

    max_iter = cfg.max_iterations if mode == "R3" else 1
    snapshot = start_snapshot if mode in ("R2", "R3") else None
    system = system_prompt()
    iterations = []
    feedback: Optional[Feedback] = None
    first_assertions = None
    passed = False
    final_code = None
    t_start = time.monotonic()

    for i in range(1, max_iter + 1):
        with_shot = bool(feedback and feedback.run and feedback.run.screenshot and model.vision)
        user = user_prompt(tc, app, snapshot, feedback, i, max_iter, with_shot)
        images = [load_image(feedback.run.screenshot)] if with_shot else []
        (archive / f"iter{i}.prompt.md").write_text(user, encoding="utf-8")

        try:
            res = client.complete(system, user, [im for im in images if im],
                                  context={"tc_id": tc.id, "mode": mode, "iteration": i})
        except LLMError:
            # API problems (wrong key, no credits, network) are not results of the experiment:
            # nothing is recorded and the run stops, so the combination is repeated next time.
            raise
        (archive / f"iter{i}.response.md").write_text(res.text, encoding="utf-8")
        it = {"iteration": i, "llm_seconds": round(res.seconds, 2),
              "input_tokens": res.input_tokens, "output_tokens": res.output_tokens,
              "finish_reason": res.finish_reason}

        raw_code = codeutil.extract_code(res.text)
        if raw_code is None:
            truncated = res.finish_reason == "length"
            it.update(passed=False, status="no_code", flags=["no_code"] + (["truncated"] if truncated else []))
            iterations.append(it)
            _log(f"  {key} iter{i}: answer has no code block" + (" (cut off at max_tokens)" if truncated else ""))
            feedback = Feedback(previous_code=res.text[:4000], run=None, failed_marker=None,
                                note="Your answer did not contain a ```ts code block with the test file.")
            continue

        code = codeutil.rewrite_import(raw_code, spec, FIXTURES)
        spec.write_text(code, encoding="utf-8")
        (archive / f"iter{i}.spec.ts").write_text(code, encoding="utf-8")

        info = codeutil.analyze(code, tc)
        if first_assertions is None:
            first_assertions = info["assertions"]
        flags = codeutil.flags_for(info, tc, first_assertions)

        reset_app(app)
        run = run_spec(spec, app, cfg, work / f"iter{i}")
        marker = codeutil.marker_at_line(code, run.line)
        it.update(passed=run.passed, status=run.status, run_seconds=round(run.seconds, 2),
                  error=run.error[:1500], error_line=run.line, failed_marker=marker,
                  assertions=info["assertions"], missing_steps=info["missing_steps"],
                  missing_expected=info["missing_expected"], flags=flags,
                  had_screenshot=bool(run.screenshot), had_snapshot=bool(run.aria_snapshot))
        iterations.append(it)
        final_code = code
        _log(f"  {key} iter{i}: {run.status}" + (f" at {marker}" if marker and not run.passed else ""))
        if run.screenshot:
            shutil.copy(run.screenshot, archive / f"iter{i}.failure.png")
        if run.passed:
            passed = True
            break
        feedback = Feedback(previous_code=raw_code, run=run, failed_marker=marker)

    agent_seconds = time.monotonic() - t_start

    # Criterion 1 of success (article, section 4.7): the test passes several consecutive runs.
    stable_passes = 0
    if passed:
        stable_passes = 1
        for s in range(2, cfg.stability_runs + 1):
            reset_app(app)
            again = run_spec(spec, app, cfg, work / f"stability{s}")
            if not again.passed:
                break
            stable_passes += 1
    stable = passed and stable_passes >= cfg.stability_runs

    all_flags = sorted({f for it in iterations for f in it.get("flags", [])})
    final_flags = iterations[-1].get("flags", []) if iterations else []
    record = {
        "experiment": cfg.name, "model": model.id, "model_name": model.model, "mode": mode, "rep": rep,
        "tc_id": tc.id, "app": tc.app, "complexity": tc.complexity,
        "n_steps": tc.n_steps, "n_expected": tc.n_expected,
        "iterations": len(iterations), "passed": passed, "stable": stable, "stable_passes": stable_passes,
        "agent_seconds": round(agent_seconds, 2),
        "llm_seconds": round(sum(it.get("llm_seconds", 0) for it in iterations), 2),
        "input_tokens": sum(it.get("input_tokens", 0) for it in iterations),
        "output_tokens": sum(it.get("output_tokens", 0) for it in iterations),
        "final_assertions": iterations[-1].get("assertions") if iterations else None,
        "flags": all_flags, "final_flags": final_flags,
        "needs_review": codeutil.needs_review(final_flags),
        "final_spec": spec.relative_to(ROOT).as_posix() if final_code else None,
        "iteration_details": iterations,
    }
    (archive / "record.json").write_text(json.dumps(record, ensure_ascii=False, indent=2), encoding="utf-8")
    return record
