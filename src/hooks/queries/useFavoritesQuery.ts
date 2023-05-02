import { useQuery } from "@tanstack/react-query";
import { useUserSelector } from "../../store/reducers/userReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNetInfo } from "@react-native-community/netinfo";
import { firestore } from "../../service/firebase/firebase";
import { doc } from 'firebase/firestore';
import { useState } from "react";
import { useRefreshOnFocus } from "./useRefreshOnFocus";
import { MovieModel } from "../../models/movie";

const fetchFavoritesUser = (userId: string) => {
  return doc(firestore, `/favorites/${userId}`) as any;
}

export const useFavoritesQuery = () => {
  const [favorites, setFavorites] = useState<MovieModel[]>([]);

  const id = useUserSelector();
  const { isConnected } = useNetInfo();
  const {
    isFetching,
    refetch
  } = useQuery<MovieModel[]>({
    queryKey: [`@Ploovies/favorites/${id}`],
    queryFn: () => fetchFavoritesUser(id),
    enabled: !!isConnected && !!id,
    onSuccess(data) {
      const compareWithAsync = async () => {
        try {
          const favorites = await AsyncStorage.getItem(`@Ploovies/favorites/${id}`);

          if (favorites) {
            const dataStringfied = JSON.stringify(data);
            if (dataStringfied === favorites) {
              const favoritesParse: MovieModel[] = JSON.parse(favorites);
              return favoritesParse;
            }

            const favoritesParse: MovieModel[] = JSON.parse(favorites);
            return favoritesParse;
          }
        } catch (error) {
          console.log(error);
        }

        return [];
      };

      const getFavorites = async () => {
        const favoritesFromDB = await compareWithAsync();
        setFavorites(favoritesFromDB);
      }

      getFavorites();
    },
  })
  useRefreshOnFocus(refetch);
  if (!isConnected) {
    const getAsyncFavorites = async () => {
      try {
        const favorites = await AsyncStorage.getItem(`@Ploovies/favorites/${id}`);
        if (favorites) {
          const favoritesParse: MovieModel[] = JSON.parse(favorites);
          return favoritesParse;
        }
      } catch (error) {
        console.log(error);
      }

      return [];
    }

    const getFavorites = async () => {
      const favoritesFromAsync = await getAsyncFavorites();
      setFavorites(favoritesFromAsync);
    }

    getFavorites();
  }

  return {
    favorites,
    isLoading: isFetching,
    refetch
  }
}