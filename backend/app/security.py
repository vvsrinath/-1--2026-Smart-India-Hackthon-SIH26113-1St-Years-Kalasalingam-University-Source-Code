"""Safety checks that do not require an LLM call.
"""
EMERGENCY_KEYWORDS: tuple[str, ...] = (
    # English
    "emergency", "chest pain", "heart attack", "severe bleeding", "not breathing",
    "unconscious", "can't breathe", "cannot breathe", "difficulty breathing",
    "suicide", "self harm", "overdose", "stroke", "seizure", "poisoning",
    "para", "accident", "severe burn", "choking", "drowning", "unresponsive",
    # Hindi / Hinglish
    "dil ka daura", "dil ka dour", "saans nahi a rahi", "saans nahi aa rahi",
    "behosh", "aag lagni", "khoon bah raha", "भारी रक्तस्राव", "दिल का दौरा",
    "सांस नहीं आ रही", "खुदकुशी", "आत्महत्या", "बेहोश", "हादसा", "जलन",
    # Tamil / Telugu / common local usage
    "muyalvai", "udanadhi", "prana maaram",
)

EMERGENCY_REPLY_EN = (
    "This sounds like a medical emergency - please act now:\n\n"
    "1. Call your local emergency number (India: **108** ambulance / **112**).\n"
    "2. Or go to the nearest hospital or PHC immediately.\n"
    "3. Do not drive yourself if possible — ask someone to help.\n"
    "4. Stay with the person, keep them comfortable, and do not give food or water.\n\n"
    "Swasthya Sathi is an information assistant and cannot provide emergency care."
)


def detect_emergency(text: str) -> bool:
    """Quick keyword scan for urgent situations (multilingual)."""
    lowered = (text or "").lower()
    return any(kw in lowered for kw in EMERGENCY_KEYWORDS)


def emergency_reply() -> str:
    return EMERGENCY_REPLY_EN