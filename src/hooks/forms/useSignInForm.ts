import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const signInValidationSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email é necessário" })
    .email({ message: "Insira email válido" }),
  password: z.string().min(6, { message: "Senha é necessária" }),
});

export type IUserSignIn = z.infer<typeof signInValidationSchema>;

export const useSignInForm = () => {
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