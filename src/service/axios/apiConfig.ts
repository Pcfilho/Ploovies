import Constants from 'expo-constants';

export const apiConfig = {
  baseUrl: Constants.expoConfig?.extra?.apiUrl,
  apiKey: Constants.expoConfig?.extra?.apiKey,
  originalImage: (imagePath: string) => `https://image.tmdb.org/t/p/original/${imagePath}`,
  w500Image: (imagePath: string) => `https://image.tmdb.org/t/p/w500/${imagePath}`,
}

export const imageOriginalBaseUrl = 'https://image.tmdb.org/t/p/original/'
export const imageW500BaseUrl = 'https://image.tmdb.org/t/p/w500/'
