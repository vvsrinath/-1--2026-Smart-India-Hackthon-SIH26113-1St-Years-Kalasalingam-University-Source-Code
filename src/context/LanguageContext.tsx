import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { translations } from '../i18n';

export type LanguageCode = keyof typeof translations;

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்' },
  { code: 'te', label: 'Telugu', nativeLabel: 'తెలుగు' },
  { code: 'mr', label: 'Marathi', nativeLabel: 'मराठी' },
  { code: 'bn', label: 'Bengali', nativeLabel: 'বাংলা' },
  { code: 'gu', label: 'Gujarati', nativeLabel: 'ગુજરાતી' },
  { code: 'kn', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ' },
  { code: 'ml', label: 'Malayalam', nativeLabel: 'മലയാളം' },
  { code: 'or', label: 'Odia', nativeLabel: 'ଓଡ଼ିଆ' },
  { code: 'pa', label: 'Punjabi', nativeLabel: 'ਪੰਜਾਬੀ' },
  { code: 'ur', label: 'Urdu', nativeLabel: 'اردو' }
];

function getNestedValue(data: Record<string, any>, key: string) {
  return key.split('.').reduce<any>((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), data);
}

interface LanguageContextValue {
  language: LanguageCode;
  languageOption: LanguageOption;
  setLanguage: (code: LanguageCode) => void;
  languages: LanguageOption[];
  t: (key: string) => string;
  isFallback: boolean;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const stored = window.localStorage.getItem('swasthya-language') as LanguageCode | null;
    return stored && stored in translations ? stored : 'en';
  });

  const setLanguage = useCallback((code: LanguageCode) => {
    setLanguageState(code);
    window.localStorage.setItem('swasthya-language', code);
  }, []);

  const t = useCallback(
    (key: string) => {
      const active = translations[language] as Record<string, any>;
      const value = getNestedValue(active, key);
      const fallback = getNestedValue(translations.en as Record<string, any>, key);
      return typeof value === 'string' ? value : typeof fallback === 'string' ? fallback : key;
    },
    [language]
  );

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      languageOption: LANGUAGES.find((item) => item.code === language) ?? LANGUAGES[0],
      setLanguage,
      languages: LANGUAGES,
      t,
      isFallback: language !== 'en'
    }),
    [language, setLanguage, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
