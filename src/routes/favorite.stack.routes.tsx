import {
  RouteProp,
  ParamListBase,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MovieDetails } from "../screens/app/MovieDetails";
import { Favorite } from "../screens/app/Favorites";
import { MovieModel } from "../models/movie";

type RootStackParamList = {
  FavoriteScreen: undefined;
  FavoriteMovieDetails: { item: MovieModel };
};

export interface IMovieDetailsParams extends RouteProp<ParamListBase> {
  params: {
    item: MovieModel;
  };
}

export type FavoriteRoutesNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

export const FavoriteRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="FavoriteScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="FavoriteScreen" component={Favorite} />
      <Stack.Screen name="FavoriteMovieDetails" component={MovieDetails} />
    </Stack.Navigator>
  );
};
