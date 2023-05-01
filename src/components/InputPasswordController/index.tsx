import React, { useState } from "react";
import { Controller } from "react-hook-form";
import {
  Icon,
  IconContainer,
  Input,
  InputText,
  Container,
  ErrorMessage,
  PasswordIcon,
  PasswordIconButton,
} from "./styles";
import { useTheme } from "styled-components";

interface Props {
  control: any;
  name: string;
  placeHolder: string;
  iconName: string;
  isPassword?: boolean;
}

export default function InputPasswordController({
  control,
  name,
  placeHolder,
  iconName,
}: Props) {
  const theme = useTheme();
  const [hidePassword, setHidePassword] = useState(true);

  const handleShowPassword = () => {
    setHidePassword(!hidePassword);
  };

  const renderShowPassword = () =>
    hidePassword ? (
      <PasswordIcon name="eye-off" size={24} color={theme.colors.main} />
    ) : (
      <PasswordIcon name="eye" size={24} color={theme.colors.main} />
    );

  return (
    <Controller
      control={control}
      render={({
        field: { value, onChange },
        formState: { isSubmitted, errors },
      }) => {
        const errorMessage = errors[name]?.message?.toString() || "";
        return (
          <Container>
            <Input>
              <IconContainer>
                <Icon name={iconName} size={24} color={theme.colors.main} />
              </IconContainer>
              <InputText
                placeholder={placeHolder}
                value={value}
                onChangeText={onChange}
                cursorColor={theme.colors.main}
                secureTextEntry={hidePassword}
                placeholderTextColor={theme.colors.text_details}
              />
              <PasswordIconButton onPress={handleShowPassword}>
                {renderShowPassword()}
              </PasswordIconButton>
            </Input>
            {errorMessage && isSubmitted ? (
              <ErrorMessage>{errorMessage}</ErrorMessage>
            ) : null}
          </Container>
        );
      }}
      name={name}
    />
  );
}
