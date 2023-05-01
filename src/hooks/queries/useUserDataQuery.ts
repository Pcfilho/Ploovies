import { useQuery } from "@tanstack/react-query"
import { doc, getDoc } from "firebase/firestore"
import { firestore } from "../../service/firebase/firebase"
import { useUserSelector } from "../../store/reducers/userReducer";
import { useRefreshOnFocus } from "./useRefreshOnFocus";

interface UserInterface {
  name: string;
  email: string;
}

const fetchUserData = (userId: string) => {
  const docRef = doc(firestore, `users`, userId)
  return getDoc(docRef) as any
}

export const useUserDataQuery = () => {
  const id = useUserSelector();
  const {
    data,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['@Ploovies/userData'],
    queryFn: () => fetchUserData(id),
  })

  useRefreshOnFocus(refetch)

  return {
    data: data?.data() as UserInterface || undefined,
    isLoading
  }
}