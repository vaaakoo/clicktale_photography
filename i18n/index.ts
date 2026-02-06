import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import gr from './locales/gr.json';

const getInitialLanguage = (): 'en' | 'gr' => {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const stored = localStorage.getItem('language');
  if (stored === 'en' || stored === 'gr') {
    return stored;
  }

  return navigator.language.toLowerCase().startsWith('el') ? 'gr' : 'en';
};

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    gr: { translation: gr }
  },
  lng: getInitialLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
