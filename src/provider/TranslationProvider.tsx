import { useState, useCallback, type ReactNode } from 'react';
import {
  TranslationContext,
  type TranslationContextType,
} from '@/context/TranslationContext';
import { translations, type TranslationKey } from '@/i18n/translations';
import { LocalStorage } from '@/utils/localStorage';

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<'id' | 'en'>(
    LocalStorage.getLanguage() || 'id'
  );

  const changeLanguage = (lang: 'id' | 'en') => {
    LocalStorage.setLanguage(lang);
    setLanguage(lang);
  };

  const t = useCallback(
    (key: TranslationKey): string => {
      return translations[language][key] || key;
    },
    [language]
  );

  const value: TranslationContextType = { language, t, changeLanguage };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};