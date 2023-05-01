import React from "react";
import { RegisterErrorMessage } from "./styles";

interface Props {
  message: string | undefined;
}

export const ErrorMessage = ({ message }: Props) =>
  message ? <RegisterErrorMessage>{message}</RegisterErrorMessage> : null;
