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
import { useSignUpMutation } from "../../hooks/mutations/useSignUpMutation";
import { Loading } from "../Loading";
import { IUserSignUp, useSignUpForm } from "../../hooks/forms/useSignUpForm";
import { ErrorMessage } from "../ErrorMessage";
import InputPasswordController from "../InputPasswordController";
import { useErrorMessage } from "../../hooks/locale/useErrorMessage";
import { Language } from "../../locale/languageInterface";
interface Props {
  handleChangeScreens: () => void;
}

export const SignUpForm = ({ handleChangeScreens }: Props) => {
  const mutation = useSignUpMutation();
  const mutationError = mutation?.error as ErrorFirebaseModel;
  const { errorMessage, getMessage } = useErrorMessage(
    mutationError?.code as keyof Language
  );
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useSignUpForm();
  const onSubmit = (user: IUserSignUp) => {
    mutation.mutate(user);
  };

  const getErrorMessage = () => {
    if (errors[""]) {
      return errors[""].message?.toString();
    }
    if (mutation.isError) {
      return errorMessage;
    }
  };
  return (
    <RegisterContainer showsVerticalScrollIndicator={false}>
      <ContentHeader>
        <ContentHeaderTitle>{getMessage("register")}</ContentHeaderTitle>
        {mutation.isLoading ? (
          <Loading size={90} />
        ) : (
          <RegisterButton onPress={handleChangeScreens}>
            {getMessage("goBackToLogin")}
          </RegisterButton>
        )}
      </ContentHeader>
      <ErrorMessage message={getErrorMessage()} />

      <InputsContainer>
        <InputController
          control={control}
          iconName="person"
          name="name"
          placeHolder={getMessage("name")}
        />

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

        <InputPasswordController
          control={control}
          iconName="lock"
          name="confirmPassword"
          placeHolder={getMessage("confirmPassword")}
        />
      </InputsContainer>

      <ButtonsContainer>
        <Button onPress={handleSubmit(onSubmit)} disabled={mutation.isLoading}>
          <ButtonTitle>{getMessage("getRegistered")}</ButtonTitle>
        </Button>
      </ButtonsContainer>
    </RegisterContainer>
  );
};
