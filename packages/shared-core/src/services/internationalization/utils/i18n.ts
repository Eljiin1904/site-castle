import i18n, { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from 'i18next-http-backend';

//"https://static.brickrax.com/locales/{{lng}}/{{ns}}.json",
const locizeOptions = {
  referenceLng: "en",
  loadPath: "http://127.0.0.1:3000/locales/{{lng}}/{{ns}}.json",
  crossDomain: true,
};

const options: InitOptions = {
  debug: true,
  fallbackLng: "en",
  ns: ["translation", "validations", "common","games\\double"],
  fallbackNS: ["translation"],
  defaultNS: ["translation"],
  interpolation: {
    escapeValue: false,
  },
  backend: locizeOptions,
  react: {
    useSuspense: false,
  },
};

i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init(options);

export default i18n;