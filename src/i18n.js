import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Cache from 'i18next-localstorage-cache';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  English: {
    translation: {
      "Home": "Home",
      "Catalogs": "Catalogs",
      "Publisher": "Publisher",
      "SparQL endpoint": "SPARQL endpoint",
      "About US": "About OPAL",
      "Search": "Search",
      "Apply": "Apply",
      "Theme": "Category",
      "License": "License",
      "Type of date": "Type of date",
      "From": "From",
      "To": "To",
      "relevance": "Relevance",
      "location": "Location",
      "title": "Title",
      "issueDate": "Issue date",
      "description": "Description",
      "datasets": "datasets",
    }
  },
  Deutsch: {
    translation: {
      "Home": "Startseite",
      "Catalogs": "Kataloge",
      "Publisher": "Herausgeber",
      "SparQL endpoint": "SPARQL-Endpunkt",
      "About US": "Über OPAL",
      "Search": "Suche",
      "Apply": "Anwenden",
      "Theme": "Kategorie",
      "License": "Lizenz",
      "Type of date": "Art des Datums",
      "From": "Von",
      "To": "Bis",
      "relevance": "Relevanz",
      "location": "Ort",
      "title": "Titel",
      "issueDate": "Erscheinungsdatum",
      "description": "Beschreibung",
      "datasets": "Datensätze",
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(Cache)
  .init({
    resources,
    lng: "Deutsch",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;
