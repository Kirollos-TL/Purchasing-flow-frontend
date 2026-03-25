import { createContext } from 'react';
import { en } from '../translations';

export type Language = 'en' | 'ar';

export interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: typeof en;
  dir: 'ltr' | 'rtl';
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
