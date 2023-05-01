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
}

export default function InputController({
  control,
  name,
  placeHolder,
  iconName,
}: Props) {
  const theme = useTheme();

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
                placeholderTextColor={theme.colors.text_details}
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
