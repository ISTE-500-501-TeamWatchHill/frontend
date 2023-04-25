import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";


// Importing translation files

import translationEN from "./assets/translations/en.json";
import translationES from "./assets/translations/es.json";


//Creating object with the variables of imported translation files
const resources = {
  en: {
    translation: translationEN,
  },
  es: {
    translation: translationES,
  },
};

const DETECTION_OPTIONS = {
  order: ['localStorage', 'navigator'],
  caches: ['localStorage']
};

//i18N Initialization
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    detection: DETECTION_OPTIONS,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;