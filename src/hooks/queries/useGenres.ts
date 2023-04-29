import { useQuery } from "@tanstack/react-query";
import { moviesApi } from "../../service/axios/moviesApi";
import { IGenre } from "../../@types/genre";

const fetchGenresList = async () => {
  const { data } = await moviesApi.getGenresList();
  return data.genres;
};

export const useGenres = () => {
  const {
    isLoading,
    isError,
    data,
    error,
  } = useQuery<IGenre[]>({
    queryKey: ["genresList"],
    queryFn: fetchGenresList,
  });

  return {
    isLoadingGenres: isLoading,
    isErrorGenres: isError,
    genres: data,
    errorGenres: error,
  }
}
