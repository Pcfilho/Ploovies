import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Login } from "../screens/Login";
import { HomeRoutes } from "./home.routes";
import { useUserSelector } from "../store/reducers/userReducer";

export function Routes() {
  const { id } = useUserSelector();

  return (
    <NavigationContainer>
      {id ? <HomeRoutes /> : <Login />}
    </NavigationContainer>
  );
}
