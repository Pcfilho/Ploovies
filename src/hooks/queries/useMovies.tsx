import { useQuery } from "@tanstack/react-query";
import { IMovie } from "../../@types/movie";
import { moviesApi } from "../../service/moviesApi";

const fetchMoviesList = async () => {
  const { data } = await moviesApi.getMoviesList("popular");
  return data.results;
};

export const useMovies = () => {
  const {
    isLoading,
    isError,
    data,
    error,
  } = useQuery<IMovie[]>({
    queryKey: ["moviesList"],
    queryFn: fetchMoviesList,
  });

  return {
    isLoadingMovies: isLoading,
    isErrorMovies: isError,
    movies: data,
    errorMovies: error,
  }
}
