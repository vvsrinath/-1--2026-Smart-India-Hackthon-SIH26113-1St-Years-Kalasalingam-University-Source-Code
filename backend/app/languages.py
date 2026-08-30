"""The 12 interface languages used across Swasthya Sathi.
"""
LANGUAGES: dict[str, str] = {
    "en": "English",
    "hi": "Hindi",
    "ta": "Tamil",
    "te": "Telugu",
    "mr": "Marathi",
    "bn": "Bengali",
    "gu": "Gujarati",
    "kn": "Kannada",
    "ml": "Malayalam",
    "or": "Odia",
    "pa": "Punjabi",
    "ur": "Urdu",
}


def language_name(code: str) -> str:
    """Human-readable language name, defaulting to English."""
    return LANGUAGES.get(code, "English")


def normalize_lang_code(code: str) -> str:
    """Normalize a detected/received code into a known 2-letter code."""
    code = (code or "").strip().lower()
    if code in LANGUAGES:
        return code
    aliases = {
        "en": "en", "english": "en", "ingilish": "en",
        "hi": "hi", "hindi": "hi", "hindi": "hi", "हिन्दी": "hi", "हिंदी": "hi",
        "ta": "ta", "tamil": "ta", "தமிழ்": "ta",
        "te": "te", "telugu": "te", "తెలుగు": "te",
        "mr": "mr", "marathi": "mr", "मराठी": "mr",
        "bn": "bn", "bengali": "bn", "বাংলা": "bn",
        "gu": "gu", "gujarati": "gu", "ગુજરાતી": "gu",
        "kn": "kn", "kannada": "kn", "ಕನ್ನಡ": "kn",
        "ml": "ml", "malayalam": "ml", "മലയാളം": "ml",
        "or": "or", "odia": "or", "oriya": "or", "ଓଡ଼ିଆ": "or",
        "pa": "pa", "punjabi": "pa", "ਪੰਜਾਬੀ": "pa",
        "ur": "ur", "urdu": "ur", "اردو": "ur",
    }
    return aliases.get(code, "en")


def language_choice_list() -> str:
    """Comma-separated list for prompts: 'en: English, hi: Hindi, ...'"""
    return ", ".join(f"{code}: {name}" for code, name in LANGUAGES.items())