import React from "react";

import {
  Button,
  ButtonTitle,
  ButtonsContainer,
  ContentHeader,
  ContentHeaderTitle,
  InputsContainer,
  LoginContainer,
  RegisterButton,
  RegisterTextWrapper,
  RegisterTitle,
} from "./styles";
import { Loading } from "../Loading";
import InputController from "../InputController";
import { useSignIn } from "../../hooks/queries/useSignIn";
import { IUserSignIn, useSignInForm } from "../../hooks/forms/useSignInForm";
import { ErrorMessage } from "../ErrorMessage";
import InputPasswordController from "../InputPasswordController";

interface Props {
  handleChangeScreens: () => void;
}

export const SignInForm = ({ handleChangeScreens }: Props) => {
  const { handleSubmit, control } = useSignInForm();

  const mutation = useSignIn();

  const onSubmit = (user: IUserSignIn) => {
    mutation.mutate(user);
  };

  return (
    <LoginContainer>
      <ContentHeader>
        <ContentHeaderTitle>Login</ContentHeaderTitle>
        {mutation.isLoading ? <Loading size={90} /> : null}
      </ContentHeader>
      <InputsContainer>
        <InputController
          control={control}
          iconName="email"
          name="email"
          placeHolder="Email"
        />
        <InputPasswordController
          control={control}
          iconName="lock"
          name="password"
          placeHolder="Senha"
        />

        { mutation.isError ? <ErrorMessage message={"Não foi possível realizar o login."} /> : null}
      </InputsContainer>

      <ButtonsContainer>
        <Button onPress={handleSubmit(onSubmit)} disabled={mutation.isLoading}>
          <ButtonTitle> Entrar </ButtonTitle>
        </Button>
        <RegisterTextWrapper>
          <RegisterTitle>Ainda não possui conta?</RegisterTitle>
          <RegisterButton onPress={handleChangeScreens}>
            Registre-se
          </RegisterButton>
        </RegisterTextWrapper>
      </ButtonsContainer>
    </LoginContainer>
  );
};
