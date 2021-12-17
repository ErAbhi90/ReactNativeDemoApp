import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import english from './en.json'
import french from './fr.json'

i18next
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    initImmediate: false,
    compatibilityJSON: 'v3',
  lng: 'en',
  resources: {
     en: {
      translation: english, //changed here
    },
    al: {
      translation: french, //changed here
    },
  },
  react: {
    useSuspense: false
  },
  interpolation: {
    escapeValue: false // react already safes from xss
  }
});

export default i18next;