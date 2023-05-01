import { collection, doc, setDoc } from "firebase/firestore";
import { firestore } from "../../service/firebase/firebase";
import { useMutation } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserSelector } from "../../store/reducers/userReducer";
import { IMovie } from "../../@types/movie";


export const useFavoriteMutation = (onAddSuccess?: () => void) => {
  const id = useUserSelector();

  const addNewFavInDB = async (favoriteData: IMovie) => {
    await setDoc(doc(firestore, `users/${id}/favorites`, String(favoriteData.id)), favoriteData)
    return {
      favoriteData
    }
  };

  const mutation = useMutation({
    mutationFn: (favoriteData: IMovie) => addNewFavInDB(favoriteData),
    onSuccess(data) {
      const setNewFavoriteAsync = async () => {
        try {
          let finalData: IMovie[] = []
          const asyncData = await AsyncStorage.getItem(`@Foovies/favorites/${id}`);
          if (asyncData) {
            const asyncDataParsed: IMovie[] = JSON.parse(asyncData);
            finalData = [...asyncDataParsed, data.favoriteData];
          } else {
            finalData = [data.favoriteData];
          }

          const finalDataStringfied = JSON.stringify(finalData);
          await AsyncStorage.setItem(`@Foovies/favorites/${id}`, finalDataStringfied)
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