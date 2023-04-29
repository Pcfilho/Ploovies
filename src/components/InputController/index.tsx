import React from "react";
import { Controller } from "react-hook-form";
import {
  Icon,
  IconContainer,
  Input,
  InputText,
  Container,
  ErrorMessage,
} from "./styles";
import { useTheme } from "styled-components";

interface Props {
  control: any;
  name: string;
  placeHolder: string;
  iconName: string;
  isPassword?: boolean;
}

export default function InputController({
  control,
  name,
  placeHolder,
  iconName,
  isPassword = false,
}: Props) {
  const theme = useTheme();
  return (
      <Controller
        control={control}
        render={({ field: { value, onChange }, formState: { isSubmitted, errors } }) => {
          console.log(errors);
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
                />
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
