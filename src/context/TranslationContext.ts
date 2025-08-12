import { createContext } from 'react';
import type { TranslationKey } from '@/i18n/translations';

export interface TranslationContextType {
  language: 'id' | 'en';
  t: (key: TranslationKey) => string;
  changeLanguage: (language: 'id' | 'en') => void;
}

export const TranslationContext = createContext<TranslationContextType | null>(null);
