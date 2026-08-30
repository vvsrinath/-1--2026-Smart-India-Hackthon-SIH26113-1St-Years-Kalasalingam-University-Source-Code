"""Thin wrapper around the OpenAI client + Swarm wired to Groq's
OpenAI-compatible endpoint.
"""
from openai import OpenAI
from swarm import Swarm

from . import config

_client: OpenAI | None = None
_swarm: Swarm | None = None


def get_client() -> OpenAI:
    global _client
    if _client is None:
        if not config.GROQ_API_KEY:
            raise RuntimeError(
                "GROQ_API_KEY is not set. Copy backend/.env.example to "
                "backend/.env and add your key from https://console.groq.com"
            )
        _client = OpenAI(api_key=config.GROQ_API_KEY, base_url=config.GROQ_BASE_URL)
    return _client


def get_swarm() -> Swarm:
    global _swarm
    if _swarm is None:
        _swarm = Swarm(client=get_client())
    return _swarm


def health_check() -> bool:
    """True when Groq is reachable with the configured key."""
    if not config.GROQ_API_KEY:
        return False
    try:
        get_client().models.list()
        return True
    except Exception:
        return False