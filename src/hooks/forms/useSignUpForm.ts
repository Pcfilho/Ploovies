import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const signUpValidationSchema = z
  .object({
    email: z
      .string()
      .nonempty({ message: "Email é necessário" })
      .email({ message: "Insira email válido" }),
    password: z.string().min(6, { message: "Senha é necessária" }),
    name: z.string().nonempty({ message: "Email é necessário" }),
    confirmPassword: z.string().min(6, { message: "Senha é necessária" }),
  })
  .refine(
    ({ password, confirmPassword }) => password === confirmPassword,
    {  message: "As senhas precisam ser iguais!", }
  );

export interface IUserSignUp extends z.infer<typeof signUpValidationSchema> {
  "": {
    message: string;
  }
};

export const useSignUpForm = () => {
  return useForm<IUserSignUp>({
    resolver: zodResolver(signUpValidationSchema),
  });
}