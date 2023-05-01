import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Login } from "../screens/auth/Login";
import { useUserSelector } from "../store/reducers/userReducer";
import { AppRoutes } from "./app.tab.routes";
import { darkTheme, lightTheme } from "../styles/theme";
import { ThemeProvider } from "styled-components/native";
import { useDarkModeSelector } from "../store/reducers/darkModeReducer";
import { StatusBar } from "expo-status-bar";

export function Routes() {
  const id = useUserSelector();
  const isDarkMode = useDarkModeSelector();

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} translucent />
      <NavigationContainer>
        {id ? <AppRoutes /> : <Login />}
      </NavigationContainer>
    </ThemeProvider>
  );
}
