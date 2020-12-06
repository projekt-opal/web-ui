import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Cache from 'i18next-localstorage-cache';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  English: {
    translation: {
      // Categories
//      "http://publications.europa.eu/resource/authority/data-theme/ECON": "Economy and finance",
//      "http://publications.europa.eu/resource/authority/data-theme/GOVE": "Government and public sector",
//      "http://publications.europa.eu/resource/authority/data-theme/AGRI": "Agriculture, fisheries, forestry and food",
//      "http://publications.europa.eu/resource/authority/data-theme/ENER": "Energy",
//      "http://publications.europa.eu/resource/authority/data-theme/ENVI": "Environment",
//      "http://publications.europa.eu/resource/authority/data-theme/EDUC": "Education, culture and sport",
//      "http://publications.europa.eu/resource/authority/data-theme/JUST": "Justice, legal system and public safety",
//      "http://publications.europa.eu/resource/authority/data-theme/REGI": "Regions and cities",
//      "http://publications.europa.eu/resource/authority/data-theme/HEAL": "Health",
//      "http://publications.europa.eu/resource/authority/data-theme/INTR": "International issues",
//      "http://publications.europa.eu/resource/authority/data-theme/SOCI": "Population and society",
//      "http://publications.europa.eu/resource/authority/data-theme/OP_DATPRO": "Provisional data",
//      "http://publications.europa.eu/resource/authority/data-theme/TECH": "Science and technology",
//      "http://publications.europa.eu/resource/authority/data-theme/TRAN": "Transport",
      "ECON": "Economy and finance",
      "GOVE": "Government and public sector",
      "AGRI": "Agriculture, fisheries, forestry and food",
      "ENER": "Energy",
      "ENVI": "Environment",
      "EDUC": "Education, culture and sport",
      "JUST": "Justice, legal system and public safety",
      "REGI": "Regions and cities",
      "HEAL": "Health",
      "INTR": "International issues",
      "SOCI": "Population and society",
      "OP_DATPRO": "Provisional data",
      "TECH": "Science and technology",
      "TRAN": "Transport",

      // Search bar
      "Search": "Search",
      "Search in": "Search in",
      "Anywhere": "Anywhere",
      "selected": "selected",

      // Stats
      "Most used data formats": "Most used data formats",
      "Most used categories": "Most used categories",
      "Used data formats": "Used data formats",
      "Used categories": "Used categories",

      // Dataset long+short view
      "show more": "show more",
      "show less": "show less",
//      "History": "History",
//      "ChangesFound": "Found changes in dataset",
//      "ChangesNotFound": "No changes in dataset",

      // Headers
      "Top data publishers": "Top data publishers",
      "Overview data portals": "Overview data portals",

      // Misc
      "Home": "Home",
      "Catalogs": "Data portals",
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
      "Number of datasets": "Number of datasets",
    }
  },
  Deutsch: {
    translation: {
      // Categories
//      "http://publications.europa.eu/resource/authority/data-theme/ECON": "Wirtschaft und Finanzen",
//      "http://publications.europa.eu/resource/authority/data-theme/GOVE": "Regierung und öffentlicher Sektor",
//      "http://publications.europa.eu/resource/authority/data-theme/AGRI": "Landwirtschaft, Fischerei, Forstwirtschaft und Nahrungsmittel",
//      "http://publications.europa.eu/resource/authority/data-theme/ENER": "Energie",
//      "http://publications.europa.eu/resource/authority/data-theme/ENVI": "Umwelt",
//      "http://publications.europa.eu/resource/authority/data-theme/EDUC": "Bildung, Kultur und Sport",
//      "http://publications.europa.eu/resource/authority/data-theme/JUST": "Justiz, Rechtssystem und öffentliche Sicherheit",
//      "http://publications.europa.eu/resource/authority/data-theme/REGI": "Regionen und Städte",
//      "http://publications.europa.eu/resource/authority/data-theme/HEAL": "Gesundheit",
//      "http://publications.europa.eu/resource/authority/data-theme/INTR": "Internationale Themen",
//      "http://publications.europa.eu/resource/authority/data-theme/SOCI": "Bevölkerung und Gesellschaft",
//      "http://publications.europa.eu/resource/authority/data-theme/OP_DATPRO": "Vorläufige Daten",
//      "http://publications.europa.eu/resource/authority/data-theme/TECH": "Wissenschaft und Technologie",
//      "http://publications.europa.eu/resource/authority/data-theme/TRAN": "Verkehr",
      "ECON": "Wirtschaft und Finanzen",
      "GOVE": "Regierung und öffentlicher Sektor",
      "AGRI": "Landwirtschaft, Fischerei, Forstwirtschaft und Nahrungsmittel",
      "ENER": "Energie",
      "ENVI": "Umwelt",
      "EDUC": "Bildung, Kultur und Sport",
      "JUST": "Justiz, Rechtssystem und öffentliche Sicherheit",
      "REGI": "Regionen und Städte",
      "HEAL": "Gesundheit",
      "INTR": "Internationale Themen",
      "SOCI": "Bevölkerung und Gesellschaft",
      "OP_DATPRO": "Vorläufige Daten",
      "TECH": "Wissenschaft und Technologie",
      "TRAN": "Verkehr",

      // Search bar
      "Search": "Suche",
      "Search in": "Suchbereich",
      "Anywhere": "Überall",
      "selected": "ausgewählt",

      // Stats
      "Most used data formats": "Meistgenutzte Datenformate",
      "Most used categories": "Meistgenutzte Kategorien",
      "Used data formats": "Genutzte Datenformate",
      "Used categories": "Genutzte Kategorien",

      // Dataset long+short view
      "show more": "mehr anzeigen",
      "show less": "weniger anzeigen",
//      "History": "Historie",
//      "ChangesFound": "Änderungen im Datensatz gefunden",
//      "ChangesNotFound": "Keine Änderungen im Datensatz gefunden",

      // Headers
      "Top data publishers": "Top Daten Herausgeber",
      "Overview data portals": "Übersicht Datenportale",

      // Misc
      "Home": "Startseite",
      "Catalogs": "Datenportale",
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
