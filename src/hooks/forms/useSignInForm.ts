import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLanguage } from "../locale/useLanguage";

export type IUserSignIn = {
  email: string;
  password: string;
};

export const useSignInForm = () => {
  const { getMessage } = useLanguage();

  const signInValidationSchema = z.object({
    email: z
      .string()
      .nonempty({ message: getMessage('necessaryEmail') })
      .email({ message: getMessage('validEmail') }),
    password: z.string().min(6, { message: getMessage('validPassword') }),
  });



  const { handleSubmit, control } = useForm<IUserSignIn>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInValidationSchema),
  });

  return {
    handleSubmit,
    control
  }
}