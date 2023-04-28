import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import { ThemeProvider } from "styled-components/native";
import * as SplashScreen from "expo-splash-screen";
import theme from "./src/styles/theme";
import {
  useFonts,
  Lato_400Regular,
  Lato_700Bold,
  Lato_900Black,
} from "@expo-google-fonts/lato";
import { Home } from "./src/screens/Home";
import { View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/store";
import { MovieDetails } from "./src/screens/MovieDetails";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Lato_400Regular,
    Lato_700Bold,
    Lato_900Black,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
          <StatusBar style="auto" />
          <MovieDetails />
        </View>
      </ThemeProvider>
    </Provider>
  );
}
