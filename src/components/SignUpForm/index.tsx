import {
  ContentHeader,
  ContentHeaderTitle,
  InputsContainer,
  ButtonsContainer,
  Button,
  ButtonTitle,
  RegisterButton,
  RegisterContainer,
} from "./styles";

import InputController from "../InputController";
import { useSignUp } from "../../hooks/queries/useSignUp";
import { Loading } from "../Loading";
import { IUserSignUp, useSignUpForm } from "../../hooks/forms/useSignUpForm";
import { ErrorMessage } from "../ErrorMessage";

interface Props {
  handleChangeScreens: () => void;
}

export const SignUpForm = ({ handleChangeScreens }: Props) => {
  const mutation = useSignUp();
  const { handleSubmit, control, formState: { errors } } = useSignUpForm();
  console.log('message', errors.root?.message);
  const onSubmit = (user: IUserSignUp) => {
    mutation.mutate(user);
  };

  const getErrorMessage = () => {
    if (errors[""]) {
      return errors[""].message?.toString();
    }
    if (mutation.isError) {
      return "Não foi possível realizar o cadastro.";
    }
  }

  return (
    <RegisterContainer>
      <ContentHeader>
        <ContentHeaderTitle>Cadastro</ContentHeaderTitle>
        {mutation.isLoading ? (
          <Loading size={90} />
        ) : (
          <RegisterButton onPress={handleChangeScreens}>
            Voltar para Login.
          </RegisterButton>
        )}
      </ContentHeader>
      <ErrorMessage message={getErrorMessage()} />

      <InputsContainer>
        <InputController
          control={control}
          iconName="person"
          name="name"
          placeHolder="Nome"
        />

        <InputController
          control={control}
          iconName="email"
          name="email"
          placeHolder="Email"
        />

        <InputController
          control={control}
          iconName="lock"
          name="password"
          placeHolder="Senha"
        />

        <InputController
          control={control}
          iconName="lock"
          name="confirmPassword"
          placeHolder="Confirmar Senha"
        />
      </InputsContainer>

      <ButtonsContainer>
        
        <Button onPress={handleSubmit(onSubmit)} disabled={mutation.isLoading}>
          <ButtonTitle>Cadastre-se</ButtonTitle>
        </Button>
      </ButtonsContainer>
    </RegisterContainer>
  );
};
