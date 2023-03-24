import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import translationEN from '../locales/en/translation.json';
import translationUK from '../locales/uk/translation.json';
import translationPL from '../locales/pl/translation.json';

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: { translation: translationEN },
      uk: { translation: translationUK },
      pl: { translation: translationPL },
    },
  });

export default i18next;
