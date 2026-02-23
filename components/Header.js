import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/homeStyles";

export default function Header({ navigation }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate("Favorites")}>
        <Ionicons name="bookmark-outline" size={26} color="#3b2a5a" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Lists")}>
        <Ionicons name="list-outline" size={26} color="#3b2a5a" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Ionicons name="person-circle-outline" size={28} color="#3b2a5a" />
      </TouchableOpacity>
    </View>
  );
}
