import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Cache from 'i18next-localstorage-cache';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  English: {
    translation: {
      // Search bar
      "Search": "Search",
      "Search in": "Search in",
      "Anywhere": "Anywhere",
      "selected": "selected",

      // Dataset long+short view
      "show more": "show more",
      "show less": "show less",
//      "History": "History",
//      "ChangesFound": "Found changes in dataset",
//      "ChangesNotFound": "No changes in dataset",

      // Headers
      "Top data publishers": "Top data publishers",

      // Misc
      "Home": "Home",
      "Catalogs": "Catalogs",
      "Publisher": "Publisher",
      "SparQL endpoint": "SPARQL endpoint",
      "About US": "About OPAL",
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
      "feedback": "Feedback",
      "Number of datasets": "Number of datasets"
    }
  },
  Deutsch: {
    translation: {
      // Search bar
      "Search": "Suche",
      "Search in": "Suchbereich",
      "Anywhere": "Überall",
      "selected": "ausgewählt",

      // Dataset long+short view
      "show more": "mehr anzeigen",
      "show less": "weniger anzeigen",
//      "History": "Historie",
//      "ChangesFound": "Änderungen im Datensatz gefunden",
//      "ChangesNotFound": "Keine Änderungen im Datensatz gefunden",

      // Headers
      "Top data publishers": "Top Daten Herausgeber",

      // Misc
      "Home": "Startseite",
      "Catalogs": "Kataloge",
      "Publisher": "Herausgeber",
      "SparQL endpoint": "SPARQL-Endpunkt",
      "About US": "Über OPAL",
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
      "feedback": "Feedback",
      "Number of datasets": "Anzahl Datensätze"
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
