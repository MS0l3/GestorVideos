import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import styles from "../styles/homeStyles";
import { isFavorite, toggleFavorite, getUserLists, addVideoToList } from "../firebase/firestore";
import AddToListModal from "./AddToListModal";

export default function VideoCard({ video, forceFavorite = false, onRemoveFavorite }) {
  const [favorite, setFavorite] = useState(false);
  const [lists, setLists] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    if (!forceFavorite) checkFavorite();
    else setFavorite(true);

    const loadLists = async () => {
      const data = await getUserLists();
      setLists(data);
    };
    loadLists();
  }, []);

  const checkFavorite = async () => {
    const exists = await isFavorite(video.videoId);
    setFavorite(!!exists);
  };

  const handleFavorite = async () => {
    if (forceFavorite && onRemoveFavorite) {
      onRemoveFavorite();
      return;
    }
    const result = await toggleFavorite(video);
    setFavorite(result);
  };

  const handlePlay = () => {
    navigation.navigate("VideoPlayer", { video }); // <-- debe coincidir exactamente con Stack.Screen
};


  return (
    <View style={styles.card}>
      {/* Favorito */}
      <TouchableOpacity style={styles.favoriteIcon} onPress={handleFavorite}>
        <Ionicons name={favorite ? "star" : "star-outline"} size={22} color="#ffd700" />
      </TouchableOpacity>

      {/* Añadir a lista */}
      <TouchableOpacity style={styles.listIcon} onPress={() => setModalVisible(true)}>
        <Ionicons name="add-circle-outline" size={22} color="#fff" />
      </TouchableOpacity>

      {/* Imagen y título */}
      <TouchableOpacity onPress={handlePlay}>
        <Image source={{ uri: video.thumbnail }} style={styles.image} />
        <Text style={styles.cardTitle}>{video.title}</Text>
      </TouchableOpacity>

      {/* Modal para añadir a lista */}
      <AddToListModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        lists={lists}
        onSelect={async (list) => {
          await addVideoToList(list.id, video);
          setModalVisible(false);
        }}
      />
    </View>
  );
}
