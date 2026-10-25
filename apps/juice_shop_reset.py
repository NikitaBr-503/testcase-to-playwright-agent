#!/usr/bin/env python3
"""Restore OWASP Juice Shop to the initial state the test cases assume.

Used as `reset_cmd` for the app `juice-shop` in config/experiment.yaml, so it runs before every test.
  1. Makes sure the test user exists (Juice Shop wipes its database on every `npm start`).
  2. Empties the test user's basket and removes its saved addresses and cards
     (they are stored on the server and would otherwise survive between tests).

Only the Python standard library is used. Usage:
    python3 apps/juice_shop_reset.py [--base-url http://localhost:3000]
"""

from __future__ import annotations

import argparse
import json
import sys
import urllib.error
import urllib.request

# Test data from config/experiment.yaml (apps.juice-shop.context). Local test application only.
EMAIL = "qa_user@example.com"
PASSWORD = "QaPassword123!"
SECURITY_QUESTION_ID = 1          # "Your eldest siblings middle name?"
SECURITY_ANSWER = "Kyiv"


def call(base: str, method: str, path: str, body=None, token: str | None = None):
    data = json.dumps(body).encode() if body is not None else None
    headers = {"content-type": "application/json"}
    if token:
        headers["authorization"] = f"Bearer {token}"
    req = urllib.request.Request(base + path, data=data, method=method, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            text = r.read().decode()
            return r.status, (json.loads(text) if text.strip().startswith(("{", "[")) else text)
    except urllib.error.HTTPError as e:
        text = e.read().decode()
        return e.code, (json.loads(text) if text.strip().startswith(("{", "[")) else text)


def ensure_user(base: str) -> bool:
    status, body = call(base, "POST", "/api/Users", {
        "email": EMAIL, "password": PASSWORD, "passwordRepeat": PASSWORD,
        "securityQuestion": {"id": SECURITY_QUESTION_ID}, "securityAnswer": SECURITY_ANSWER,
    })
    if status == 201:
        user_id = body["data"]["id"]
        call(base, "POST", "/api/SecurityAnswers",
             {"UserId": user_id, "answer": SECURITY_ANSWER, "SecurityQuestionId": SECURITY_QUESTION_ID})
        return True
    if status == 400 and "unique" in json.dumps(body):
        return False
    raise RuntimeError(f"Cannot create the test user: HTTP {status} {body}")


def empty_basket(base: str) -> int:
    status, body = call(base, "POST", "/rest/user/login", {"email": EMAIL, "password": PASSWORD})
    if status != 200:
        raise RuntimeError(f"Cannot log in as {EMAIL}: HTTP {status} {body}")
    auth = body["authentication"]
    token, bid = auth["token"], auth["bid"]
    status, basket = call(base, "GET", f"/rest/basket/{bid}", token=token)
    if status != 200:
        raise RuntimeError(f"Cannot read the basket: HTTP {status} {basket}")
    removed = 0
    for product in basket["data"].get("Products", []):
        item_id = product["BasketItem"]["id"]
        status, _ = call(base, "DELETE", f"/api/BasketItems/{item_id}", token=token)
        if status != 200:
            raise RuntimeError(f"Cannot remove basket item {item_id}: HTTP {status}")
        removed += 1
    for collection in ("Addresss", "Cards"):  # sic: Juice Shop's API path is /api/Addresss
        status, body = call(base, "GET", f"/api/{collection}", token=token)
        if status != 200:
            raise RuntimeError(f"Cannot list {collection}: HTTP {status} {body}")
        for entry in body.get("data", []):
            status, _ = call(base, "DELETE", f"/api/{collection}/{entry['id']}", token=token)
            if status != 200:
                raise RuntimeError(f"Cannot remove {collection} {entry['id']}: HTTP {status}")
            removed += 1
    return removed


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--base-url", default="http://localhost:3000")
    args = ap.parse_args()
    base = args.base_url.rstrip("/")
    try:
        created = ensure_user(base)
        removed = empty_basket(base)
    except (RuntimeError, urllib.error.URLError) as e:
        print(f"juice_shop_reset: {e}", file=sys.stderr)
        return 1
    print(f"juice_shop_reset: user {'created' if created else 'exists'}, {removed} basket item(s)/address(es)/card(s) removed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
