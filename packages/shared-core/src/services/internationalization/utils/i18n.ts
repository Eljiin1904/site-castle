import i18n, { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

const IS_DEV = process.env.NODE_ENV === "development";
//"https://font.brickrax.com/locales/{{lng}}/{{ns}}.json",
const locizeOptions = {
  referenceLng: "en",
  loadPath: IS_DEV
    ? "http://127.0.0.1:3000/locales/{{lng}}/{{ns}}.json"
    : "https://font.brickrax.com/locales/{{lng}}/{{ns}}.json",
  crossDomain: true,
};

const options: InitOptions = {
  debug: true,
  lng: "en",
  fallbackLng: "en",
  ns: ["translation", "pages/home", "validations", "fields", "common", "wallet", "chat"],
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
