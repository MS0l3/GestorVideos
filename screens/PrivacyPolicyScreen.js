import { ScrollView, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/authStyles';

export default function PrivacyPolicyScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Políticas de privacidad</Text>

      <Text style={styles.paragraph}>
        Esta aplicación recopila únicamente los datos necesarios para el
        funcionamiento del servicio.{"\n\n"}
        No compartimos información personal con terceros.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Aceptar y volver</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
