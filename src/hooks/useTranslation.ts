import { useContext } from 'react';
import { TranslationContext } from '@/context/TranslationContext';

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error(
      'useTranslation harus digunakan di dalam TranslationProvider'
    );
  }
  return context;
};
