"""central configuration for the Swasthya Sathi AI backend.
Loads values from environment or a .env file next to this backend.
"""
import os
from pathlib import Path

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")

# Groq (OpenAI-compatible) credentials -------------------------------------
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "").strip()
GROQ_BASE_URL = os.getenv("GROQ_BASE_URL", "https://api.groq.com/openai/v1").rstrip("/")
GROQ_MODEL = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")
FALLBACK_MODEL = os.getenv("FALLBACK_MODEL", "llama-3.1-8b-instant")

# App behaviour ------------------------------------------------------------
CORS_ORIGINS = [
    o.strip()
    for o in os.getenv(
        "CORS_ORIGINS",
        "http://localhost:5173,http://localhost:5174,http://127.0.0.1:5173,http://127.0.0.1:5174",
    ).split(",")
    if o.strip()
]
MAX_HISTORY_MESSAGES = int(os.getenv("MAX_HISTORY_MESSAGES", "20"))
MAX_AGENT_TURNS = int(os.getenv("MAX_AGENT_TURNS", "6"))