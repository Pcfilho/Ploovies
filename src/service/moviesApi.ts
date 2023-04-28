import { AxiosRequestConfig } from "axios";
import { axiosClient } from "./axiosClient";
import { imageBaseUrl } from "./apiConfig";

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
  getMovieImage: (imagePath: string) => `${imageBaseUrl}${imagePath}`,
  getMovieById: (id: string, params: any = {}) => {
    const url = `movie/${id}`;
    return axiosClient.get(url, { params })
  },
  getGenresList: (params: any = {}) => {
    const url = `/genre/movie/list`
    return axiosClient.get(url, { params })
  }
}