import { axiosClient } from "./axiosClient";
import { imageOriginalBaseUrl, imageW500BaseUrl } from "./apiConfig";

export const MovieTypes = {
  upcoming: 'upcoming',
  popular: 'popular',
  top_rated: 'top_rated',
}

type movieType = keyof typeof MovieTypes

export const moviesApi = {
  getMoviesList: (type: movieType, params: any = {}) => {
    const url = `movie/${MovieTypes[type]}`;
    return axiosClient.get(url, { params })
  },
  getMovieImageOriginal: (imagePath: string) => `${imageOriginalBaseUrl}${imagePath}`,
  getMovieImageW500: (imagePath: string) => `${imageW500BaseUrl}${imagePath}`,
  getMovieById: (id: number, params: any = {}) => {
    const url = `movie/${id}`;
    return axiosClient.get(url, { params })
  },
  getCreditsByMovieId: (id: number, params: any = {}) => {
    const url = `movie/${id}/credits`;
    return axiosClient.get(url, { params });
  },
  getReviewsByMovieId: (id: number, params: any = {}) => {
    const url = `/movie/${id}/reviews`
    return axiosClient.get(url, { params });
  }
}