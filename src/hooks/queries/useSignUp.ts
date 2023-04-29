import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { updateUser } from "../../store/reducers/userReducer";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../service/firebase/firebase";
import { IUserSignUp } from "../forms/useSignUpForm";

export const useSignUp = () => {
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: (user : IUserSignUp) => signInUser(user),
    onSuccess(data) {
      dispatch(
        updateUser({
          id: data.user.uid,
        })
      );
    },
  })
  
  const signInUser = async ({ email, password }: IUserSignUp) => {
    const signedUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return signedUser;
  };

  return mutation;
};
