import { useLanguage } from "./useLanguage";

export function useGenreType() {
  const { getMessage } = useLanguage();

  const genreTypes = [
    {
      id: 28,
      name: getMessage("action"),
    },
    {
      id: 12,
      name: getMessage("adventure"),
    },
    {
      id: 16,
      name: getMessage("animation"),
    },
    {
      id: 35,
      name: getMessage("comedy"),
    },
    {
      id: 80,
      name: getMessage("crime"),
    },
    {
      id: 99,
      name: getMessage("documentary"),
    },
    {
      id: 18,
      name: getMessage("drama"),
    },
    {
      id: 10751,
      name: getMessage("family"),
    },
    {
      id: 14,
      name: getMessage("fantasy"),
    },
    {
      id: 36,
      name: getMessage("history"),
    },
    {
      id: 27,
      name: getMessage("horror"),
    },
    {
      id: 10402,
      name: getMessage("music"),
    },
    {
      id: 9648,
      name: getMessage("mistery"),
    },
    {
      id: 10749,
      name: getMessage("romance"),
    },
    {
      id: 878,
      name: getMessage("scienceFiction"),
    },
    {
      id: 10770,
      name: getMessage("tvMovie"),
    },
    {
      id: 53,
      name: getMessage("thriller"),
    },
    {
      id: 10752,
      name: getMessage("war"),
    },
    {
      id: 37,
      name: getMessage("western"),
    },
  ];
  
  return {
    genreTypes,
    getMessage
  };
}