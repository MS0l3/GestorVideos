import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import styles from "../styles/homeStyles";
import { isFavorite, toggleFavorite, getUserLists, addVideoToList, getYouTubeThumbnail } from "../firebase/firestore";
import AddToListModal from "./AddToListModal";

export default function VideoCard({ video, forceFavorite = false, onRemoveFavorite, showDelete = false, onDelete }) {
  const [favorite, setFavorite] = useState(false);
  const [lists, setLists] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState("");

  const navigation = useNavigation();

  const normalizedVideoId = String(video?.videoId || "").match(/[\w-]{11}/)?.[0] || "";
  const thumbnailFromVideoId = normalizedVideoId
    ? `https://i.ytimg.com/vi/${normalizedVideoId}/hqdefault.jpg`
    : "";
  const storedThumbnail = video?.thumbnail;
  const hasValidStoredThumbnail =
    !!storedThumbnail &&
    !String(storedThumbnail).includes("undefined") &&
    !String(storedThumbnail).includes("null");

  const thumbnailUri =
    (hasValidStoredThumbnail ? storedThumbnail : "") ||
    thumbnailFromVideoId ||
    getYouTubeThumbnail(video?.url);
  const fallbackThumbnailUri = normalizedVideoId
    ? `https://i.ytimg.com/vi/${normalizedVideoId}/mqdefault.jpg`
    : "";

  useEffect(() => {
    if (!forceFavorite) checkFavorite();
    else setFavorite(true);

    setImageUri(thumbnailUri);

    const loadLists = async () => {
      const data = await getUserLists();
      setLists(data);
    };
    loadLists();
  }, [thumbnailUri]);

  const checkFavorite = async () => {
    const exists = await isFavorite(video);
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

  const handleDelete = () => {
    if (onDelete) onDelete();
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

      {showDelete && (
        <TouchableOpacity style={styles.deleteVideoIcon} onPress={handleDelete}>
          <Ionicons name="trash-outline" size={20} color="#ff8a8a" />
        </TouchableOpacity>
      )}

      {/* Imagen y título */}
      <TouchableOpacity onPress={handlePlay}>
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
          onError={() => {
            if (imageUri && fallbackThumbnailUri && imageUri !== fallbackThumbnailUri) {
              setImageUri(fallbackThumbnailUri);
              return;
            }
            setImageUri("");
          }}
        />
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
