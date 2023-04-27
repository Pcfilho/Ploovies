import { AxiosRequestConfig } from "axios";
import { axiosClient } from "./axiosClient";

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

  getMovieById: (id: string, params: any = {}) => {
    const url = `movie/${id}`;
    return axiosClient.get(url, { params })
  }
}