import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import fr from "./locales/fr.json";
import en from "./locales/en.json";

i18n
  // détecte la langue : 1) choix mémorisé (localStorage), 2) langue du navigateur
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      en: { translation: en },
    },
    // anglais par défaut (cible prioritaire NZ/AU) ; un visiteur FR est
    // quand même servi en français via la détection navigator ci-dessous.
    fallbackLng: "en",
    supportedLngs: ["fr", "en"],
    interpolation: {
      escapeValue: false, // React échappe déjà le XSS
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "lang",
    },
  });

export default i18n;
