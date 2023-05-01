import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { updateUser } from "../../store/reducers/userReducer";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../../service/firebase/firebase";
import { IUserSignUp } from "../forms/useSignUpForm";
import { setDoc, doc } from 'firebase/firestore';

export const useSignUpMutation = () => {
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: (user : IUserSignUp) => signUpUser(user),
    onSuccess(data) {
      const createUserInFirestore = async () => {
        await setDoc(doc(firestore, 'users', data.user.uid), {
          name: data.name,
          email: data.user.email
        })
      };

      createUserInFirestore()
      dispatch(
        updateUser({
          id: data.user.uid
        })
      );
    },
  })
  
  const signUpUser = async ({ name, email, password }: IUserSignUp) => {
    const signedUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return { ...signedUser, name};
  };

  return mutation;
};
