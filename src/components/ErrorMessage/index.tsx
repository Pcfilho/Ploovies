import React from "react";
import { RegisterErrorMessage } from "./styles";

interface ErrorProps {
  message: string | undefined;
}

export const ErrorMessage = ({ message }: ErrorProps) =>
  message ? <RegisterErrorMessage>{message}</RegisterErrorMessage> : null;
