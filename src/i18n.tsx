import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import PL from "./locale/pl.json";

const resources = {
  pl: {
    translation: PL,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "pl",
  interpolation: {
    escapeValue: false,
  },
  // debug: true,
});

export default i18n;
