import "./src/locale/index";
import { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Lato_400Regular,
  Lato_700Bold,
  Lato_900Black,
} from "@expo-google-fonts/lato";
import { AppState, Platform, View } from "react-native";
import { Provider } from "react-redux";
import { persistor, store } from "./src/store";
import NetInfo from "@react-native-community/netinfo";
import {
  QueryClient,
  QueryClientProvider,
  onlineManager,
} from "@tanstack/react-query";
import type { AppStateStatus } from "react-native";
import { focusManager } from "@tanstack/react-query";
import { Routes } from "./src/routes";
import { PersistGate } from "redux-persist/integration/react";
import { Asset } from "expo-asset";
import { iconTypes } from "./src/components/GenreIcon";

function cacheImages(images: any[]) {
  return images.map((image) => {
    return Asset.fromModule(image).downloadAsync();
  });
}

SplashScreen.preventAutoHideAsync();

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});

const queryClient = new QueryClient();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
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

  function onAppStateChange(status: AppStateStatus) {
    if (Platform.OS !== "web") {
      focusManager.setFocused(status === "active");
    }
  }

  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        const imagesPaths = Object.values(iconTypes)
        const imageAssets = cacheImages(imagesPaths);

        await Promise.all(imageAssets);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!fontsLoaded || !appIsReady) {
    return null;
  }
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
            <Routes />
          </View>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
