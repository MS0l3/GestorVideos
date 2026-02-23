import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import styles from "../styles/authStyles";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  getLists,
  createList,
  addVideoToList,
  addFavorite,
  extractYouTubeID,
  getYouTubeThumbnail,
} from "../firebase/firestore";

export default function AddVideoScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);

  useEffect(() => {
    loadLists();
  }, []);

  const loadLists = async () => {
    const data = await getLists();
    setLists(data);
  };

  const handleCreateList = async () => {
    Alert.prompt("Nueva lista", "Nombre:", async (name) => {
      if (!name) return;

      await createList(name);
      loadLists();
    });
  };

  const handleSave = async () => {
    if (!title || !url) {
      Alert.alert("Error", "Rellena todos los campos");
      return;
    }
    const videoId = extractYouTubeID(url);

    if (!videoId) {
      Alert.alert("Error", "URL de YouTube no válida");
      return;
    }

    const video = {
      title,
      url,
      videoId,
      thumbnail: getYouTubeThumbnail(url),
    };


    try {
      if (selectedList) {
        await addVideoToList(selectedList, video);
      }

      await addFavorite(video);

      Alert.alert("Guardado", "Vídeo añadido correctamente");
      navigation.goBack();
    } catch (err) {
      Alert.alert("Error", "No se pudo guardar");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
        placeholder="URL del vídeo"
        placeholderTextColor="#ccc"
        value={url}
        onChangeText={setUrl}
      />

      {/* LISTAS */}
      <Text style={{ color: "white", marginBottom: 10 }}>
        Selecciona una lista:
      </Text>

      {lists.map((list) => (
        <TouchableOpacity
          key={list.id}
          style={{
            padding: 10,
            borderRadius: 10,
            marginBottom: 8,
            backgroundColor:
              selectedList === list.id ? "#e6e9ef" : "#6d4fa3",
          }}
          onPress={() => setSelectedList(list.id)}
        >
          <Text
            style={{
              color: selectedList === list.id ? "#3b2a5a" : "white",
              fontWeight: "600",
            }}
          >
            {list.name}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.buttonOutline} onPress={handleCreateList}>
        <Text style={styles.buttonOutlineText}>+ Crear nueva lista</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Guardar vídeo</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
