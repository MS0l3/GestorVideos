import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import FavoritesScreen from "../screens/FavoritesScreen";
import ListsScreen from "../screens/ListsScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 70,
          paddingBottom: 0,
        },
        tabBarIcon: ({ color, size }) => {
          let icon;

          if (route.name === "Favorites") icon = "star-outline";
          if (route.name === "Lists") icon = "list-outline";
          if (route.name === "Profile") icon = "person-outline";

          return <Ionicons name={icon} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Lists" component={ListsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
