"""Run one fixed test in debug mode, with the same environment the agent uses.

The file is edited in results/<experiment>/fixes/...; every run copies it to generated/fixes/...
(Playwright only runs files under generated/), resets the application and starts Playwright.

Usage (the application must be running):
    python3 scripts/debug_fix.py results/main/fixes/deepseek-v4.1-flash/R3/rep1/JS-24.spec.ts
    python3 scripts/debug_fix.py <file> --headed      # visible browser, normal speed
    python3 scripts/debug_fix.py <file> --slow 500    # visible browser, 500 ms pause after each action
    python3 scripts/debug_fix.py <file> --ui          # Playwright UI mode (timeline, DOM snapshots)
Default: --debug (Playwright Inspector: step through the test line by line, pick locators).
"""

from __future__ import annotations

import argparse
import json
import os
import shutil
import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from agent.config import ROOT, load_config, load_dotenv  # noqa: E402
from agent.runner import npx, reset_app  # noqa: E402
from agent.testcase import load_testcases  # noqa: E402


def main(argv=None) -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("spec", help="results/<experiment>/fixes/<model>/<mode>/rep1/<TC>.spec.ts")
    ap.add_argument("--config", default="config/experiment.yaml")
    how = ap.add_mutually_exclusive_group()
    how.add_argument("--headed", action="store_true", help="visible browser, no Inspector")
    how.add_argument("--ui", action="store_true", help="Playwright UI mode")
    how.add_argument("--slow", type=int, metavar="MS", help="visible browser, pause MS after each action")
    args = ap.parse_args(argv)
    load_dotenv()
    cfg = load_config(args.config)

    spec = Path(args.spec)
    spec = (spec if spec.is_absolute() else Path.cwd() / spec).resolve()
    src_root = (cfg.results_dir / "fixes").resolve()
    try:
        rel = spec.relative_to(src_root)
    except ValueError:
        raise SystemExit(f"The file must be under {src_root}")
    tc_id = spec.name.replace(".spec.ts", "")
    apps = {c.id: c.app for c in load_testcases(cfg.testcases_dir)}
    app = cfg.apps[apps[tc_id]]

    dst = ROOT / "generated" / "fixes" / rel
    dst.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy(spec, dst)
    reset_app(app)

    env = {
        **os.environ,
        "AGENT_BASE_URL": app.base_url,
        "AGENT_OUTPUT_DIR": str(cfg.results_dir / "work" / "debug" / tc_id),
        "AGENT_TEST_TIMEOUT_MS": str(cfg.test_timeout_ms),
        "AGENT_ACTION_TIMEOUT_MS": str(cfg.action_timeout_ms),
        "AGENT_EXPECT_TIMEOUT_MS": str(cfg.expect_timeout_ms),
        "AGENT_INIT_COOKIES": json.dumps(app.init_cookies),
    }
    cmd = [npx(), "playwright", "test", dst.relative_to(ROOT).as_posix(), "--workers=1", "--retries=0",
           "--reporter=list"]
    if args.ui:
        cmd.append("--ui")
        print("UI mode watches the copy in generated/fixes/. After editing the file in results/, "
              "run this script again (or edit the copy and copy it back).")
    elif args.headed:
        cmd.append("--headed")
    elif args.slow:
        cmd.append("--headed")
        env["SLOWMO"] = str(args.slow)
        cmd = cmd[:3] + ["--config", "scripts/playwright.debug.config.ts"] + cmd[3:]
    else:
        cmd.append("--debug")
    print(f"{app.id} at {app.base_url}: {' '.join(cmd[1:])}")
    return subprocess.run(cmd, cwd=ROOT, env=env).returncode


if __name__ == "__main__":
    raise SystemExit(main())
