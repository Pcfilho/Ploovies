import { useLanguage } from "./useLanguage"
import { Language } from '../../locale/languageInterface';

export const useErrorMessage = (message: keyof Language) => {
  const { getMessage } = useLanguage();

  return {
    errorMessage: getMessage(message),
    getMessage
  }
}