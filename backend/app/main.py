"""FastAPI application exposing the Swarm-and-Groq assistant.

Run with:
    uvicorn app.main:app --reload --port 8000
"""
from __future__ import annotations

import json
from typing import Iterator

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, StreamingResponse

from . import config
from .agents import build_agents, detect_language
from .groq_client import get_client, get_swarm, health_check
from .languages import LANGUAGES, language_name, normalize_lang_code
from .memory import store
from .schemas import (
    ChatRequest,
    ChatResponse,
    HealthResponse,
    SessionInfo,
    SessionsResponse,
    TranslateRequest,
    TranslateResponse,
)
from .security import detect_emergency, emergency_reply

app = FastAPI(
    title="Swasthya Sathi AI Assistant API",
    description="Swarm multi-agent (language + conversation understanding) on Groq.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=config.CORS_ORIGINS or ["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

_MISSING_KEY = (
    "AI backend is not configured. Set GROQ_API_KEY in backend/.env "
    "(see backend/.env.example) and restart the server."
)


def _resolve_lang(request_lang: str, message: str) -> str:
    """Use an explicit code, else auto-detect from the message."""
    if request_lang and request_lang.lower() not in ("auto", ""):
        code = normalize_lang_code(request_lang)
        if code in LANGUAGES:
            return code
    try:
        return detect_language(message)
    except Exception:
        return "en"


def _context_variables(req: ChatRequest, lang: str) -> dict:
    return {
        "lang": lang,
        "role": req.role or "visitor",
        "features": req.features or [],
    }


def _final_reply(resp) -> tuple[str, str]:
    """Pull the final assistant text + the agent that produced it."""
    reply = ""
    for msg in resp.messages:
        if msg.get("role") == "assistant" and isinstance(msg.get("content"), str):
            reply = msg["content"]
    agent = (resp.agent.name if resp.agent else None) or "Triage"
    return reply.strip(), agent


@app.get("/", include_in_schema=False)
def root():
    return {"app": "Swasthya Sathi AI Assistant API", "docs": "/docs", "health": "/api/v1/health"}


@app.get("/api/v1/health", response_model=HealthResponse)
def health():
    up = health_check()
    status = "ok" if up else "unconfigured" if not config.GROQ_API_KEY else "degraded"
    return HealthResponse(
        status=status,
        model=config.GROQ_MODEL,
        groq=up,
        message="LLM backend reachable." if up else _MISSING_KEY,
    )


@app.post("/api/v1/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    emergency = detect_emergency(req.message)
    if emergency:
        sid = store.get_or_create(req.session_id)
        return ChatResponse(
            session_id=sid,
            agent="Safety",
            reply=emergency_reply(),
            emergency=True,
            lang="en",
        )
    if not config.GROQ_API_KEY:
        raise HTTPException(status_code=503, detail=_MISSING_KEY)

    lang = _resolve_lang(req.lang, req.message)
    sid = store.get_or_create(req.session_id)
    messages = store.history(sid) + [{"role": "user", "content": req.message}]

    entry, _agents = build_agents()
    resp = get_swarm().run(
        agent=entry,
        messages=messages,
        context_variables=_context_variables(req, lang),
        max_turns=config.MAX_AGENT_TURNS,
    )
    reply, agent = _final_reply(resp)

    store.append_user(sid, req.message)
    store.append_assistant(sid, reply)
    return ChatResponse(session_id=sid, agent=agent, reply=reply, emergency=False, lang=lang)


@app.post("/api/v1/chat/stream")
def chat_stream(req: ChatRequest):
    emergency = detect_emergency(req.message)
    if emergency:
        sid = store.get_or_create(req.session_id)
        return StreamingResponse(
            _emergency_stream(sid),
            media_type="text/event-stream",
            headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
        )
    if not config.GROQ_API_KEY:
        raise HTTPException(status_code=503, detail=_MISSING_KEY)
    return StreamingResponse(
        _swarm_stream(req),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


def _sse(event: str, data: dict) -> str:
    return f"event: {event}\ndata: {json.dumps(data, ensure_ascii=False)}\n\n"


def _emergency_stream(sid: str) -> Iterator[str]:
    yield _sse("meta", {"session_id": sid, "agent": "Safety", "lang": "en", "emergency": True})
    yield _sse("delta", {"text": emergency_reply()})
    yield _sse("done", {"session_id": sid})


def _swarm_stream(req: ChatRequest) -> Iterator[str]:
    lang = _resolve_lang(req.lang, req.message)
    sid = store.get_or_create(req.session_id)
    messages = store.history(sid) + [{"role": "user", "content": req.message}]

    entry, _agents = build_agents()
    stream = get_swarm().run(
        agent=entry,
        messages=messages,
        context_variables=_context_variables(req, lang),
        max_turns=config.MAX_AGENT_TURNS,
        stream=True,
    )

    yield _sse("meta", {"session_id": sid, "agent": entry.name, "lang": lang, "emergency": False})

    chunks: list[str] = []
    final_agent = entry.name
    for event in stream:
        if "delim" in event:
            continue
        if "response" in event:
            response = event["response"]
            final_agent = (response.agent.name if response.agent else None) or entry.name
            continue
        content = event.get("content")
        if isinstance(content, str) and content:
            chunks.append(content)
            yield _sse("delta", {"text": content})

    reply = "".join(chunks).strip()
    store.append_user(sid, req.message)
    store.append_assistant(sid, reply)
    yield _sse("done", {"session_id": sid, "agent": final_agent})


@app.post("/api/v1/translate", response_model=TranslateResponse)
def translate(req: TranslateRequest):
    if not config.GROQ_API_KEY:
        raise HTTPException(status_code=503, detail=_MISSING_KEY)
    to = normalize_lang_code(req.to)
    client = get_client()
    prompt = (
        f"Translate the following text into {language_name(to)} "
        f"({to}). Reply with ONLY the translation, no quotes or notes.\n\n{req.text[:2000]}"
    )
    resp = client.chat.completions.create(
        model=config.GROQ_MODEL,
        messages=[{"role": "user", "content": prompt}],
    )
    translated = (resp.choices[0].message.content or "").strip()
    return TranslateResponse(text=translated, from_lang=req.source or "auto", to_lang=to)


@app.get("/api/v1/sessions", response_model=SessionsResponse)
def list_sessions():
    return SessionsResponse(
        sessions=[SessionInfo(id=s["id"], message_count=s["message_count"]) for s in store.list_sessions()]
    )


@app.delete("/api/v1/sessions/{session_id}")
def delete_session(session_id: str):
    if not store.delete(session_id):
        raise HTTPException(status_code=404, detail="Session not found")
    return JSONResponse(status_code=204, content=None)