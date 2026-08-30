import pytest

from app.security import detect_emergency
from app.main import app
from fastapi.testclient import TestClient

client = TestClient(app)


def test_health_endpoint_returns_unconfigured_without_key():
    resp = client.get("/api/v1/health")
    assert resp.status_code == 200
    body = resp.json()
    assert body["status"] in ("ok", "unconfigured", "degraded")
    assert body["groq"] is False  # CI has no key
    assert body["model"]


def test_emergency_detection_multilingual():
    assert detect_emergency("I have chest pain right now") is True
    assert detect_emergency("मेरे सीने में दर्द है और सांस नहीं आ रही") is True
    assert detect_emergency("what is the weather today") is False
    assert detect_emergency("can you book my appointment") is False


def test_emergency_chat_short_circuit_without_llm():
    resp = client.post("/api/v1/chat", json={"message": "heart attack emergency help"})
    assert resp.status_code == 200
    body = resp.json()
    assert body["emergency"] is True
    assert "108" in body["reply"]
    assert body["agent"] == "Safety"


def test_chat_requires_key_without_llm():
    resp = client.post("/api/v1/chat", json={"message": "hello"})
    # Without GROQ_API_KEY we return 503 with a clear instruction.
    assert resp.status_code == 503
    assert "GROQ_API_KEY" in resp.json()["detail"]


def test_translate_requires_key_without_llm():
    resp = client.post("/api/v1/translate", json={"text": "hello", "to": "hi"})
    assert resp.status_code == 503


def test_sessions_roundtrip():
    list_resp = client.get("/api/v1/sessions")
    assert list_resp.status_code == 200
    sessions = list_resp.json()["sessions"]
    assert isinstance(sessions, list)

    # create a session via a fake id then delete it
    store_id = "unit-test-session"
    client.post("/api/v1/chat", json={"message": "heart attack emergency help", "session_id": store_id})
    assert store_id in [s["id"] for s in client.get("/api/v1/sessions").json()["sessions"]]

    del_resp = client.delete(f"/api/v1/sessions/{store_id}")
    assert del_resp.status_code == 204

    missing = client.delete(f"/api/v1/sessions/{store_id}")
    assert missing.status_code == 404


def _fake_run(_self=None, **_kwargs):
    """Fake Swarm stream matching swarm/core.py event shapes."""
    events = [
        {"delim": "start"},
        {"content": "Hello", "role": "assistant", "sender": "Triage"},
        {"content": None, "role": "assistant", "function_call": None},  # tool delta
        {"content": "! ", "role": "assistant", "sender": "Medical Advisor"},
        {"delim": "end"},
    ]
    for event in events:
        yield event
    from types import SimpleNamespace

    yield {"response": SimpleNamespace(agent=SimpleNamespace(name="Medical Advisor"))}


def test_chat_stream_sse_framing(monkeypatch):
    import app.main as main

    monkeypatch.setattr(main.config, "GROQ_API_KEY", "mock-key")
    monkeypatch.setattr(main, "detect_language", lambda text: "en")
    monkeypatch.setattr(main, "get_swarm", lambda: type("FakeSwarm", (), {"run": _fake_run})())

    resp = client.post("/api/v1/chat/stream", json={"message": "hello", "session_id": "stream-test"})
    assert resp.status_code == 200
    body = resp.text

    assert "event: meta" in body
    assert '"emergency": false' in body
    assert "event: delta" in body
    assert "Hello" in body and "! " in body
    assert "event: done" in body
    assert '"agent": "Medical Advisor"' in body

    # history persisted for the session
    hist = client.get("/api/v1/sessions").json()["sessions"]
    stream_session = next(s for s in hist if s["id"] == "stream-test")
    assert stream_session["message_count"] == 2
    client.delete("/api/v1/sessions/stream-test")