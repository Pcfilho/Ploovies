import { useTranslation } from 'react-i18next';
import { Language } from '../../locale/languageInterface';
export function useLanguage() {
  const {t, i18n} = useTranslation();

  function getMessage(message: keyof Language) {
    return t(message);
  }

  function changeLanguage(language: 'en' | 'pt-BR') {
    return i18n.changeLanguage(language)
  }

  function getCurrentLanguage() {
    return i18n.language as 'en' | 'pt-BR';
  };

  function isEn() {
    return i18n.language === 'en';
  }

  return {
    getMessage,
    changeLanguage,
    getCurrentLanguage,
    isEn,
  }
}