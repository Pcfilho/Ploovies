import i18n from 'i18next';
import pt from './languages/pt.json';
import en from './languages/en.json';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  resources: {
    en,
    'pt-BR': pt
  },
  react: {
    useSuspense: false,
  },
  interpolation: {
    escapeValue: false,
  }
})

export default i18n;