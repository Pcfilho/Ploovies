import axios from 'axios';
import { apiConfig } from './apiConfig';


export const axiosClient = axios.create({
  baseURL: apiConfig.baseUrl,
  params: {
    api_key: apiConfig.apiKey
  },
})