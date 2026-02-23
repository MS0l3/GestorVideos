import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthChoiceScreen from "../screens/AuthChoiceScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";

import FavoritesScreen from "../screens/FavoritesScreen";
import AddFavoriteScreen from "../screens/AddFavoriteScreen";
import MainTabs from "./MainTabs";

import ListsScreen from "../screens/ListsScreen";
import ListDetailScreen from "../screens/ListDetailScreen";

import ProfileScreen from "../screens/ProfileScreen";
import VideoPlayerScreen from "../screens/VideoPlayerScreen";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Auth */}
        <Stack.Screen name="AuthChoice" component={AuthChoiceScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />

        <Stack.Screen name="MainTabs" component={MainTabs} />

        {/* Main */}
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
        <Stack.Screen name="AddFavorite" component={AddFavoriteScreen} />

        <Stack.Screen name="Lists" component={ListsScreen} />
        <Stack.Screen name="ListDetail" component={ListDetailScreen} />

        <Stack.Screen name="Profile" component={ProfileScreen} />

        {/* Player */}
        <Stack.Screen name="VideoPlayer" component={VideoPlayerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
