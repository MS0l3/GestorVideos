import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";

import styles from "../styles/authStyles";
import { addFavoriteVideo } from "../firebase/firestore";

export default function AddFavoriteScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleAdd = async () => {
    if (!title || !url) {
      Alert.alert("Error", "Rellena todos los campos");
      return;
    }

    await addFavoriteVideo(title, url);

    Alert.alert("Guardado", "Vídeo añadido a favoritos");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Añadir vídeo</Text>

      <TextInput
        style={styles.input}
        placeholder="Título"
        placeholderTextColor="#ccc"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="URL"
        placeholderTextColor="#ccc"
        value={url}
        onChangeText={setUrl}
      />

      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}
