import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import es from './locales/es.json';

i18n
    .use(LanguageDetector) // Automatically detects user browser language
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            es: { translation: es }
        },
        fallbackLng: 'en', // Use English if a Spanish translation is missing
        interpolation: { escapeValue: false } // React already protects against XSS
    });

export default i18n;