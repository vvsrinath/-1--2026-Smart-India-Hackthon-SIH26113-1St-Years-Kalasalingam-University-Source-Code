# AI Backend — Swarm × Groq

The `backend/` folder is a Python **FastAPI** service that powers the in-app AI
assistant (Swasthya Mitra).

- **Swarm** (OpenAI's multi-agent framework) handles *conversation
  understanding*: a Triage agent reads intent and hands off to specialist
  agents (Medical Advisor, Care Navigator, Wording/Translator).
- **Groq** provides the LLM inference (fast, free tier) through an
  OpenAI-compatible API.

## How it works

```
User message
  -> detect language (fast Groq call: which of the 12 Indian languages?)
  -> Triage agent (Swarm) routes by intent:
       health/symptom question        -> Medical Advisor
       "how do I use the app"         -> Care Navigator
       translation request            -> Wording
       small talk / unrelated         -> answered by Triage itself
  -> answer written in the user's language
  -> streamed back to the frontend over SSE
```

Safety first: every message is scanned locally for emergency keywords
(multilingual). If found, an immediate emergency reply is returned without any
LLM call. Medical agents are instructed to never diagnose or prescribe.

## Run it locally

Requirements: Python 3.11+.

```bash
cd backend
python -m venv .venv
.venv/bin/pip install -r requirements.txt        # macOS/Windows: .venv\Scripts\pip

# 1. copy the example env and add a free key from https://console.groq.com
cp .env.example .env
#    -> edit .env, set GROQ_API_KEY=your_key

# 2. start the API (hot reload on)
.venv/bin/uvicorn app.main:app --reload --port 8000
```

Open http://localhost:8000/docs for the interactive API docs.

> Note: use the correct activate command for your OS
> (`source .venv/bin/activate` on macOS/Linux, `.venv\Scripts\activate` on Windows),
> or call binaries directly with `.venv/bin/uvicorn`.

## Configuration (.env)

| Variable | Default | Purpose |
| --- | --- | --- |
| `GROQ_API_KEY` | — | **Required.** Free key from console.groq.com |
| `GROQ_MODEL` | `llama-3.3-70b-versatile` | Main agent model |
| `FALLBACK_MODEL` | `llama-3.1-8b-instant` | Cheap/fast model (language detection) |
| `CORS_ORIGINS` | localhost:5173,5174 | Comma-separated allowed origins |
| `MAX_HISTORY_MESSAGES` | `20` | Turns of conversation kept per session |
| `MAX_AGENT_TURNS` | `6` | Swarm handoff depth limit |

## API

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/api/v1/health` | Server + Groq connectivity status |
| `POST` | `/api/v1/chat/stream` | SSE streaming conversation turn |
| `POST` | `/api/v1/chat` | Same, but plain JSON (for tests/clients) |
| `POST` | `/api/v1/translate` | Translate text into one of the 12 languages |
| `GET` | `/api/v1/sessions` | List live sessions |
| `DELETE` | `/api/v1/sessions/{id}` | End a session |

### Chat request

```json
{
  "session_id": "optional-client-uuid",
  "message": "mujhe bukhar hai aur gala kharab hai",
  "lang": "auto",
  "role": "patient",
  "features": ["appointments", "records"]
}
```

`lang: "auto"` detects the language from the message; any ISO code
(`hi`, `ta`, `bn`, ...) forces that language.

### Streaming response (SSE)

```text
event: meta    {"session_id": "...", "agent": "Triage", "lang": "hi", "emergency": false}
event: delta   {"text": "अगर बुखार…"}
event: delta   {"text": " ज़्यादा है तो…"}
event: done    {"session_id": "...", "agent": "Medical Advisor"}
```

The frontend reads this in `src/api/backend.ts` (`streamChat`).

## Agent design (`backend/app/agents.py`)

- **Triage** — understands the request, picks an agent via Swarm handoff tools.
- **Medical Advisor** — general, non-diagnostic health information with a
  "see a doctor if it persists" disclaimer.
- **Care Navigator** — explains app features and workflows.
- **Wording** — translator between languages.

Each agent's instructions are a callable that receives `context_variables`
(e.g. the detected `lang`) so every answer is produced in the user's language.

## Tests

```bash
cd backend
.venv/bin/python -m pytest tests -q
```

Tests run without a Groq key: the emergency path, unconfigured responses, and
the SSE framing are verified with mocks.

## Deploying

Run this as a **separate long-lived service** (not on the static host):

1. **Render (recommended, one click)**: the repo's `render.yaml` Blueprint already
   defines this backend as a Python web service rooted at `backend/`. In Render:
   New → Blueprint → connect the repo → set the **GROQ_API_KEY** env var (it is
   deliberately never committed) → Deploy. Health check hits `/api/v1/health`.
   Alternatively create a plain New Web Service with:
   - Root directory: `backend`
   - Build command: `pip install -r requirements.txt`
   - Start command: `.venv/bin/uvicorn app.main:app --host 0.0.0.0 --port $PORT`
2. **Railway**: same idea — start command
   `uvicorn app.main:app --host 0.0.0.0 --port $PORT` (a `backend/Procfile` is
   included for Procfile-based hosts).
3. Point the frontend at the deployed URL:
   copy the root `.env.example` to `.env` and set
   `VITE_API_BASE_URL=https://your-backend.onrender.com`
   before running `npm run build`.

## Folder layout

```text
backend/
├── app/
│   ├── main.py          # FastAPI routes + SSE
│   ├── agents.py        # Swarm agents + handoffs
│   ├── groq_client.py   # OpenAI client -> Groq endpoint
│   ├── languages.py     # 12 interface languages
│   ├── memory.py        # in-memory conversation store
│   ├── schemas.py       # request/response models
│   ├── security.py      # emergency filter (no LLM needed)
│   └── config.py        # env-driven settings
├── tests/               # pytest suite (runs without a key)
├── requirements.txt
└── .env.example
```

## Limitations (hackathon scope)

- Conversation state is stored in memory and resets when the server restarts.
- Groq models handle the 12 Indian languages well for short exchanges but are
  not perfect translators; dedicated translation models can replace the Wording
  agent later.
- Swarm is an educational multi-agent framework; the agent logic is isolated in
  `agents.py` so it can be swapped for the OpenAI Agents SDK without touching
  the API layer.