import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { moviesApi } from "../../service/axios/moviesApi";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../locale/useLanguage";
import { MovieModel } from "../../models/movie";

const fetchMoviesList = async (page: number, getCurrentLanguage: () => void) => {

  const { data } = await moviesApi.getMoviesList("popular", { page, language: getCurrentLanguage() });
  return data.results;
};

export const useMoviesQuery = () => {
  const [movies, setMovies] = useState<MovieModel[]>([]);
  const { getCurrentLanguage } = useLanguage();
  const page = useRef(1);

  const {
    isLoading,
    isError,
    data,
    error,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery<MovieModel[]>({
    queryKey: ["moviesList"],
    queryFn: ({ pageParam = 1 }) => fetchMoviesList(pageParam, getCurrentLanguage),
    getNextPageParam: () => page,
    staleTime: Infinity
  });

  const nextPageHandler = () => {
    page.current++;
    fetchNextPage({
      pageParam: page.current
    })
  }

  useEffect(() => {
    const flatData = data?.pages.flat(1) || []
    setMovies(flatData)
  }, [data]);

  return {
    isLoadingMovies: isLoading,
    isErrorMovies: isError,
    errorMovies: error,
    movies,
    isFetchingNextPage,
    nextPageHandler
  }
}
