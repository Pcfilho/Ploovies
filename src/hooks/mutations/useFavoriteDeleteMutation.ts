import { deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../../service/firebase/firebase";
import { useMutation } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserSelector } from "../../store/reducers/userReducer";
import { MovieModel } from "../../models/movie";


export const useFavoriteDeleteMutation = (onRemoveSuccess?: () => void) => {
  const id = useUserSelector();

  const deleteFavoriteInFB = async (favoriteData: MovieModel) => {
    await deleteDoc(doc(firestore, `users/${id}/favorites`, String(favoriteData.id)))
    return {
      favoriteData
    }
  };

  const mutation = useMutation({
    mutationFn: (favoriteData: MovieModel) => deleteFavoriteInFB(favoriteData),
    onSuccess(data) {
      const deleteFavoriteAsync = async () => {
        try {
          let finalData: MovieModel[] = []
          const asyncData = await AsyncStorage.getItem(`@Foovies/favorites/${id}`);          
          if (asyncData) {
            const asyncDataParsed: MovieModel[] = JSON.parse(asyncData);
            finalData = asyncDataParsed.filter(item => item.id !== data.favoriteData.id);
          } else {
            finalData = [data.favoriteData];
          }

          const finalDataStringfied = JSON.stringify(finalData);
          await AsyncStorage.setItem(`@Foovies/favorites/${id}`, finalDataStringfied, () => {
            if(onRemoveSuccess) {
              onRemoveSuccess()
            }
          })
        } catch (err) {
          console.log('signInUser error', err);
        }
      }
      deleteFavoriteAsync();
    },
  })

  return {
    mutation,
  }
}