import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components/native'
import * as SplashScreen from 'expo-splash-screen';
import theme from './src/styles/theme';
import { useFonts, Lato_400Regular, Lato_700Bold, Lato_900Black } from '@expo-google-fonts/lato';
import { Text } from 'react-native';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.main};
  align-items: center;
  justify-content: center;
`;

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Lato_400Regular,
    Lato_700Bold,
    Lato_900Black
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
    <ThemeProvider theme={theme}>
      <Container onLayout={onLayoutRootView}>
        <StatusBar style="auto" />
        <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 100}}>Movies</Text>
      </Container>
    </ThemeProvider>
  );
}
