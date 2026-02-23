import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/authStyles';
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthChoiceScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonOutline}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.buttonOutlineText}>Registrarse</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
