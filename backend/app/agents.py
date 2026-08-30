"""Swarm-based multi-agent brain.

Agents:
  - Triage:  conversation understanding; reads intent + language, hands off.
  - Medical: safe general health information (never a diagnosis).
  - Care:    helps navigate Swasthya Sathi features (appointments, records...).
  - Wording: keeps every answer in the user's detected language.

Language detection is a fast Groq call made before the swarm run, so every
agent already knows which language to reply in.
"""
from __future__ import annotations

from swarm import Agent
from swarm.types import Result

from . import config
from .groq_client import get_client
from .languages import LANGUAGES, language_name, language_choice_list

APP_CAPABILITIES = (
    "Swasthya Sathi is a healthcare platform for rural India. Available features: "
    "find hospitals/clinics/PHCs on a map, book and view appointments, keep health "
    "records, referrals between doctors, follow-up care, medicine lists, and online "
    "consultation. Doctors and specialists manage appointments, patients and "
    "referrals. Health workers do field triage and home visits."
)


def detect_language(text: str) -> str:
    """One-shot Groq call returning a 2-letter language code."""
    client = get_client()
    prompt = (
        "Which language is this text written in? Choose only from:\n"
        f"{language_choice_list()}\n"
        "Reply with exactly the 2-letter code and nothing else.\n\nText:\n"
        f"{text[:500]}"
    )
    response = client.chat.completions.create(
        model=config.FALLBACK_MODEL,
        messages=[{"role": "user", "content": prompt}],
        max_tokens=8,
        temperature=0,
    )
    raw = (response.choices[0].message.content or "").strip().lower()
    return raw if raw in LANGUAGES else "en"


def _reply_lang(context_variables: dict) -> str:
    return language_name((context_variables or {}).get("lang", "en"))


# Instructions --------------------------------------------------------------
def triage_instructions(context_variables: dict) -> str:
    lang = _reply_lang(context_variables)
    return (
        "You are the Triage agent of Swasthya Mitra, the AI assistant of the "
        "Swasthya Sathi healthcare platform. Your jobs: understand what the user "
        "wants, then hand off to the specialist agent via a tool call.\n\n"
        "Rules:\n"
        "- HEALTH/SYMPTOM questions (fever, pain, cough, dietary advice, medicines "
        "basic info, etc.)  -> transfer_to_medical\n"
        "- Questions about USING the app (appointments, records, referrals, "
        "find a hospital, how a feature works) -> transfer_to_care\n"
        "- 'Translate this to <language>' / 'how do I say ...' -> transfer_to_wording\n"
        "- Greetings, thanks, small talk, or anything unrelated: answer briefly "
        "yourself, then suggest the assistant topics (health info, app help, "
        "translation).\n"
        f"- ALWAYS reply in {lang}.\n"
        "- Keep it short, warm and under 120 words."
    )


def medical_instructions(context_variables: dict) -> str:
    lang = _reply_lang(context_variables)
    return (
        "You are the Medical Advisor: a calm, careful health-information agent "
        "inside Swasthya Mitra (Swasthya Sathi).\n\n"
        "Rules:\n"
        "- You give general, preventive and first-line information ONLY.\n"
        "- NEVER diagnose, NEVER prescribe, NEVER give a 'you have X' answer.\n"
        "- Always include: persistent/severe symptoms -> visit a doctor, PHC or "
        "hospital; call 108/112 in an emergency.\n"
        "- Ask one follow-up question to understand context when needed.\n"
        "- Use short bullets. Mark important warnings in **bold**.\n"
        f"- ALWAYS reply in {lang}.\n"
        "- Keep it under 150 words. You are not a real doctor and must say so lightly "
        "when giving strong advice."
    )


def care_instructions(context_variables: dict) -> str:
    lang = _reply_lang(context_variables)
    return (
        "You are the Care Navigator inside Swasthya Mitra (Swasthya Sathi). You "
        "help people use the app.\n\n"
        f"App capabilities: {APP_CAPABILITIES}\n\n"
        "Rules:\n"
        "- Explain the relevant feature step-by-step and, when useful, point to the "
        "screen path (e.g. Patient panel -> Appointments).\n"
        "- If the user's question is medical, say you are best for app help and "
        "recommend asking the health advisor instead.\n"
        "- Keep to the app; do not invent capabilities that are not listed.\n"
        f"- ALWAYS reply in {lang}.\n"
        "- Keep it under 120 words."
    )


def wording_instructions(context_variables: dict) -> str:
    lang = _reply_lang(context_variables)
    return (
        "You are the Wording agent: a translator. You convert phrases and sentences "
        "between languages.\n"
        "- If the user names the target language, use it.\n"
        "- Otherwise translate into the conversation language.\n"
        "- Give the translation, plus a short note on pronunciation only if asked.\n"
        f"- ALWAYS reply in {lang} (this is the user's own language).\n"
        "- Keep it under 60 words."
    )


# Handoff tools (returning an Agent transfers execution in Swarm) -----------
def transfer_to_medical(context_variables: dict) -> Result:
    """Hand off to the Medical Advisor for health and symptom questions."""
    return Result(agent=medical_agent, context_variables=context_variables)


def transfer_to_care(context_variables: dict) -> Result:
    """Hand off to the Care Navigator for questions about using Swasthya Sathi."""
    return Result(agent=care_agent, context_variables=context_variables)


def transfer_to_wording(context_variables: dict) -> Result:
    """Hand off to the Wording agent for translation requests."""
    return Result(agent=wording_agent, context_variables=context_variables)


# Agent definitions ----------------------------------------------------------
medical_agent = Agent(
    name="Medical Advisor",
    model=config.GROQ_MODEL,
    instructions=medical_instructions,
    tool_choice="auto",
)
care_agent = Agent(
    name="Care Navigator",
    model=config.GROQ_MODEL,
    instructions=care_instructions,
    tool_choice="auto",
)
wording_agent = Agent(
    name="Wording",
    model=config.GROQ_MODEL,
    instructions=wording_instructions,
    tool_choice="auto",
)
triage_agent = Agent(
    name="Triage",
    model=config.GROQ_MODEL,
    instructions=triage_instructions,
    functions=[transfer_to_medical, transfer_to_care, transfer_to_wording],
    tool_choice="auto",
)


def build_agents() -> tuple[Agent, list[Agent]]:
    """Return (entry agent, all agents) as a fresh set for a single run."""
    return triage_agent, [triage_agent, medical_agent, care_agent, wording_agent]