"""Clients for language models.

Only the Python standard library is used, so no vendor SDK has to be installed.
Supported providers:
  * anthropic          – Anthropic Messages API
  * openai_compatible  – any /chat/completions API (OpenAI, OpenRouter, Ollama, vLLM, LM Studio …)
  * fake               – replays prepared answers from files (self-test, no API costs)
"""

from __future__ import annotations

import base64
import json
import time
import urllib.error
import urllib.request
from dataclasses import dataclass
from pathlib import Path
from typing import List, Optional

from .config import ROOT, ModelConfig


@dataclass
class LLMResult:
    text: str
    input_tokens: int
    output_tokens: int
    seconds: float


@dataclass
class Image:
    png_bytes: bytes

    @property
    def b64(self) -> str:
        return base64.b64encode(self.png_bytes).decode("ascii")


class LLMError(RuntimeError):
    pass


def _post_json(url: str, headers: dict, payload: dict, timeout: int = 300, retries: int = 5) -> dict:
    data = json.dumps(payload).encode("utf-8")
    delay = 5.0
    for attempt in range(1, retries + 1):
        req = urllib.request.Request(url, data=data, method="POST",
                                     headers={"content-type": "application/json", **headers})
        try:
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                return json.loads(resp.read().decode("utf-8"))
        except urllib.error.HTTPError as e:
            body = e.read().decode("utf-8", "replace")[:2000]
            retryable = e.code in (408, 409, 429) or e.code >= 500
            if retryable and attempt < retries:
                time.sleep(delay)
                delay *= 2
                continue
            raise LLMError(f"HTTP {e.code} from {url}: {body}") from None
        except (urllib.error.URLError, TimeoutError) as e:
            if attempt < retries:
                time.sleep(delay)
                delay *= 2
                continue
            raise LLMError(f"Cannot reach {url}: {e}") from None
    raise LLMError("unreachable")


class LLMClient:
    def __init__(self, cfg: ModelConfig):
        self.cfg = cfg

    def complete(self, system: str, user: str, images: Optional[List[Image]] = None,
                 context: Optional[dict] = None) -> LLMResult:
        raise NotImplementedError


class AnthropicClient(LLMClient):
    URL = "https://api.anthropic.com/v1/messages"

    def complete(self, system, user, images=None, context=None):
        if not self.cfg.api_key:
            raise LLMError(f"Environment variable {self.cfg.api_key_env} is empty (see .env.example)")
        content = []
        for img in images or []:
            content.append({"type": "image",
                            "source": {"type": "base64", "media_type": "image/png", "data": img.b64}})
        content.append({"type": "text", "text": user})
        payload = {
            "model": self.cfg.model,
            "max_tokens": self.cfg.max_tokens,
            "system": system,
            "messages": [{"role": "user", "content": content}],
            **self.cfg.extra,
        }
        if self.cfg.temperature is not None:
            payload["temperature"] = self.cfg.temperature
        url = (self.cfg.base_url.rstrip("/") + "/v1/messages") if self.cfg.base_url else self.URL
        t0 = time.monotonic()
        resp = _post_json(url, {"x-api-key": self.cfg.api_key, "anthropic-version": "2023-06-01"}, payload)
        seconds = time.monotonic() - t0
        text = "".join(b.get("text", "") for b in resp.get("content", []) if b.get("type") == "text")
        usage = resp.get("usage", {})
        return LLMResult(text, int(usage.get("input_tokens", 0)), int(usage.get("output_tokens", 0)), seconds)


class OpenAICompatibleClient(LLMClient):
    def complete(self, system, user, images=None, context=None):
        base = (self.cfg.base_url or "https://api.openai.com/v1").rstrip("/")
        if images:
            content = [{"type": "text", "text": user}] + [
                {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{img.b64}"}}
                for img in images
            ]
        else:
            content = user
        payload = {
            "model": self.cfg.model,
            "max_tokens": self.cfg.max_tokens,
            "messages": [{"role": "system", "content": system}, {"role": "user", "content": content}],
            **self.cfg.extra,
        }
        if self.cfg.temperature is not None:
            payload["temperature"] = self.cfg.temperature
        headers = {"authorization": f"Bearer {self.cfg.api_key}"} if self.cfg.api_key else {}
        t0 = time.monotonic()
        resp = _post_json(base + "/chat/completions", headers, payload)
        seconds = time.monotonic() - t0
        try:
            text = resp["choices"][0]["message"]["content"] or ""
        except (KeyError, IndexError):
            raise LLMError(f"Unexpected response: {json.dumps(resp)[:1000]}") from None
        if isinstance(text, list):  # some servers return content parts
            text = "".join(p.get("text", "") for p in text if isinstance(p, dict))
        usage = resp.get("usage") or {}
        return LLMResult(text, int(usage.get("prompt_tokens", 0)), int(usage.get("completion_tokens", 0)), seconds)


class FakeClient(LLMClient):
    """Returns <responses_dir>/<TC>/<mode>/iter<i>.md, or <responses_dir>/<TC>/iter<i>.md.

    If the file for iteration i does not exist, the last available iteration is repeated.
    """

    def complete(self, system, user, images=None, context=None):
        context = context or {}
        base = ROOT / (self.cfg.responses_dir or "selftest/responses") / context.get("tc_id", "")
        i = int(context.get("iteration", 1))
        candidates = []
        for folder in (base / context.get("mode", ""), base):
            for k in range(i, 0, -1):
                candidates.append(folder / f"iter{k}.md")
        for path in candidates:
            if path.exists():
                text = path.read_text(encoding="utf-8")
                return LLMResult(text, len(system + user) // 4, len(text) // 4, 0.01)
        raise LLMError(f"Fake model has no answer for {context} in {base}")


def make_client(cfg: ModelConfig) -> LLMClient:
    providers = {"anthropic": AnthropicClient, "openai_compatible": OpenAICompatibleClient, "fake": FakeClient}
    if cfg.provider not in providers:
        raise ValueError(f"Unknown provider '{cfg.provider}' for model '{cfg.id}'; allowed: {list(providers)}")
    return providers[cfg.provider](cfg)


def load_image(path: Optional[Path]) -> Optional[Image]:
    if path and path.exists():
        return Image(path.read_bytes())
    return None
