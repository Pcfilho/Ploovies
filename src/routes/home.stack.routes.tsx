import { RouteProp, ParamListBase } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Home } from "../screens/app/Home";
import { MovieDetails } from "../screens/app/MovieDetails";
import { GenreProvider } from "../context/genreSelected";
import { MovieModel } from "../models/movie";

type RootStackParamList = {
  HomeScreen: undefined;
  MovieDetails: { item: MovieModel };
};

export interface IMovieDetailsParams extends RouteProp<ParamListBase> {
  params: {
    item: MovieModel;
  };
}

export type HomeScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

export const HomeRoutes = () => {
  return (
    <GenreProvider>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="HomeScreen" component={Home} />
        <Stack.Screen name="MovieDetails" component={MovieDetails} />
      </Stack.Navigator>
    </GenreProvider>
  );
};
