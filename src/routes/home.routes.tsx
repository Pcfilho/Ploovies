import {
  CompositeScreenProps,
  NavigationContainer,
  RouteProp,
  ParamListBase,
} from "@react-navigation/native";
import { MovieDetails } from "../screens/MovieDetails";
import { Home } from "../screens/Home";
import { createStackNavigator } from "@react-navigation/stack";
import { IMovie } from "../@types/movie";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  MovieDetails: { item: IMovie };
};

export interface IMovieDetailsParams extends RouteProp<ParamListBase> {
  params: {
    item: IMovie;
  };
}

export type HomeScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

export const HomeRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="MovieDetails" component={MovieDetails} />
    </Stack.Navigator>
  );
};
