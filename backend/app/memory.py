"""In-memory conversation store. Keyed by session id and kept only while the
server runs (fine for the hackathon demo; swap for Redis/SQLite later).
"""
import threading
import uuid
from typing import Any

from . import config


class SessionStore:
    def __init__(self) -> None:
        self._sessions: dict[str, dict[str, Any]] = {}
        self._lock = threading.RLock()

    def _new(self, sid: str) -> dict[str, Any]:
        return {
            "id": sid,
            "messages": [],
            "created_at": None,
            "updated_at": None,
        }

    def get_or_create(self, sid: str | None = None) -> str:
        """Return a session id, creating the session if needed."""
        with self._lock:
            if sid and sid in self._sessions:
                return sid
            if not sid or sid not in self._sessions:
                sid = sid or uuid.uuid4().hex
                self._sessions[sid] = self._new(sid)
            return sid

    def history(self, sid: str) -> list[dict[str, str]]:
        with self._lock:
            session = self._sessions.get(sid, self._new(sid))
            return list(session["messages"])[-config.MAX_HISTORY_MESSAGES * 2:]

    def append_user(self, sid: str, content: str) -> None:
        self._append(sid, "user", content)

    def append_assistant(self, sid: str, content: str) -> None:
        self._append(sid, "assistant", content)

    def _append(self, sid: str, role: str, content: str) -> None:
        with self._lock:
            session = self._sessions.setdefault(sid, self._new(sid))
            session["messages"].append({"role": role, "content": content})

    def list_sessions(self) -> list[dict[str, Any]]:
        with self._lock:
            return [
                {"id": sid, "message_count": len(s["messages"])}
                for sid, s in self._sessions.items()
            ]

    def delete(self, sid: str) -> bool:
        with self._lock:
            return self._sessions.pop(sid, None) is not None


store = SessionStore()