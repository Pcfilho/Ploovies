import { useQuery } from "@tanstack/react-query";
import { moviesApi } from "../../service/moviesApi";
import { IMovieData } from "../../@types/movieDetails";
import { IActor } from "../../@types/actor";
import { IReview } from "../../@types/review";

const fetchActorsList = async (id: number) => {
    const { data } = await moviesApi.getCreditsByMovieId(id);
    const filteredActors = data.cast.filter(
      (actor: IActor) => actor["known_for_department"] === "Acting"
    );
    return filteredActors;
};
const fetchReviewsList = async (id : number) => {
    const { data } = await moviesApi.getReviewsByMovieId(id);
    return data.results;
};

const fetchMovieDetailsList = async (id : number) => {
  const { data } = await moviesApi.getMovieById(id);
  const imageSource = moviesApi.getMovieImageOriginal(data.backdrop_path) || "";
  const realeseDate = new Date(data?.release_date || '').toLocaleDateString();
  return {...data, realeseDate, imageSource};
};

export const useMovieDetails = (id: number) => {
  const {
    isLoading: isLoadingMovieDetails,
    isError: isErrorMovieDetails,
    data: movieDetails,
    error: movieDetailsError,
  } = useQuery<IMovieData>({
    queryKey: [`@movieDetails/${id}`],
    queryFn: () => fetchMovieDetailsList(id),
  });

  const {
    isLoading: isLoadingReviews,
    isError: isErrorReviews,
    data: reviews,
    error: reviewsError,
  } = useQuery<IReview[]>({
    queryKey: [`@movieReviews/${id}`],
    queryFn: () => fetchReviewsList(id),
    enabled: !!movieDetails?.id
  });

  const {
    isLoading: isLoadingActors,
    isError: isErrorActors,
    data: actors,
    error: errorActors,
  } = useQuery<IActor[]>({
    queryKey: [`@movieActors/${id}`],
    queryFn: () => fetchActorsList(id),
    enabled: !!movieDetails?.id
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
    errorActors
  }
}
