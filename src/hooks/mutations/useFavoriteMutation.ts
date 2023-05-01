import { collection, doc, setDoc } from "firebase/firestore";
import { firestore } from "../../service/firebase/firebase";
import { useMutation } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserSelector } from "../../store/reducers/userReducer";
import { MovieModel } from "../../models/movie";


export const useFavoriteMutation = (onAddSuccess?: () => void) => {
  const id = useUserSelector();

  const addNewFavInDB = async (favoriteData: MovieModel) => {
    await setDoc(doc(firestore, `users/${id}/favorites`, String(favoriteData.id)), favoriteData)
    return {
      favoriteData
    }
  };

  const mutation = useMutation({
    mutationFn: (favoriteData: MovieModel) => addNewFavInDB(favoriteData),
    onSuccess(data) {
      const setNewFavoriteAsync = async () => {
        try {
          let finalData: MovieModel[] = []
          const asyncData = await AsyncStorage.getItem(`@Ploovies/favorites/${id}`);
          if (asyncData) {
            const asyncDataParsed: MovieModel[] = JSON.parse(asyncData);
            finalData = [...asyncDataParsed, data.favoriteData];
          } else {
            finalData = [data.favoriteData];
          }

          const finalDataStringfied = JSON.stringify(finalData);
          await AsyncStorage.setItem(`@Ploovies/favorites/${id}`, finalDataStringfied)
        } catch (err) {
          console.log('signInUser error', err);
        }
      }
      setNewFavoriteAsync();
      if (onAddSuccess) {
        onAddSuccess();
      }
    },
  })

  return mutation;
}