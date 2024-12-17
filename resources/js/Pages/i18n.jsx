import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en.json';
import translationAR from './locales/ar.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN,
    },
    ar: {
      translation: translationAR,
    },
  },
  lng: 'en', // default language
  fallbackLng: 'en', // fallback language
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;
