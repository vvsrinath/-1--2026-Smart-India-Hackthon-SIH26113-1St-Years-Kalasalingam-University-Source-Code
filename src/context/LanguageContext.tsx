import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

/**
 * The 22 Scheduled Languages of India plus English.
 * English content is fully implemented; other languages are architecturally
 * supported and fall back to English rather than showing invented translations.
 */
export type LanguageCode =
'en' |
'as' |
'bn' |
'brx' |
'doi' |
'gu' |
'hi' |
'kn' |
'ks' |
'kok' |
'mai' |
'ml' |
'mni' |
'mr' |
'ne' |
'or' |
'pa' |
'sa' |
'sat' |
'sd' |
'ta' |
'te' |
'ur';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
}

export const LANGUAGES: LanguageOption[] = [
{ code: 'en', label: 'English', nativeLabel: 'English' },
{ code: 'as', label: 'Assamese', nativeLabel: 'অসমীয়া' },
{ code: 'bn', label: 'Bengali', nativeLabel: 'বাংলা' },
{ code: 'brx', label: 'Bodo', nativeLabel: 'बड़ो' },
{ code: 'doi', label: 'Dogri', nativeLabel: 'डोगरी' },
{ code: 'gu', label: 'Gujarati', nativeLabel: 'ગુજરાતી' },
{ code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
{ code: 'kn', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ' },
{ code: 'ks', label: 'Kashmiri', nativeLabel: 'کٲشُر' },
{ code: 'kok', label: 'Konkani', nativeLabel: 'कोंकणी' },
{ code: 'mai', label: 'Maithili', nativeLabel: 'मैथिली' },
{ code: 'ml', label: 'Malayalam', nativeLabel: 'മലയാളം' },
{ code: 'mni', label: 'Manipuri', nativeLabel: 'মৈতৈলোন্' },
{ code: 'mr', label: 'Marathi', nativeLabel: 'मराठी' },
{ code: 'ne', label: 'Nepali', nativeLabel: 'नेपाली' },
{ code: 'or', label: 'Odia', nativeLabel: 'ଓଡ଼ିଆ' },
{ code: 'pa', label: 'Punjabi', nativeLabel: 'ਪੰਜਾਬੀ' },
{ code: 'sa', label: 'Sanskrit', nativeLabel: 'संस्कृतम्' },
{ code: 'sat', label: 'Santali', nativeLabel: 'ᱥᱟᱱᱛᱟᱲᱤ' },
{ code: 'sd', label: 'Sindhi', nativeLabel: 'سنڌي' },
{ code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்' },
{ code: 'te', label: 'Telugu', nativeLabel: 'తెలుగు' },
{ code: 'ur', label: 'Urdu', nativeLabel: 'اردو' }];


type Dictionary = Record<string, string>;

/** English is the only complete dictionary. Keys resolve to English elsewhere. */
const en: Dictionary = {
  'nav.home': 'Home',
  'nav.about': 'About Us',
  'nav.services': 'Services',
  'nav.howItWorks': 'How It Works',
  'nav.forPatients': 'For Patients',
  'nav.forHealthcare': 'For Healthcare',
  'nav.healthTips': 'Health Tips',
  'nav.contact': 'Contact Us',
  'action.login': 'Login',
  'action.findServices': 'Find Services',
  'action.viewAll': 'View All',
  'action.readMore': 'Read More',
  'action.continue': 'Continue'
};

const dictionaries: Partial<Record<LanguageCode, Dictionary>> = { en };

interface LanguageContextValue {
  language: LanguageCode;
  languageOption: LanguageOption;
  setLanguage: (code: LanguageCode) => void;
  languages: LanguageOption[];
  /** Returns the localized string, falling back to English, then to the key. */
  t: (key: string) => string;
  /** True when the active language has no dictionary yet. */
  isFallback: boolean;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: {children: React.ReactNode;}) {
  const [language, setLanguage] = useState<LanguageCode>('en');

  const t = useCallback(
    (key: string) => dictionaries[language]?.[key] ?? en[key] ?? key,
    [language]
  );

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      languageOption:
      LANGUAGES.find((item) => item.code === language) ?? LANGUAGES[0],
      setLanguage,
      languages: LANGUAGES,
      t,
      isFallback: !dictionaries[language]
    }),
    [language, t]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>);

}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}