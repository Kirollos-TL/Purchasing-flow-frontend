import React, { useState, useEffect } from 'react';
import { en, ar } from '../translations';
import { LanguageContext } from './LanguageContext';
import type { Language } from './LanguageContext';

const getInitialLanguage = (): Language => {
  const savedLang = localStorage.getItem('app-language') as Language;
  if (savedLang && (savedLang === 'en' || savedLang === 'ar')) {
    return savedLang;
  }
  return navigator.language.toLowerCase().includes('ar') ? 'ar' : 'en';
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    localStorage.setItem('app-language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const t = language === 'ar' ? ar : en;
  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};
