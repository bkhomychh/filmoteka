import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from '../locales/en/translation.json';
import translationUK from '../locales/uk/translation.json';
import translationPL from '../locales/pl/translation.json';

import { LANGUAGE } from 'utils/constants';

i18next.use(initReactI18next).init({
  fallbackLng: LANGUAGE.EN.short,
  debug: true,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    [LANGUAGE.EN.short]: { translation: translationEN },
    [LANGUAGE.UK.short]: { translation: translationUK },
    [LANGUAGE.PL.short]: { translation: translationPL },
  },
});

export default i18next;
