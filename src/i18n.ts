import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { registerLocale } from 'react-datepicker';
import {
  enUS, es, pt, ja, fr, hi,
} from 'date-fns/locale';

// Locales
import * as locales from './locales';

registerLocale('en', enUS);
registerLocale('es', es);
registerLocale('pt', pt);
registerLocale('ja', ja);
registerLocale('fr', fr);
registerLocale('hi', hi);

// Translations
i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: locales,
    ns: 'main',
    missingKeyHandler: false,

    fallbackLng: 'en',
    fallbackNS: 'main',

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
