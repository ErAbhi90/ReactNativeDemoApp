import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import english from './en.json'
import french from './fr.json'

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    initImmediate: false,
    compatibilityJSON: 'v3',
  lng: 'en',
  resources: {
     en: {
      translation: english, //changed here
    },
    fr: {
      translation: french, //changed here
    },
  },
  interpolation: {
    escapeValue: false // react already safes from xss
  }
});

export default i18n;