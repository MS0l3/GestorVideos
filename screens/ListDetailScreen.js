import { useCallback, useEffect, useState } from "react";
import { View, Text, FlatList, Alert, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import VideoCard from "../components/VideoCard";
import styles from "../styles/homeStyles";
import { getVideosFromList, deleteVideoFromList } from "../firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ListDetailScreen({ route, navigation }) {
  const { listId, name: listName } = route.params;
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    loadVideos();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadVideos();
    }, [listId])
  );

  const loadVideos = async () => {
    const data = await getVideosFromList(listId);
    setVideos(data);
  };

  const handleDeleteVideo = (video) => {
    Alert.alert(
      "Eliminar vídeo",
      `¿Quieres borrar "${video.title}" de esta lista?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            await deleteVideoFromList(listId, video.id);
            loadVideos();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{listName}</Text>

      <TouchableOpacity
        style={styles.addListVideoButton}
        onPress={() =>
          navigation.navigate("AddVideo", {
            listId,
            listName,
          })
        }
      >
        <Text style={styles.addListVideoButtonText}>+ Añadir vídeo a esta lista</Text>
      </TouchableOpacity>

      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <VideoCard
            video={item}
            showDelete
            onDelete={() => handleDeleteVideo(item)}
            onPress={() => navigation.navigate("VideoPlayerScreen", { video: item })}
          />
        )}
      />
    </SafeAreaView>
  );
}
