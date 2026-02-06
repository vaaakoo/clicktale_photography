import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = i18n.language === 'gr' ? 'el' : 'en';
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', i18n.language);
    }
  }, [i18n.language]);

  const setLanguage = (language: 'en' | 'gr') => {
    void i18n.changeLanguage(language);
  };

  return (
    <div className="flex items-center rounded-2xl border border-white/10 bg-white/70 dark:bg-slate-900/70 px-2 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#111418] dark:text-white shadow-lg shadow-blue-500/10 backdrop-blur-md">
      <button
        type="button"
        onClick={() => setLanguage('en')}
        aria-label={t('nav.languageEnglish')}
        aria-pressed={i18n.language === 'en'}
        className={`px-3 py-2 rounded-xl transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
          i18n.language === 'en' ? 'bg-primary text-white shadow-sm' : 'text-[#617289] dark:text-gray-300 hover:text-primary'
        }`}
      >
        {t('nav.shortEnglish')}
      </button>
      <span className="text-gray-300 dark:text-gray-600">|</span>
      <button
        type="button"
        onClick={() => setLanguage('gr')}
        aria-label={t('nav.languageGreek')}
        aria-pressed={i18n.language === 'gr'}
        className={`px-3 py-2 rounded-xl transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
          i18n.language === 'gr' ? 'bg-primary text-white shadow-sm' : 'text-[#617289] dark:text-gray-300 hover:text-primary'
        }`}
      >
        {t('nav.shortGreek')}
      </button>
    </div>
  );
};
