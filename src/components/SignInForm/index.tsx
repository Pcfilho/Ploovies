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
import { useSignInMutation } from "../../hooks/mutations/useSignInMutation";
import { IUserSignIn, useSignInForm } from "../../hooks/forms/useSignInForm";
import { ErrorMessage } from "../ErrorMessage";
import InputPasswordController from "../InputPasswordController";
import { useErrorMessage } from "../../hooks/locale/useErrorMessage";
import { Language } from "../../locale/languageInterface";

interface Props {
  handleChangeScreens: () => void;
}

export const SignInForm = ({ handleChangeScreens }: Props) => {
  const { handleSubmit, control } = useSignInForm();
  const mutation = useSignInMutation();
  const mutationError = mutation?.error as ErrorFirebaseModel;
  const { errorMessage, getMessage } = useErrorMessage(
    mutationError?.code as keyof Language
  );
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
          placeHolder={getMessage("password")}
        />

        {mutation.isError ? <ErrorMessage message={errorMessage} /> : null}
      </InputsContainer>
      <ButtonsContainer>
        <Button onPress={handleSubmit(onSubmit)} disabled={mutation.isLoading}>
          <ButtonTitle>{getMessage("enter")}</ButtonTitle>
        </Button>
        <RegisterTextWrapper>
          <RegisterTitle>{getMessage("noAccount")}</RegisterTitle>
          <RegisterButton onPress={handleChangeScreens}>
            {getMessage("getRegistered")}
          </RegisterButton>
        </RegisterTextWrapper>
      </ButtonsContainer>
    </LoginContainer>
  );
};
