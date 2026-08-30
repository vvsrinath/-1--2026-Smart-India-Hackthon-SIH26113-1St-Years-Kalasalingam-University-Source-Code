"""Pydantic request/response models for the API.
"""
from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=4000)
    session_id: str | None = None
    lang: str = "auto"  # 'auto' detects from the message; or an ISO code
    role: str = "visitor"
    features: list[str] = Field(default_factory=list)


class ChatResponse(BaseModel):
    session_id: str
    agent: str
    reply: str
    emergency: bool = False
    lang: str = "en"


class TranslateRequest(BaseModel):
    text: str = Field(min_length=1, max_length=4000)
    to: str = Field(min_length=2, max_length=8)
    source: str = "auto"


class TranslateResponse(BaseModel):
    text: str
    from_lang: str
    to_lang: str


class SessionInfo(BaseModel):
    id: str
    message_count: int


class SessionsResponse(BaseModel):
    sessions: list[SessionInfo]


class HealthResponse(BaseModel):
    status: str
    model: str
    groq: bool
    message: str