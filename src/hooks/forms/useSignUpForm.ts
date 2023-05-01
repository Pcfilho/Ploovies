import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLanguage } from "../locale/useLanguage";



export interface IUserSignUp {
  "": {
    message: string;
  };
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const useSignUpForm = () => {
  const { getMessage } = useLanguage();
  const signUpValidationSchema = z
    .object({
      email: z
        .string()
        .nonempty({ message: getMessage('necessaryEmail') })
        .email({ message: getMessage('validEmail') }),
      password: z.string().min(6, { message: getMessage('shortPassword') }),
      name: z.string().nonempty({ message: getMessage('necessaryName') }),
      confirmPassword: z.string().min(6, { message: getMessage('necessaryConfirmPassword') }),
    })
    .refine(
      ({ password, confirmPassword }) => password === confirmPassword,
      { message: getMessage('notMatchPasswords'), }
    );

  return useForm<IUserSignUp>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
    resolver: zodResolver(signUpValidationSchema),
  });
}