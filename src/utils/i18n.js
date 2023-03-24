import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18next
  .use(Backend)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    debug: true,
    backend: {
      // loadPath: 'filmoteka/locales/{{lng}}/{{ns}}.json',
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });
