import { useQuery } from "@tanstack/react-query";
import { moviesApi } from "../../service/axios/moviesApi";
import { ActorModel } from "../../models/actor";
import { useLanguage } from "../locale/useLanguage";
import { MovieDataModel } from "../../models/movieDetails";
import { ReviewModel } from "../../models/review";

const fetchActorsList = async (id: number) => {
  const { data } = await moviesApi.getCreditsByMovieId(id);
  const filteredActors = data.cast.filter(
    (actor: ActorModel) => actor["known_for_department"] === "Acting"
  );
  return filteredActors;
};

const fetchReviewsList = async (id: number, getCurrentLanguage: () => void) => {
  const { data } = await moviesApi.getReviewsByMovieId(id, {
    language: getCurrentLanguage()
  });
  return data.results;
};

const fetchMovieDetailsList = async (id: number, getCurrentLanguage: () => void) => {
  const { data } = await moviesApi.getMovieById(id, {
    language: getCurrentLanguage()
  });
  const imageSource = moviesApi.getMovieImageOriginal(data.backdrop_path) || "";
  const realeseDate = new Date(data?.release_date || "").toLocaleDateString();
  return { ...data, realeseDate, imageSource };
};

export const useDetailsQuery = (id: number) => {
  const { getCurrentLanguage } = useLanguage();
  const {
    isLoading: isLoadingMovieDetails,
    isError: isErrorMovieDetails,
    data: movieDetails,
    error: movieDetailsError,
  } = useQuery<MovieDataModel>({
    queryKey: [`@movieDetails/${id}`],
    queryFn: () => fetchMovieDetailsList(id, getCurrentLanguage),
    enabled: !!id,
  });

  const {
    isLoading: isLoadingReviews,
    isError: isErrorReviews,
    data: reviews,
    error: reviewsError,
  } = useQuery<ReviewModel[]>({
    queryKey: [`@movieReviews/${id}`],
    queryFn: () => fetchReviewsList(id, getCurrentLanguage),
    enabled: !!id,
  });

  const {
    isLoading: isLoadingActors,
    isError: isErrorActors,
    data: actors,
    error: errorActors,
  } = useQuery<ActorModel[]>({
    queryKey: [`@movieActors/${id}`],
    queryFn: () => fetchActorsList(id),
    enabled: !!id,
  });

  return {
    isLoadingMovieDetails,
    isErrorMovieDetails,
    movieDetails,
    movieDetailsError,

    isLoadingReviews,
    isErrorReviews,
    reviews,
    reviewsError,

    isLoadingActors,
    isErrorActors,
    actors,
    errorActors,
  };
};
