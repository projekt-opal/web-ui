import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Cache from 'i18next-localstorage-cache';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  En: {
    translation: {
      "Home": "Home",
      "Catalogs": "Catalogs",
      "Publisher": "Publisher",
      "SparQL endpoint": "SparQL endpoint",
      "About US": "About US",
      "Search": "Search",
      "Apply": "Apply",
      "Theme": "Theme",
      "Publisher": "Publisher",
      "License": "License",
      "Type of date": "Type of date",
      "From": "From",
      "To": "To",
      "relevance": "relevance",
      "location": "location",
      "title": "title",
      "issueDate": "issueDate",
      "description": "description",
    }
  },
  De: {
    translation: {
      "Home": "Zuhause",
      "Catalogs": "Kataloge",
      "Publisher": "Verleger",
      "SparQL endpoint": "SparQL-Endpunkt",
      "About US": "Über uns",
      "Search": "Suche",
      "Apply": "Anwenden",
      "Theme": "Thema",
      "Publisher": "Verleger",
      "License": "Lizenz",
      "Type of date": "Art des Datums",
      "From": "Von",
      "To": "Bis",
      "relevance": "Relevanz",
      "location": "Ort",
      "title": "Titel",
      "issueDate": "Ausgabedatum",
      "description": "Beschreibung",
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(Cache)
  .init({
    resources,
    lng: "En",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;