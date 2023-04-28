// App.js
import { NavigationContainer } from "@react-navigation/native";
import { MovieDetails } from "../screens/MovieDetails";
import { Home } from "../screens/Home";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export const HomeRoutes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="MovieDetails"
          component={MovieDetails}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
