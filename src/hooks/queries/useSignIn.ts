import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../../store/reducers/userReducer";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../service/firebase/firebase";
import { useDispatch } from "react-redux";
import { IUserSignIn } from "../forms/useSignInForm";

export const useSignIn = () => {
  const dispatch = useDispatch();
  const signInUser = async ({ email, password }: IUserSignIn) => {
    const signedUser = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return signedUser;
  };

  const mutation = useMutation({
    mutationFn: (user : IUserSignIn) => signInUser(user),
    onSuccess(data) {
      dispatch(
        updateUser({
          id: data.user.uid,
        })
      );
    },
  })
  
  return mutation;
}